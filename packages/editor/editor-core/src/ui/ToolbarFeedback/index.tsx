import Button, { ButtonGroup } from '@uidu/button';
import { Popup } from '@uidu/editor-common';
import Spinner from '@uidu/spinner';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { openFeedbackDialog } from '../../plugins/feedback-dialog';
import { FeedbackInfo } from '../../types';
import deprecationWarnings, {
  DeprecationWarning,
} from '../../utils/deprecation-warnings';
import pickBy from '../../utils/pick-by';
import ToolbarButton from '../ToolbarButton';
import withOuterListeners from '../with-outer-listeners';
import {
  ButtonContent,
  ConfirmationHeader,
  ConfirmationImg,
  ConfirmationPopup,
  ConfirmationText,
  Wrapper,
} from './styles';

const PopupWithOutsideListeners: any = withOuterListeners(Popup);
const POPUP_HEIGHT = 388;
const POPUP_WIDTH = 280;

const EDITOR_IMAGE_URL =
  'https://confluence.atlassian.com/download/attachments/945114421/editorillustration@2x.png?api=v2';

export type EditorProduct =
  | 'bitbucket'
  | 'jira'
  | 'confluence'
  | 'stride'
  | undefined;

export interface Props {
  /** @deprecated  To pass package version use feedbackInfo property – <Editor feedbackInfo={{ packageVersion }} /> */
  packageVersion?: string;
  /** @deprecated  'To pass package name use feedbackInfo property – <Editor feedbackInfo={{ packageName }} /> */
  packageName?: string;
  product?: EditorProduct;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  /** @deprecated 'To pass feedback labels use feedbackInfo property – <Editor feedbackInfo={{ labels }} />' */
  labels?: string[];
}

const deprecations: Array<DeprecationWarning> = [
  {
    property: 'packageVersion',
    description:
      'To pass package version use feedbackInfo property – <Editor feedbackInfo={{ packageVersion }} />',
    type: 'removed',
  },
  {
    property: 'packageName',
    description:
      'To pass package name use feedbackInfo property – <Editor feedbackInfo={{ packageName }} />',
    type: 'removed',
  },
  {
    property: 'labels',
    description:
      'To pass feedback labels use feedbackInfo property – <Editor feedbackInfo={{ labels }} />',
    type: 'removed',
  },
];

export interface State {
  jiraIssueCollectorScriptLoading: boolean;
  showOptOutOption?: boolean;
  target?: HTMLElement;
}

declare global {
  interface Window {
    jQuery: any;
    ATL_JQ_PAGE_PROPS: any;
  }
}

const isNullOrUndefined = (attr: string) => attr === null || attr === undefined;

export default class ToolbarFeedback extends PureComponent<Props, State> {
  static contextTypes = {
    editorActions: PropTypes.object.isRequired,
  };

  state: State = {
    jiraIssueCollectorScriptLoading: false,
    showOptOutOption: false,
  };

  constructor(props: Props) {
    super(props);
    deprecationWarnings(ToolbarFeedback.name, props, deprecations);
  }

  private handleRef = (ref: ToolbarButton | null) => {
    if (ref) {
      this.setState({
        target: ref,
      });
    }
  };

  showJiraCollectorDialogCallback?: () => void;

  private handleSpinnerComplete() {}

  // Create a FeedbackInfo instance from props.
  private getFeedbackInfo = (): FeedbackInfo => {
    const isFeedbackInfoAttr = (attr: string) =>
      ['product', 'packageVersion', 'packageName', 'labels'].indexOf(attr) >= 0;

    return pickBy(
      (key: string, value: any) =>
        isFeedbackInfoAttr(key) && !isNullOrUndefined(value),
      this.props,
    );
  };

  render() {
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
    } = this.props;
    const iconBefore = this.state.jiraIssueCollectorScriptLoading ? (
      <Spinner isCompleting={false} onComplete={this.handleSpinnerComplete} />
    ) : undefined;

    // JIRA issue collector script is using jQuery internally
    return this.hasJquery() ? (
      <Wrapper>
        <ToolbarButton
          ref={this.handleRef}
          iconBefore={iconBefore}
          onClick={this.collectFeedback}
          selected={false}
          spacing="compact"
        >
          <ButtonContent>Feedback</ButtonContent>
        </ToolbarButton>
        {this.state.showOptOutOption && (
          <PopupWithOutsideListeners
            target={this.state.target}
            mountTo={popupsMountPoint}
            boundariesElement={popupsBoundariesElement}
            scrollableElement={popupsScrollableElement}
            fitHeight={POPUP_HEIGHT}
            fitWidth={POPUP_WIDTH}
            handleClickOutside={this.toggleShowOptOutOption}
            handleEscapeKeydown={this.toggleShowOptOutOption}
          >
            <ConfirmationPopup>
              <ConfirmationHeader>
                <ConfirmationImg src={EDITOR_IMAGE_URL} />
              </ConfirmationHeader>
              <ConfirmationText>
                <div>
                  We are rolling out a new editing experience across Atlassian
                  products. Help us improve by providing feedback.
                </div>
                <div>
                  You can opt-out for now by turning off the "Atlassian Editor"
                  feature on the Labs page in Bitbucket settings.
                </div>
                <ButtonGroup>
                  <Button appearance="primary" onClick={this.openFeedbackPopup}>
                    Give feedback
                  </Button>
                  <Button appearance="default" onClick={this.openLearnMorePage}>
                    Learn more
                  </Button>
                </ButtonGroup>
              </ConfirmationText>
            </ConfirmationPopup>
          </PopupWithOutsideListeners>
        )}
      </Wrapper>
    ) : null;
  }

  private collectFeedback = (): void => {
    if (this.props.product === 'bitbucket') {
      this.setState({ showOptOutOption: true });
    } else {
      this.openFeedbackPopup();
    }
  };

  private toggleShowOptOutOption = (): void => {
    this.setState({ showOptOutOption: !this.state.showOptOutOption });
  };

  private openJiraIssueCollector = async () => {
    this.setState({
      jiraIssueCollectorScriptLoading: true,
      showOptOutOption: false,
    });

    await openFeedbackDialog(this.getFeedbackInfo());

    this.setState({ jiraIssueCollectorScriptLoading: false });
  };

  private openFeedbackPopup = (): boolean => {
    this.openJiraIssueCollector();

    return true;
  };

  private openLearnMorePage = () => {
    window.open('https://confluence.atlassian.com/x/NU1VO', '_blank');
    this.toggleShowOptOutOption();
  };

  private hasJquery = (): boolean => {
    return typeof window.jQuery !== 'undefined';
  };
}
