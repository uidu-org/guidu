import { ProviderFactory } from '@uidu/editor-common';
import memoizeOne from 'memoize-one';
import { Plugin, PluginKey, Selection, Transaction } from 'prosemirror-state';
import { fixTablesKey } from 'prosemirror-tables';
import { ReplaceStep, Step } from 'prosemirror-transform';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';
import { Dispatch } from '../../event-dispatcher';
import {
  applyRemoteData,
  getSendableSelection,
  handleConnection,
  handleInit,
  handlePresence,
  handleTelePointer,
} from './actions';
import { Participants, ReadOnlyParticipants } from './participants';
import { CollabEditProvider, CollabEvent } from './provider';
import {
  CollabEditOptions,
  ConnectionData,
  Participant,
  PresenceData,
  TelepointerData,
} from './types';
import { createTelepointers, findPointers } from './utils';

export { CollabEditProvider };

export const pluginKey = new PluginKey('collabEditPlugin');

const unsubscribeAllEvents = (provider: CollabEditProvider) => {
  const collabEvents: Array<CollabEvent> = [
    'init',
    'connected',
    'data',
    'presence',
    'telepointer',
    'local-steps',
    'error',
  ];

  collabEvents.forEach(evt => {
    provider.unsubscribeAll(evt);
  });
};

const initCollab = (
  collabEditProvider: CollabEditProvider,
  view: EditorView,
) => {
  collabEditProvider.initialize(
    () => view.state,
    json => Step.fromJSON(view.state.schema, json),
  );
};

const initCollabMemo = memoizeOne(initCollab);

export const createPlugin = (
  dispatch: Dispatch,
  providerFactory: ProviderFactory,
  options?: CollabEditOptions,
  sanitizePrivateContent?: boolean,
) => {
  let collabEditProvider: CollabEditProvider | null;
  let messageTimeoutId: number = 0;
  return new Plugin({
    key: pluginKey,
    state: {
      init(config) {
        return PluginState.init(config);
      },
      apply(tr, prevPluginState: PluginState, oldState, newState) {
        const pluginState = prevPluginState.apply(tr);
        const pmTablesMeta = tr.getMeta(fixTablesKey);
        if (
          collabEditProvider &&
          tr.getMeta('isRemote') !== true &&
          !(pmTablesMeta && pmTablesMeta.fixTables) &&
          pluginState.isReady
        ) {
          collabEditProvider.send(tr, oldState, newState);
        }

        const { activeParticipants: prevActiveParticipants } = prevPluginState;
        const { activeParticipants, sessionId } = pluginState;

        if (collabEditProvider) {
          const selectionChanged = !oldState.selection.eq(newState.selection);
          const participantsChanged = !prevActiveParticipants.eq(
            activeParticipants,
          );

          if (
            (sessionId && selectionChanged && !tr.docChanged) ||
            (sessionId && participantsChanged)
          ) {
            const selection = getSendableSelection(newState.selection);

            const message: TelepointerData = {
              type: 'telepointer',
              selection,
              sessionId,
            };
            const sendMessage = collabEditProvider.sendMessage.bind(
              collabEditProvider,
            );

            // Delay sending selection till next tick so that participants info
            // can go before it.
            clearTimeout(messageTimeoutId);
            messageTimeoutId = window.setTimeout(
              (data: TelepointerData) => sendMessage(data),
              0,
              message,
            );
          }
        }

        dispatch(pluginKey, { activeParticipants, sessionId });
        return pluginState;
      },
    },
    props: {
      decorations(this: Plugin, state) {
        return this.getState(state).decorations;
      },
    },
    filterTransaction(tr, state) {
      const pluginState = pluginKey.getState(state);
      const collabInitialiseTr = tr.getMeta('collabInitialised');

      // Don't allow transactions that modifies the document before
      // collab-plugin is ready.
      if (!!collabInitialiseTr && !pluginState.isReady && tr.docChanged) {
        return false;
      }

      return true;
    },
    view(view) {
      providerFactory.subscribe(
        'collabEditProvider',
        async (
          _name: string,
          providerPromise?: Promise<CollabEditProvider>,
        ) => {
          if (providerPromise) {
            const pluginState = pluginKey.getState(view.state);
            collabEditProvider = await providerPromise;

            if (pluginState.isReady) {
              unsubscribeAllEvents(collabEditProvider);
            }

            // Initialize provider
            collabEditProvider
              .on('init', data => {
                view.dispatch(view.state.tr.setMeta('collabInitialised', true));
                handleInit(
                  data,
                  view,
                  options,
                  providerFactory,
                  sanitizePrivateContent,
                );
              })
              .on('connected', data => handleConnection(data, view))
              .on('data', data => applyRemoteData(data, view, options))
              .on('presence', data => handlePresence(data, view))
              .on('telepointer', data => handleTelePointer(data, view))
              .on('local-steps', data => {
                const { steps } = data;
                const { state } = view;

                const { tr } = state;
                steps.forEach((step: Step) => tr.step(step));

                const newState = state.apply(tr);
                view.updateState(newState);
              })
              .on('error', () => {
                // TODO: Handle errors property (ED-2580)
              });

            /**
             * We only want to initialise once, if we reload/reconfigure this plugin
             * We dont want to re-init collab, it would break existing sessions
             */
            initCollabMemo(collabEditProvider, view);
          } else {
            collabEditProvider = null;
          }
        },
      );

      return {
        destroy() {
          providerFactory.unsubscribeAll('collabEditProvider');
          if (collabEditProvider) {
            unsubscribeAllEvents(collabEditProvider);
          }
          collabEditProvider = null;

          // Prevent potential async updates once destroyed.
          clearTimeout(messageTimeoutId);
        },
      };
    },
  });
};

