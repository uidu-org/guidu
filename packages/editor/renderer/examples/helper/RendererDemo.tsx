/* eslint-disable no-console */
import data from '@emoji-mart/data';
import { defaultSchema } from '@uidu/adf-schema';
import Button from '@uidu/button';
import {
  CardSurroundings,
  EventHandlers,
  ExtensionHandlers,
  ProviderFactory,
} from '@uidu/editor-common';
import { modifyResponse, ProfileClient } from '@uidu/profilecard';
import { profilecard as profilecardUtils } from '@uidu/util-data-test';
import { init } from 'emoji-mart';
import * as React from 'react';
import { renderDocument, TextSerializer } from '../../src';
import {
  default as Renderer,
  Props as RendererProps,
} from '../../src/ui/Renderer';
import { RendererAppearance } from '../../src/ui/Renderer/types';
import { story as storyDataDocument } from './story-data';

console.log('init', init);
init({ data }).then(() => console.log('init done'));

const { getMockProfileClient: getMockProfileClientUtil } = profilecardUtils;
const MockProfileClient = getMockProfileClientUtil(
  ProfileClient,
  modifyResponse,
);

// const mentionProvider = Promise.resolve({
//   shouldHighlightMention(mention: { id: string }) {
//     return mention.id === 'ABCDE-ABCDE-ABCDE-ABCDE';
//   },
// });

// const emojiProvider = emoji.storyData.getEmojiResource();

const profilecardProvider = Promise.resolve({
  cloudId: 'DUMMY-CLOUDID',
  resourceClient: new MockProfileClient({
    cacheSize: 10,
    cacheMaxAge: 5000,
  }),
  getActions: (id: string) => {
    const actions = [
      {
        label: 'Mention',
        callback: () => console.log('profile-card:mention'),
      },
      {
        label: 'Message',
        callback: () => console.log('profile-card:message'),
      },
    ];

    return id === '1' ? actions : actions.slice(0, 1);
  },
});

// const taskDecisionProvider = Promise.resolve(
//   taskDecision.getMockTaskDecisionResource(),
// );

const providerFactory = ProviderFactory.create({
  // mentionProvider,
  // emojiProvider,
  mediaProvider: Promise.resolve({
    viewMediaClientConfig: async ({ id, ...rest }) => {
      console.log(rest);
      return {
        id,
        type: 'image',
        url: `https://me.uidu.local:8443/uploads/cache/${id}`,
        metadata: {
          name: 'test',
          width: 640,
          height: 640,
        },
      };
    },
  }),
  profilecardProvider,
  // taskDecisionProvider,
});

const extensionHandlers: ExtensionHandlers = {
  'com.atlassian.fabric': (ext) => {
    const { extensionKey } = ext;

    switch (extensionKey) {
      case 'clock':
        return (
          <p format="HH:mm:ss" ticking timezone="US/Pacific">
            Test
          </p>
        );
      case 'mention':
        return [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Hi, my name is... My name is... My name is... My name is ',
              },
              {
                type: 'mention',
                attrs: {
                  id: '1',
                  text: '@Oscar Wallhult',
                },
              },
            ],
          },
        ];
      case 'inline':
        return [
          {
            type: 'text',
            text: 'Hi, my name is... My name is... My name is... My name is ',
          },
          {
            type: 'mention',
            attrs: {
              id: '1',
              text: '@Oscar Wallhult',
            },
          },
        ];
      default:
        return null;
    }
  },
};

const eventHandlers: EventHandlers = {
  mention: {
    onClick: () => console.log('onMentionClick'),
    onMouseEnter: () => console.log('onMentionMouseEnter'),
    onMouseLeave: () => console.log('onMentionMouseLeave'),
  },
  media: {
    onClick: (
      result: CardEvent,
      surroundings?: CardSurroundings,
      analyticsEvent?: any,
    ) =>
      // json-safe-stringify does not handle cyclic references in the react mouse click event
      console.log(
        'onMediaClick',
        '[react.MouseEvent]',
        result.mediaItemDetails,
        surroundings,
        analyticsEvent,
      ),
  },
};

export interface DemoRendererProps {
  withPortal?: boolean;
  withProviders?: boolean;
  withExtension?: boolean;
  serializer: 'react' | 'text' | 'email';
  document?: object;
  appearance?: RendererAppearance;
  maxHeight?: number;
  truncationEnabled?: boolean;
  allowHeadingAnchorLinks?: boolean;
  allowColumnSorting?: boolean;
}

export interface DemoRendererState {
  input: string;
  portal?: HTMLElement;
  truncated: boolean;
  showSidebar: boolean;
  shouldUseEventHandlers: boolean;
}

