import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import AddIcon from '@atlaskit/icon/glyph/editor/add';
import CodeIcon from '@atlaskit/icon/glyph/editor/code';
import DateIcon from '@atlaskit/icon/glyph/editor/date';
import DecisionIcon from '@atlaskit/icon/glyph/editor/decision';
import HorizontalRuleIcon from '@atlaskit/icon/glyph/editor/horizontal-rule';
import EditorImageIcon from '@atlaskit/icon/glyph/editor/image';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import LayoutTwoEqualIcon from '@atlaskit/icon/glyph/editor/layout-two-equal';
import LinkIcon from '@atlaskit/icon/glyph/editor/link';
import MentionIcon from '@atlaskit/icon/glyph/editor/mention';
import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more';
import TableIcon from '@atlaskit/icon/glyph/editor/table';
import TaskIcon from '@atlaskit/icon/glyph/editor/task';
import PlaceholderTextIcon from '@atlaskit/icon/glyph/media-services/text';
import QuoteIcon from '@atlaskit/icon/glyph/quote';
import StatusIcon from '@atlaskit/icon/glyph/status';
import { akEditorMenuZIndex, Popup } from '@uidu/editor-common';
import { Node as PMNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { ReactInstance } from 'react';
import * as ReactDOM from 'react-dom';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  WrappedComponentProps,
} from 'react-intl';
import EditorActions from '../../../../actions';
import {
  analyticsService as analytics,
  withAnalytics,
} from '../../../../analytics';
import DropdownMenu from '../../../../components/DropdownMenu';
import {
  ButtonGroup,
  ExpandIconWrapper,
  Shortcut,
  Wrapper,
} from '../../../../components/styles';
import ToolbarButton from '../../../../components/ToolbarButton';
import {
  addLink,
  findKeymapByDescription,
  toggleTable,
  tooltip,
} from '../../../../keymaps';
import {
  Command,
  CommandDispatch,
  InsertMenuCustomItem,
} from '../../../../types';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  DispatchAnalyticsEvent,
  EVENT_TYPE,
  INPUT_METHOD,
  InsertEventPayload,
  PANEL_TYPE,
  withAnalytics as commandWithAnalytics,
} from '../../../analytics';
import { BlockType } from '../../../block-type/types';
import { insertDate, openDatePicker } from '../../../date/actions';
import { showLinkToolbar } from '../../../hyperlink/commands';
import { insertLayoutColumns } from '../../../layout/actions';
import { MacroProvider } from '../../../macro/types';
import { insertMentionQuery } from '../../../mentions/commands/insert-mention-query';
import { showPlaceholderFloatingToolbar } from '../../../placeholder-text/actions';
import { createHorizontalRule } from '../../../rule/pm-plugins/input-rule';
import { updateStatus } from '../../../status/actions';
import { createTable } from '../../../table/commands';
// import { insertTaskDecision } from '../../../tasks-and-decisions/commands';
import { TriggerWrapper } from './styles';