const isReplaceStep = (step: Step) => step instanceof ReplaceStep;

/**
 * Returns position where it's possible to place a decoration.
 */
const getValidPos = (tr: Transaction, pos: number) => {
  const resolvedPos = tr.doc.resolve(pos);
  const backwardSelection = Selection.findFrom(resolvedPos, -1, true);
  // if there's no correct cursor position before the `pos`, we try to find it after the `pos`
  const forwardSelection = Selection.findFrom(resolvedPos, 1, true);
  return backwardSelection
    ? backwardSelection.from
    : forwardSelection
    ? forwardSelection.from
    : pos;
};

export class PluginState {
  private decorationSet: DecorationSet;
  private participants: Participants;
  private sid?: string;
  public isReady: boolean;

  get decorations() {
    return this.decorationSet;
  }

  get activeParticipants() {
    return this.participants as ReadOnlyParticipants;
  }

  get sessionId() {
    return this.sid;
  }

  constructor(
    decorations: DecorationSet,
    participants: Participants,
    sessionId?: string,
    collabInitalised: boolean = false,
  ) {
    this.decorationSet = decorations;
    this.participants = participants;
    this.sid = sessionId;
    this.isReady = collabInitalised;
  }

  getInitial(sessionId: string) {
    const participant = this.participants.get(sessionId);
    return participant ? participant.name.substring(0, 1).toUpperCase() : 'X';
  }

  apply(tr: Transaction) {
    let { decorationSet, participants, sid, isReady } = this;

    const presenceData = tr.getMeta('presence') as PresenceData;
    const telepointerData = tr.getMeta('telepointer') as TelepointerData;
    const sessionIdData = tr.getMeta('sessionId') as ConnectionData;
    let collabInitialised = tr.getMeta('collabInitialised');

    if (typeof collabInitialised !== 'boolean') {
      collabInitialised = isReady;
    }

    if (sessionIdData) {
      sid = sessionIdData.sid;
    }

    let add: Decoration[] = [];
    let remove: Decoration[] = [];

    if (presenceData) {
      const {
        joined = [] as Participant[],
        left = [] as { sessionId: string }[],
      } = presenceData;

      participants = participants.remove(left.map(i => i.sessionId));
      participants = participants.add(joined);

      // Remove telepointers for users that left
      left.forEach(i => {
        const pointers = findPointers(i.sessionId, decorationSet);
        if (pointers) {
          remove = remove.concat(pointers);
        }
      });
    }

    if (telepointerData) {
      const { sessionId } = telepointerData;
      if (participants.get(sessionId) && sessionId !== sid) {
        const oldPointers = findPointers(
          telepointerData.sessionId,
          decorationSet,
        );

        if (oldPointers) {
          remove = remove.concat(oldPointers);
        }

        const { anchor, head } = telepointerData.selection;
        const rawFrom = anchor < head ? anchor : head;
        const rawTo = anchor >= head ? anchor : head;
        const isSelection = rawTo - rawFrom > 0;

        let from = 1;
        let to = 1;

        try {
          from = getValidPos(
            tr,
            isSelection ? Math.max(rawFrom - 1, 0) : rawFrom,
          );
          to = isSelection ? getValidPos(tr, rawTo) : from;
        } catch (err) {}

        add = add.concat(
          createTelepointers(
            from,
            to,
            sessionId,
            isSelection,
            this.getInitial(sessionId),
          ),
        );
      }
    }

    if (tr.docChanged) {
      // Adjust decoration positions to changes made by the transaction
      try {
        decorationSet = decorationSet.map(tr.mapping, tr.doc, {
          // Reapplies decorators those got removed by the state change
          onRemove: spec => {
            if (spec.pointer && spec.pointer.sessionId) {
              const step = tr.steps.filter(isReplaceStep)[0];
              if (step) {
                const { sessionId } = spec.pointer;
                const {
                  slice: {
                    content: { size },
                  },
                  from,
                } = step as any;
                const pos = getValidPos(
                  tr,
                  size
                    ? Math.min(from + size, tr.doc.nodeSize - 3)
                    : Math.max(from, 1),
                );

                add = add.concat(
                  createTelepointers(
                    pos,
                    pos,
                    sessionId,
                    false,
                    this.getInitial(sessionId),
                  ),
                );
              }
            }
          },
        });
      } catch (err) {}

      // Remove any selection decoration within the change range,
      // takes care of the issue when after pasting we end up with a dead selection
      tr.steps.filter(isReplaceStep).forEach(s => {
        const { from, to } = s as any;
        decorationSet.find(from, to).forEach((deco: any) => {
          // `type` is private, `from` and `to` are public in latest version
          // `from` != `to` means it's a selection
          if (deco.from !== deco.to) {
            remove.push(deco);
          }
        });
      });
    }

    const { selection } = tr;
    decorationSet.find().forEach((deco: any) => {
      if (deco.type.toDOM) {
        if (deco.from === selection.from && deco.to === selection.to) {
          deco.type.toDOM.classList.add('telepointer-dim');
          deco.type.side = -1;
        } else {
          deco.type.toDOM.classList.remove('telepointer-dim');
          deco.type.side = 0;
        }
      }
    });

    if (remove.length) {
      decorationSet = decorationSet.remove(remove);
    }

    if (add.length) {
      decorationSet = decorationSet.add(tr.doc, add);
    }

    return new PluginState(decorationSet, participants, sid, collabInitialised);
  }

  static init(config: any) {
    const { doc } = config;
    return new PluginState(DecorationSet.create(doc, []), new Participants());
  }
}
