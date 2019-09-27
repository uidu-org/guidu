import { decisionListSelector, taskListSelector } from '@atlaskit/adf-schema';
import {
  akEditorFullWidthLayoutWidth,
  akEditorGutterPadding,
  akEditorMenuZIndex,
} from '@uidu/editor-common';
import { colors } from '@uidu/theme';
import rafSchedule from 'raf-schd';
import * as React from 'react';
import { MouseEvent } from 'react';
import styled from 'styled-components';
import Avatars from '../../plugins/collab-edit/ui/avatars';
import { LAYOUT_OFFSET } from '../../plugins/layout/styles';
import {
  tableFullPageEditorStyles,
  tableMarginFullWidthMode,
} from '../../plugins/table/ui/styles';
import { akEditorToolbarKeylineHeight } from '../../styles';
import { EditorAppearance, EditorAppearanceComponentProps } from '../../types';
import { ClickAreaBlock } from '../Addon';
import ContentStyles from '../ContentStyles';
import PluginSlot from '../PluginSlot';
import { scrollbarStyles } from '../styles';
import Toolbar from '../Toolbar';
import WidthEmitter from '../WidthEmitter';

const SWOOP_ANIMATION = '0.5s cubic-bezier(.15,1,.3,1)';
const TOTAL_PADDING = akEditorGutterPadding * 2;

const FullPageEditorWrapper = styled.div`
  min-width: 340px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;
FullPageEditorWrapper.displayName = 'FullPageEditorWrapper';

const ScrollContainer = styled(ContentStyles)`
  flex-grow: 1;
  overflow-y: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  ${scrollbarStyles};
`;
ScrollContainer.displayName = 'ScrollContainer';

const ContentArea = styled.div<{
  fullWidthMode?: boolean;
  containerWidth?: number;
}>`
  line-height: 24px;
  height: 100%;
  width: 100%;
  padding-top: 50px;
  flex-direction: column;
  flex-grow: 1;
  padding-bottom: 55px;
  max-width: ${({ theme, fullWidthMode }: any) =>
    (fullWidthMode ? akEditorFullWidthLayoutWidth : theme.layoutMaxWidth) +
    TOTAL_PADDING}px;
  transition: margin-left ${SWOOP_ANIMATION}, max-width ${SWOOP_ANIMATION};
  margin-left: ${({ theme, fullWidthMode }: any) =>
    !fullWidthMode &&
    `calc(50% - ${(theme.layoutMaxWidth + TOTAL_PADDING) / 2}px)`};

  ${({ fullWidthMode }) =>
    fullWidthMode &&
    `
    @media (min-width: ${akEditorFullWidthLayoutWidth + TOTAL_PADDING}px) {
      margin-left: ${`calc(50% - ${(akEditorFullWidthLayoutWidth +
        TOTAL_PADDING) /
        2}px)`};
  }`}

  ${({ theme }) => `
    @media (max-width: ${theme.layoutMaxWidth + TOTAL_PADDING}px) {
      margin-left: auto;
    }
  `}

  & .ProseMirror {
    flex-grow: 1;
    box-sizing: border-box;
  }

  & .ProseMirror {
    & > * {
      /* pre-emptively clear all direct descendant content, just in case any are adjacent floated content */
      clear: both;
    }
    > p,
    > ul,
    > ol:not(${taskListSelector}):not(${decisionListSelector}),
    > h1,
    > h2,
    > h3,
    > h4,
    > h5,
    > h6 {
      /* deliberately allow wrapping of text based nodes, just in case any are adjacent floated content */
      clear: none;
    }

    > p:last-child {
      margin-bottom: 24px;
    }
  }

  ${tableFullPageEditorStyles};

  .fabric-editor--full-width-mode {
    /* Full Width Mode styles for ignoring breakout sizes */
    .fabric-editor-breakout-mark,
    .extension-container,
    .pm-table-container {
      width: 100% !important;
    }

    /* Prevent horizontal scroll on page in full width mode */
    ${({ containerWidth }) => {
      if (!containerWidth) {
        // initially hide until we have a containerWidth and can properly size them,
        // otherwise they can cause the editor width to extend which is non-recoverable
        return `
          .pm-table-container,
          .code-block,
          .extension-container {
            display: none;
          }
        `;
      }

      return `
        .pm-table-container,
        .code-block,
        .extension-container {
          max-width: ${containerWidth -
            TOTAL_PADDING -
            tableMarginFullWidthMode * 2}px;
        }

        [data-layout-section] {
          max-width: ${containerWidth - TOTAL_PADDING + LAYOUT_OFFSET * 2}px;
        }
      `;
    }}
  }
`;
ContentArea.displayName = 'ContentArea';

interface MainToolbarProps {
  showKeyline: boolean;
}

const MainToolbar = styled.div`
  position: relative;
  align-items: center;
  box-shadow: ${(props: MainToolbarProps) =>
    props.showKeyline
      ? `0 ${akEditorToolbarKeylineHeight}px 0 0 ${colors.N30}`
      : 'none'};
  transition: box-shadow 200ms;
  z-index: ${akEditorMenuZIndex};
  display: flex;
  height: 80px;
  flex-shrink: 0;

  & object {
    height: 0 !important;
  }
`;
MainToolbar.displayName = 'MainToolbar';

const MainToolbarCustomComponentsSlot = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;
MainToolbarCustomComponentsSlot.displayName = 'MainToolbar';

const SecondaryToolbar = styled.div`
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  display: flex;
  padding: 24px 0;