export const messages = defineMessages({
  action: {
    id: 'fabric.editor.action',
    defaultMessage: 'Action item',
    description: 'Also known as a “task”, “to do item”, or a checklist',
  },
  actionDescription: {
    id: 'fabric.editor.action.description',
    defaultMessage: 'Capture actions to move work forward',
    description: '',
  },
  link: {
    id: 'fabric.editor.link',
    defaultMessage: 'Link',
    description: 'Insert a hyperlink',
  },
  linkDescription: {
    id: 'fabric.editor.link.description',
    defaultMessage: 'Link to an internal or external page',
    description: 'Insert a hyperlink',
  },
  filesAndImages: {
    id: 'fabric.editor.filesAndImages',
    defaultMessage: 'Files & images',
    description: 'Insert one or more files or images',
  },
  filesAndImagesDescription: {
    id: 'fabric.editor.filesAndImages.description',
    defaultMessage: 'Add images and other files to your page',
    description: 'Insert one or more files or images',
  },
  image: {
    id: 'fabric.editor.image',
    defaultMessage: 'Image',
    description: 'Insert an image.',
  },
  mention: {
    id: 'fabric.editor.mention',
    defaultMessage: 'Mention',
    description: 'Reference another person in your document',
  },
  mentionDescription: {
    id: 'fabric.editor.mention.description',
    defaultMessage: 'Mention someone to send them a notification',
    description: 'Reference another person in your document',
  },
  table: {
    id: 'fabric.editor.table',
    defaultMessage: 'Table',
    description: 'Inserts a table in the document',
  },
  tableDescription: {
    id: 'fabric.editor.table.description',
    defaultMessage: 'Insert a table',
    description: 'Inserts a table in the document',
  },
  decision: {
    id: 'fabric.editor.decision',
    defaultMessage: 'Decision',
    description: 'Capture a decision you’ve made',
  },
  decisionDescription: {
    id: 'fabric.editor.decision.description',
    defaultMessage: 'Capture decisions so they’re easy to track',
    description: 'Capture a decision you’ve made',
  },
  horizontalRule: {
    id: 'fabric.editor.horizontalRule',
    defaultMessage: 'Divider',
    description: 'A horizontal rule or divider',
  },
  horizontalRuleDescription: {
    id: 'fabric.editor.horizontalRule.description',
    defaultMessage: 'Separate content with a horizontal line',
    description: 'A horizontal rule or divider',
  },
  date: {
    id: 'fabric.editor.date',
    defaultMessage: 'Date',
    description: 'Opens a date picker that lets you select a date',
  },
  dateDescription: {
    id: 'fabric.editor.date.description',
    defaultMessage: 'Add a date using a calendar',
    description: 'Opens a date picker that lets you select a date',
  },
  placeholderText: {
    id: 'fabric.editor.placeholderText',
    defaultMessage: 'Placeholder text',
    description: '',
  },
  columns: {
    id: 'fabric.editor.columns',
    defaultMessage: 'Layouts',
    description: 'Create a multi column section or layout',
  },
  columnsDescription: {
    id: 'fabric.editor.columns.description',
    defaultMessage: 'Structure your page using sections',
    description: 'Create a multi column section or layout',
  },
  status: {
    id: 'fabric.editor.status',
    defaultMessage: 'Status',
    description:
      'Inserts an item representing the status of an activity to task.',
  },
  statusDescription: {
    id: 'fabric.editor.status.description',
    defaultMessage: 'Create a colored lozenge with text inside',
    description:
      'Inserts an item representing the status of an activity to task.',
  },
  viewMore: {
    id: 'fabric.editor.viewMore',
    defaultMessage: 'View more',
    description: '',
  },
  insertMenu: {
    id: 'fabric.editor.insertMenu',
    defaultMessage: 'Insert',
    description:
      'Opens a menu of additional items that can be inserted into your document.',
  },
});

export interface Props {
  buttons: number;
  isReducedSpacing: boolean;
  isDisabled?: boolean;
  isTypeAheadAllowed?: boolean;
  editorView: EditorView;
  editorActions?: EditorActions;
  tableSupported?: boolean;
  mentionsEnabled?: boolean;
  actionSupported?: boolean;
  decisionSupported?: boolean;
  mentionsSupported?: boolean;
  insertMentionQuery?: () => void;
  mediaUploadsEnabled?: boolean;
  mediaSupported?: boolean;
  imageUploadSupported?: boolean;
  imageUploadEnabled?: boolean;
  handleImageUpload?: (event?: Event) => Command;
  dateEnabled?: boolean;
  horizontalRuleEnabled?: boolean;
  placeholderTextEnabled?: boolean;
  layoutSectionEnabled?: boolean;
  availableWrapperBlockTypes?: BlockType[];
  linkSupported?: boolean;
  linkDisabled?: boolean;
  nativeStatusSupported?: boolean;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  macroProvider?: MacroProvider | null;
  insertMenuItems?: InsertMenuCustomItem[];
  onShowMediaPicker?: () => void;
  onInsertBlockType?: (name: string) => Command;
  onInsertMacroFromMacroBrowser?: (
    macroProvider: MacroProvider,
    node?: PMNode,
    isEditing?: boolean,
  ) => (state: EditorState, dispatch: CommandDispatch) => void;
  dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
}