export default class RendererDemo extends React.Component<
  DemoRendererProps,
  DemoRendererState
> {
  textSerializer = new TextSerializer(defaultSchema);

  emailRef?: HTMLIFrameElement;

  inputBox?: HTMLTextAreaElement | null;

  emailTextareaRef?: any;

  constructor(props: DemoRendererProps) {
    super(props);

    const doc = this.props.document ? this.props.document : storyDataDocument;

    // Prevent browser retain the previous scroll position when refresh,
    // This code is necessary for pages with scrollable body to avoid two scroll actions.
    // For pages such as confluence(with a scrollable div), this code is not necessary.
    if (props.allowHeadingAnchorLinks && history.scrollRestoration === 'auto') {
      history.scrollRestoration = 'manual';
    }

    this.state = {
      input: JSON.stringify(doc, null, 2),
      truncated: true,
      showSidebar: true,
      shouldUseEventHandlers: false,
    };
  }

  private handlePortalRef = (portal: HTMLElement | null) => {
    this.setState({ portal: portal || undefined });
  };

  render() {
    return (
      <div ref="root" style={{ padding: 20 }}>
        <fieldset style={{ marginBottom: 20 }}>
          <legend>Input</legend>
          <textarea
            id="renderer-value-input"
            style={{
              boxSizing: 'border-box',
              border: '1px solid lightgray',
              fontFamily: 'monospace',
              fontSize: 14,
              padding: 10,
              width: '100%',
              height: 220,
            }}
            ref={(ref) => {
              this.inputBox = ref;
            }}
            onChange={this.onDocumentChange}
            value={this.state.input}
          />
          <button onClick={this.toggleEventHandlers}>
            Toggle Event handlers
          </button>
        </fieldset>
        <div tw="prose prose-primary">{this.renderRenderer()}</div>
        {this.renderText()}
      </div>
    );
  }

  private toggleTruncated() {
    this.setState((prevState) => ({
      truncated: !prevState.truncated,
    }));
  }

  private renderRenderer(additionalRendererProps: any = {}) {
    const { shouldUseEventHandlers } = this.state;
    if (this.props.serializer !== 'react') {
      return null;
    }

    try {
      let props: RendererProps = {
        document: JSON.parse(this.state.input),
      };

      if (this.props.withProviders) {
        props.eventHandlers = shouldUseEventHandlers
          ? eventHandlers
          : undefined;
        props.dataProviders = providerFactory;
      }

      if (this.props.allowHeadingAnchorLinks) {
        props.allowHeadingAnchorLinks = true;
      }

      if (this.props.withExtension) {
        props.extensionHandlers = extensionHandlers;
      }

      if (this.props.withPortal) {
        props.portal = this.state.portal;
      }

      props.maxHeight = this.props.maxHeight;
      props.truncated = this.props.truncationEnabled && this.state.truncated;
      props.allowColumnSorting = this.props.allowColumnSorting;

      if (additionalRendererProps) {
        props = {
          ...props,
          ...additionalRendererProps,
        };
      }

      props.appearance = this.props.appearance;

      const expandButton = (
        <div>
          <Button
            appearance="link"
            spacing="none"
            onClick={this.toggleTruncated}
          >
            {this.state.truncated ? 'Expand text' : 'Collapse text'}
          </Button>
          &nbsp;&middot;&nbsp;
          <Button appearance="link" spacing="none">
            Do something else
          </Button>
        </div>
      );

      return (
        <div>
          <div style={{ color: '#ccc', marginBottom: '8px' }}>
            &lt;Renderer&gt;
          </div>
          <div id="RendererOutput">
            <Renderer {...props} />
          </div>
          {this.props.truncationEnabled ? expandButton : null}
          <div style={{ color: '#ccc', marginTop: '8px' }}>
            &lt;/Renderer&gt;
          </div>
          <div ref={this.handlePortalRef} />
        </div>
      );
    } catch (ex) {
      return <pre>Invalid document: {ex.stack}</pre>;
    }
  }

  private renderText() {
    if (this.props.serializer !== 'text') {
      return null;
    }

    try {
      const doc = JSON.parse(this.state.input);

      return (
        <div>
          <h1>Text output</h1>
          <pre>{renderDocument(doc, this.textSerializer).result}</pre>
        </div>
      );
    } catch (ex) {
      return null;
    }
  }

  private toggleEventHandlers = () => {
    this.setState((prevState) => ({
      shouldUseEventHandlers: !prevState.shouldUseEventHandlers,
    }));
  };

  private onDocumentChange = () => {
    if (this.inputBox) {
      this.setState({ input: this.inputBox.value });
    }
  };
}