`;
SecondaryToolbar.displayName = 'SecondaryToolbar';

interface State {
  showKeyline: boolean;
  containerWidth?: number;
}

export default class Editor extends React.Component<
  EditorAppearanceComponentProps,
  State
> {
  state: State = { showKeyline: false };

  static displayName = 'FullPageEditor';
  private appearance: EditorAppearance = 'full-page';
  private scrollContainer: HTMLElement | undefined;
  private contentArea: HTMLElement | undefined;
  private scheduledKeylineUpdate: number | undefined;
  private scheduledWidthUpdate: number | undefined;

  stopPropagation = (event: MouseEvent<HTMLDivElement, any>) =>
    event.stopPropagation();

  scrollContainerRef = (ref: HTMLElement | null) => {
    const previousScrollContainer = this.scrollContainer;

    // remove existing handler
    if (previousScrollContainer) {
      previousScrollContainer.removeEventListener(
        'scroll',
        this.scheduleUpdateToolbarKeyline,
      );
    }

    this.scrollContainer = ref ? ref : undefined;

    if (this.scrollContainer) {
      this.scrollContainer.addEventListener(
        'scroll',
        this.scheduleUpdateToolbarKeyline,
        false,
      );
      this.updateToolbarKeyline();
      this.updateContainerWidth();
    }
  };

  updateToolbarKeyline = () => {
    if (!this.scrollContainer) {
      return false;
    }

    const { scrollTop } = this.scrollContainer;
    const showKeyline = scrollTop > akEditorToolbarKeylineHeight;
    if (showKeyline !== this.state.showKeyline) {
      this.setState({ showKeyline });
    }

    return false;
  };
  private scheduleUpdateToolbarKeyline = rafSchedule(this.updateToolbarKeyline);

  updateContainerWidth = () => {
    this.setState({
      containerWidth: this.scrollContainer!.clientWidth,
    });
  };
  private scheduleUpdateContainerWidth = rafSchedule(this.updateContainerWidth);

  handleResize = () => {
    this.scheduledKeylineUpdate = this.scheduleUpdateToolbarKeyline();
    this.scheduledWidthUpdate = this.scheduleUpdateContainerWidth();
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);

    if (this.scheduledKeylineUpdate) {
      cancelAnimationFrame(this.scheduledKeylineUpdate);
    }
    if (this.scheduledWidthUpdate) {
      cancelAnimationFrame(this.scheduledWidthUpdate);
    }
  }

  render() {
    const {
      appearance,
      editorDOMElement,
      editorView,
      editorActions,
      eventDispatcher,
      providerFactory,
      primaryToolbarComponents,
      contentComponents,
      customPrimaryToolbarComponents,
      customContentComponents,
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      disabled,
      collabEdit,
      dispatchAnalyticsEvent,
    } = this.props;

    const { showKeyline, containerWidth } = this.state;

    return (
      <FullPageEditorWrapper className="akEditor">
        <MainToolbar showKeyline={showKeyline}>
          <Toolbar
            editorView={editorView!}
            editorActions={editorActions}
            eventDispatcher={eventDispatcher!}
            providerFactory={providerFactory}
            appearance={this.appearance}
            items={primaryToolbarComponents}
            popupsMountPoint={popupsMountPoint}
            popupsBoundariesElement={popupsBoundariesElement}
            popupsScrollableElement={popupsScrollableElement}
            disabled={!!disabled}
            dispatchAnalyticsEvent={dispatchAnalyticsEvent}
          />
          <MainToolbarCustomComponentsSlot>
            <Avatars
              editorView={editorView}
              eventDispatcher={eventDispatcher}
              inviteToEditComponent={
                collabEdit && collabEdit.inviteToEditComponent
              }
              inviteToEditHandler={collabEdit && collabEdit.inviteToEditHandler}
              isInviteToEditButtonSelected={
                collabEdit && collabEdit.isInviteToEditButtonSelected
              }
            />
            {customPrimaryToolbarComponents}
          </MainToolbarCustomComponentsSlot>
        </MainToolbar>
        <ScrollContainer
          ref={this.scrollContainerRef}
          className="fabric-editor-popup-scroll-parent"
        >
          <ClickAreaBlock editorView={editorView}>
            <ContentArea
              fullWidthMode={appearance === 'full-width'}
              ref={(contentArea: HTMLElement) => {
                this.contentArea = contentArea;
              }}
              containerWidth={containerWidth}
            >
              <div
                style={{ padding: `0 ${akEditorGutterPadding}px` }}
                className={[
                  'ak-editor-content-area',
                  this.props.appearance === 'full-width'
                    ? 'fabric-editor--full-width-mode'
                    : '',
                ].join(' ')}
              >
                {customContentComponents}
                {
                  <PluginSlot
                    editorView={editorView}
                    editorActions={editorActions}
                    eventDispatcher={eventDispatcher}
                    providerFactory={providerFactory}
                    appearance={this.props.appearance || this.appearance}
                    items={contentComponents}
                    contentArea={this.contentArea}
                    popupsMountPoint={popupsMountPoint}
                    popupsBoundariesElement={popupsBoundariesElement}
                    popupsScrollableElement={popupsScrollableElement}
                    disabled={!!disabled}
                    containerElement={this.scrollContainer}
                    dispatchAnalyticsEvent={dispatchAnalyticsEvent}
                  />
                }
                {editorDOMElement}
              </div>
            </ContentArea>
          </ClickAreaBlock>
        </ScrollContainer>
        <WidthEmitter
          editorView={editorView!}
          contentArea={this.scrollContainer}
        />
      </FullPageEditorWrapper>
    );
  }
}