export interface State {
  isOpen: boolean;
}

export type TOOLBAR_MENU_TYPE = INPUT_METHOD.TOOLBAR | INPUT_METHOD.INSERT_MENU;

const blockTypeIcons = {
  codeblock: CodeIcon,
  panel: InfoIcon,
  blockquote: QuoteIcon,
};

/**
 * Checks if an element is detached (i.e. not in the current document)
 */
const isDetachedElement = (el: HTMLElement) => !document.body.contains(el);
const noop = () => {};

class ToolbarInsertBlock extends React.PureComponent<
  Props & WrappedComponentProps,
  State
> {
  private pickerRef?: ReactInstance;
  private button?: HTMLElement;

  state: State = {
    isOpen: false,
  };

  private onOpenChange = (attrs: { isOpen: boolean; open?: boolean }) => {
    const state = {
      isOpen: attrs.isOpen,
    };
    this.setState(state);
  };

  private handleTriggerClick = () => {
    const { isOpen } = this.state;
    this.onOpenChange({ isOpen: !isOpen });
  };

  private renderPopup() {
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
    } = this.props;

    return (
      <Popup
        target={this.button}
        fitHeight={350}
        fitWidth={350}
        offset={[0, 3]}
        mountTo={popupsMountPoint}
        boundariesElement={popupsBoundariesElement}
        scrollableElement={popupsScrollableElement}
      ></Popup>
    );
  }

  private handleButtonRef = (ref: HTMLElement): void => {
    const buttonRef = ref || null;
    if (buttonRef) {
      this.button = ReactDOM.findDOMNode(buttonRef) as HTMLElement;
    }
  };

  private handleDropDownButtonRef = (
    ref: ToolbarButton | null,
    items: Array<any>,
  ) => {
    items.forEach(item => item.handleRef && item.handleRef(ref));
  };

  private onPickerRef = (ref: any) => {
    if (ref) {
      document.addEventListener('click', this.handleClickOutside);
    } else {
      document.removeEventListener('click', this.handleClickOutside);
    }
    this.pickerRef = ref;
  };

  private handleClickOutside = (e: MouseEvent) => {
    const picker = this.pickerRef && ReactDOM.findDOMNode(this.pickerRef);
    // Ignore click events for detached elements.
    // Workaround for FS-1322 - where two onClicks fire - one when the upload button is
    // still in the document, and one once it's detached. Does not always occur, and
    // may be a side effect of a react render optimisation
    if (
      !picker ||
      (e.target &&
        !isDetachedElement(e.target as HTMLElement) &&
        !picker.contains(e.target as HTMLElement))
    ) {
    }
  };

  render() {
    const { isOpen } = this.state;
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      isDisabled,
      buttons: numberOfButtons,
      isReducedSpacing,
    } = this.props;

    const items = this.createItems();
    const buttons = items.slice(0, numberOfButtons);
    const dropdownItems = items.slice(numberOfButtons);

    if (items.length === 0) {
      return null;
    }

    const toolbarButtonFactory = (disabled: boolean, items: Array<any>) => (
      <FormattedMessage {...messages.insertMenu}>
        {(labelInsertMenu: string) => (
          <ToolbarButton
            ref={el => this.handleDropDownButtonRef(el, items)}
            selected={isOpen}
            disabled={disabled}
            onClick={this.handleTriggerClick}
            spacing={isReducedSpacing ? 'none' : 'default'}
            title={`${labelInsertMenu} /`}
            iconBefore={
              <TriggerWrapper>
                <AddIcon label={labelInsertMenu} />
                <ExpandIconWrapper>
                  <ExpandIcon label={labelInsertMenu} />
                </ExpandIconWrapper>
              </TriggerWrapper>
            }
          />
        )}
      </FormattedMessage>
    );

    return (
      <ButtonGroup width={isReducedSpacing ? 'small' : 'large'}>
        {buttons.map(btn => (
          <ToolbarButton
            ref={btn.handleRef || noop}
            key={btn.content}
            spacing={isReducedSpacing ? 'none' : 'default'}
            disabled={isDisabled || btn.isDisabled}
            iconBefore={btn.elemBefore}
            selected={btn.isActive}
            title={btn.content + (btn.shortcut ? ' ' + btn.shortcut : '')}
            onClick={() => this.insertToolbarMenuItem(btn)}
          />
        ))}
        <Wrapper>
          {this.renderPopup()}
          {dropdownItems.length > 0 &&
            (!isDisabled ? (
              <DropdownMenu
                items={[{ items: dropdownItems }]}
                onItemActivated={this.insertInsertMenuItem}
                onOpenChange={this.onOpenChange}
                mountTo={popupsMountPoint}
                boundariesElement={popupsBoundariesElement}
                scrollableElement={popupsScrollableElement}
                isOpen={isOpen}
                fitHeight={188}
                fitWidth={175}
                zIndex={akEditorMenuZIndex}
              >
                {toolbarButtonFactory(false, dropdownItems)}
              </DropdownMenu>
            ) : (
              <div>{toolbarButtonFactory(true, dropdownItems)}</div>
            ))}
        </Wrapper>
      </ButtonGroup>
    );
  }

  private createItems = () => {
    const {
      isTypeAheadAllowed,
      tableSupported,
      mediaUploadsEnabled,
      mediaSupported,
      imageUploadSupported,
      imageUploadEnabled,
      mentionsSupported,
      availableWrapperBlockTypes,
      actionSupported,
      decisionSupported,
      macroProvider,
      linkSupported,
      linkDisabled,
      nativeStatusSupported,
      insertMenuItems,
      dateEnabled,
      placeholderTextEnabled,
      horizontalRuleEnabled,
      layoutSectionEnabled,
      intl: { formatMessage },
    } = this.props;
    let items: any[] = [];

    if (actionSupported) {
      items.push({
        content: formatMessage(messages.action),
        value: { name: 'action' },
        elemBefore: (
          <FormattedMessage {...messages.action}>
            {(labelAction: string) => <TaskIcon label={labelAction} />}
          </FormattedMessage>
        ),
        elemAfter: <Shortcut>{'[]'}</Shortcut>,
        shortcut: '[]',
      });
    }

    if (linkSupported) {
      const shortcutLink = tooltip(addLink);
      items.push({
        content: formatMessage(messages.link),
        value: { name: 'link' },
        isDisabled: linkDisabled,
        elemBefore: (
          <FormattedMessage {...messages.link}>
            {(labelLink: string) => <LinkIcon label={labelLink} />}
          </FormattedMessage>
        ),
        elemAfter: <Shortcut>{shortcutLink}</Shortcut>,
        shortcut: shortcutLink,
      });
    }
    if (mediaSupported && mediaUploadsEnabled) {
      items.push({
        content: formatMessage(messages.filesAndImages),
        value: { name: 'media' },
        elemBefore: (
          <FormattedMessage {...messages.filesAndImages}>
            {(labelFilesAndImages: string) => (
              <EditorImageIcon label={labelFilesAndImages} />
            )}
          </FormattedMessage>
        ),
      });
    }
    if (imageUploadSupported) {
      items.push({
        content: formatMessage(messages.image),
        value: { name: 'image upload' },
        isDisabled: !imageUploadEnabled,
        elemBefore: (
          <FormattedMessage {...messages.image}>
            {(labelImage: string) => <EditorImageIcon label={labelImage} />}
          </FormattedMessage>
        ),
      });
    }
    if (mentionsSupported) {
      items.push({
        content: formatMessage(messages.mention),
        value: { name: 'mention' },
        isDisabled: !isTypeAheadAllowed,
        elemBefore: (
          <FormattedMessage {...messages.mention}>
            {(labelMention: string) => <MentionIcon label={labelMention} />}
          </FormattedMessage>
        ),
        elemAfter: <Shortcut>@</Shortcut>,
        shortcut: '@',
      });
    }
    if (tableSupported) {
      const shortcutTable = tooltip(toggleTable);
      items.push({
        content: formatMessage(messages.table),
        value: { name: 'table' },
        elemBefore: (
          <FormattedMessage {...messages.table}>
            {(labelTable: string) => <TableIcon label={labelTable} />}
          </FormattedMessage>
        ),
        elemAfter: <Shortcut>{shortcutTable}</Shortcut>,
        shortcut: shortcutTable,
      });
    }
    if (layoutSectionEnabled) {
      items.push({
        content: formatMessage(messages.columns),
        value: { name: 'layout' },
        elemBefore: (
          <FormattedMessage {...messages.columns}>
            {(labelColumns: string) => (
              <LayoutTwoEqualIcon label={labelColumns} />
            )}
          </FormattedMessage>
        ),
      });
    }
    if (availableWrapperBlockTypes) {
      availableWrapperBlockTypes.forEach(blockType => {
        const BlockTypeIcon =
          blockTypeIcons[blockType.name as keyof typeof blockTypeIcons];
        const shortcutBlock = tooltip(
          findKeymapByDescription(blockType.title.defaultMessage),
        );
        items.push({
          content: formatMessage(blockType.title),
          value: blockType,
          elemBefore: (
            <FormattedMessage {...blockType.title}>
              {(labelBlock: string) => <BlockTypeIcon label={labelBlock} />}
            </FormattedMessage>
          ),
          elemAfter: <Shortcut>{shortcutBlock}</Shortcut>,
          shortcut: shortcutBlock,
        });
      });
    }
    if (decisionSupported) {
      items.push({
        content: formatMessage(messages.decision),
        value: { name: 'decision' },
        elemBefore: (
          <FormattedMessage {...messages.decision}>
            {(labelDecision: string) => <DecisionIcon label={labelDecision} />}
          </FormattedMessage>
        ),
        elemAfter: <Shortcut>{'<>'}</Shortcut>,
        shortcut: '<>',
      });
    }
    if (
      horizontalRuleEnabled &&
      this.props.editorView.state.schema.nodes.rule
    ) {
      items.push({
        content: formatMessage(messages.horizontalRule),
        value: { name: 'horizontalrule' },
        elemBefore: (
          <FormattedMessage {...messages.horizontalRule}>
            {(labelHorizontalRule: string) => (
              <HorizontalRuleIcon label={labelHorizontalRule} />
            )}
          </FormattedMessage>
        ),
        elemAfter: <Shortcut>---</Shortcut>,
        shortcut: '---',
      });
    }

    if (dateEnabled) {
      items.push({
        content: formatMessage(messages.date),
        value: { name: 'date' },
        elemBefore: (
          <FormattedMessage {...messages.date}>
            {(labelDate: string) => <DateIcon label={labelDate} />}
          </FormattedMessage>
        ),
      });
    }

    if (placeholderTextEnabled) {
      items.push({
        content: formatMessage(messages.placeholderText),
        value: { name: 'placeholder text' },
        elemBefore: (
          <FormattedMessage {...messages.placeholderText}>
            {(labelPlaceholderText: string) => (
              <PlaceholderTextIcon label={labelPlaceholderText} />
            )}
          </FormattedMessage>
        ),
      });
    }

    if (nativeStatusSupported) {
      items.push({
        content: formatMessage(messages.status),
        value: { name: 'status' },
        elemBefore: (
          <FormattedMessage {...messages.status}>
            {(labelStatus: string) => <StatusIcon label={labelStatus} />}
          </FormattedMessage>
        ),
      });
    }

    if (insertMenuItems) {
      items = items.concat(insertMenuItems);
      // keeping this here for backwards compatibility so confluence
      // has time to implement this button before it disappears.
      // Should be safe to delete soon. If in doubt ask Leandro Lemos (llemos)
    } else if (typeof macroProvider !== 'undefined' && macroProvider) {
      items.push({
        content: formatMessage(messages.viewMore),
        value: { name: 'macro' },
        elemBefore: (
          <FormattedMessage {...messages.viewMore}>
            {(labelViewMore: string) => (
              <EditorMoreIcon label={labelViewMore} />
            )}
          </FormattedMessage>
        ),
      });
    }
    return items;
  };

  private toggleLinkPanel = withAnalytics(
    'atlassian.editor.format.hyperlink.button',
    (inputMethod: TOOLBAR_MENU_TYPE): boolean => {
      const { editorView } = this.props;
      showLinkToolbar(inputMethod)(editorView.state, editorView.dispatch);
      return true;
    },
  );

  private insertMention = withAnalytics(
    'atlassian.fabric.mention.picker.trigger.button',
    (inputMethod: TOOLBAR_MENU_TYPE): boolean => {
      const { editorView } = this.props;
      insertMentionQuery(inputMethod)(editorView.state, editorView.dispatch);
      return true;
    },
  );

  private insertTable = withAnalytics(
    'atlassian.editor.format.table.button',
    (inputMethod: TOOLBAR_MENU_TYPE): boolean => {
      const { editorView } = this.props;
      return commandWithAnalytics({
        action: ACTION.INSERTED,
        actionSubject: ACTION_SUBJECT.DOCUMENT,
        actionSubjectId: ACTION_SUBJECT_ID.TABLE,
        attributes: { inputMethod },
        eventType: EVENT_TYPE.TRACK,
      })(createTable)(editorView.state, editorView.dispatch);
    },
  );

  private createDate = withAnalytics(
    'atlassian.editor.format.date.button',
    (): boolean => {
      const { editorView } = this.props;
      insertDate()(editorView.state, editorView.dispatch);
      openDatePicker()(editorView.state, editorView.dispatch);
      return true;
    },
  );

  private createPlaceholderText = withAnalytics(
    'atlassian.editor.format.placeholder.button',
    (): boolean => {
      const { editorView } = this.props;
      showPlaceholderFloatingToolbar(editorView.state, editorView.dispatch);
      return true;
    },
  );

  private insertLayoutColumns = withAnalytics(
    'atlassian.editor.format.layout.button',
    (): boolean => {
      const { editorView } = this.props;
      insertLayoutColumns(editorView.state, editorView.dispatch);
      return true;
    },
  );

  private createStatus = withAnalytics(
    'atlassian.editor.format.status.button',
    (): boolean => {
      const { editorView } = this.props;
      updateStatus()(editorView);
      return true;
    },
  );

  private openMediaPicker = withAnalytics(
    'atlassian.editor.format.media.button',
    (inputMethod: TOOLBAR_MENU_TYPE): boolean => {
      const { onShowMediaPicker, dispatchAnalyticsEvent } = this.props;
      if (onShowMediaPicker) {
        onShowMediaPicker();
        if (dispatchAnalyticsEvent) {
          dispatchAnalyticsEvent({
            action: ACTION.OPENED,
            actionSubject: ACTION_SUBJECT.PICKER,
            actionSubjectId: ACTION_SUBJECT_ID.PICKER_CLOUD,
            attributes: { inputMethod },
            eventType: EVENT_TYPE.UI,
          });
        }
      }
      return true;
    },
  );

  private insertTaskDecision = (
    name: 'action' | 'decision',
    inputMethod: TOOLBAR_MENU_TYPE,
  ) =>
    withAnalytics(`atlassian.fabric.${name}.trigger.button`, (): boolean => {
      const { editorView } = this.props;
      if (!editorView) {
        return false;
      }
      const listType = name === 'action' ? 'taskList' : 'decisionList';
      // insertTaskDecision(editorView, listType, inputMethod);
      return true;
    });

  private insertHorizontalRule = withAnalytics(
    'atlassian.editor.format.horizontalrule.button',
    (inputMethod: TOOLBAR_MENU_TYPE): boolean => {
      const { editorView } = this.props;
      const tr = createHorizontalRule(
        editorView.state,
        editorView.state.selection.from,
        editorView.state.selection.to,
        inputMethod,
      );

      if (tr) {
        editorView.dispatch(tr);
        return true;
      }

      return false;
    },
  );

  private insertBlockTypeWithAnalytics = (
    itemName: string,
    inputMethod: TOOLBAR_MENU_TYPE,
  ) => {
    const {
      editorView,
      onInsertBlockType,
      dispatchAnalyticsEvent,
    } = this.props;
    const { state, dispatch } = editorView;

    let actionSubjectId: ACTION_SUBJECT_ID | undefined;
    let additionalAttrs = {};
    switch (itemName) {
      case 'panel':
        actionSubjectId = ACTION_SUBJECT_ID.PANEL;
        additionalAttrs = { panelType: PANEL_TYPE.INFO }; // only info panels can be inserted from toolbar
        break;
      case 'codeblock':
        actionSubjectId = ACTION_SUBJECT_ID.CODE_BLOCK;
        break;
      case 'blockquote':
        actionSubjectId = ACTION_SUBJECT_ID.BLOCK_QUOTE;
    }

    analytics.trackEvent(`atlassian.editor.format.${itemName}.button`);
    if (dispatchAnalyticsEvent && actionSubjectId) {
      dispatchAnalyticsEvent({
        action: ACTION.INSERTED,
        actionSubject: ACTION_SUBJECT.DOCUMENT,
        actionSubjectId,
        attributes: {
          inputMethod,
          ...additionalAttrs,
        },
        eventType: EVENT_TYPE.TRACK,
      } as InsertEventPayload);
    }

    onInsertBlockType!(itemName)(state, dispatch);
  };

  private onItemActivated = ({
    item,
    inputMethod,
  }: {
    item: any;
    inputMethod: TOOLBAR_MENU_TYPE;
  }): void => {
    const {
      editorView,
      editorActions,
      onInsertMacroFromMacroBrowser,
      macroProvider,
      handleImageUpload,
    } = this.props;

    switch (item.value.name) {
      case 'link':
        this.toggleLinkPanel(inputMethod);
        break;
      case 'table':
        this.insertTable(inputMethod);
        break;
      case 'image upload':
        if (handleImageUpload) {
          const { state, dispatch } = editorView;
          handleImageUpload()(state, dispatch);
        }
        break;
      case 'media':
        this.openMediaPicker(inputMethod);
        break;
      case 'mention':
        this.insertMention(inputMethod);
        break;
      case 'codeblock':
      case 'blockquote':
      case 'panel':
        this.insertBlockTypeWithAnalytics(item.value.name, inputMethod);
        break;
      case 'action':
      case 'decision':
        this.insertTaskDecision(item.value.name, inputMethod)();
        break;
      case 'horizontalrule':
        this.insertHorizontalRule(inputMethod);
        break;
      case 'macro':
        analytics.trackEvent(
          `atlassian.editor.format.${item.value.name}.button`,
        );
        onInsertMacroFromMacroBrowser!(macroProvider!)(
          editorView.state,
          editorView.dispatch,
        );
        break;
      case 'date':
        this.createDate();
        break;
      case 'placeholder text':
        this.createPlaceholderText();
        break;
      case 'layout':
        this.insertLayoutColumns();
        break;
      case 'status':
        this.createStatus();
        break;
      default:
        if (item && item.onClick) {
          item.onClick(editorActions);
          break;
        }
    }
    this.setState({ isOpen: false });
    if (!editorView.hasFocus()) {
      editorView.focus();
    }
  };

  private insertToolbarMenuItem = (btn: any) =>
    this.onItemActivated({
      item: btn,
      inputMethod: INPUT_METHOD.TOOLBAR,
    });

  private insertInsertMenuItem = ({ item }: { item: any }) =>
    this.onItemActivated({
      item,
      inputMethod: INPUT_METHOD.INSERT_MENU,
    });
}

export default injectIntl(ToolbarInsertBlock);
