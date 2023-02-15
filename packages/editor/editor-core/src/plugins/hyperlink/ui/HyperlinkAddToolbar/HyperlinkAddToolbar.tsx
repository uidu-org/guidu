import { faFont, faLink, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActivityItem, ActivityProvider } from '@uidu/activity-provider';
import { colors } from '@uidu/theme';
import Tooltip from '@uidu/tooltip';
import React, { KeyboardEvent, PureComponent } from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import styled from 'styled-components';
import { analyticsService } from '../../../../analytics';
import { linkToolbarMessages as linkToolbarCommonMessages } from '../../../../messages';
import PanelTextInput from '../../../../ui/PanelTextInput';
import RecentList from '../../../../ui/RecentSearch/RecentList';
import {
  Container,
  InputWrapper,
  UrlInputWrapper,
} from '../../../../ui/RecentSearch/ToolbarComponents';
import { INPUT_METHOD } from '../../../analytics';
import { normalizeUrl } from '../../utils';

const ClearText = styled.span`
  cursor: pointer;
  padding-right: 8px;
  color: ${colors.N80};
`;

const TextInputWrapper = styled.div`
  ${InputWrapper}
  border-top: 1px solid ${colors.N30};
`;

const IconWrapper = styled.span`
  padding: 10px;
  color: ${colors.N80};
`;

export const messages = defineMessages({
  displayText: {
    id: 'uidu.editor-core.displayText',
    defaultMessage: 'Text to display',
    description: 'Text to display',
  },
  clearText: {
    id: 'uidu.editor-core.clearLinkText',
    defaultMessage: 'Clear text',
    description: 'Clears text on the link toolbar',
  },
  clearLink: {
    id: 'uidu.editor-core.clearLink',
    defaultMessage: 'Clear link',
    description: 'Clears link in the link toolbar',
  },
});

export type LinkInputType = INPUT_METHOD.MANUAL | INPUT_METHOD.TYPEAHEAD;
export interface Props {
  onBlur?: (
    type: string,
    url: string,
    displayText: string,
    isTabPressed?: boolean,
  ) => void;
  onSubmit?: (href: string, text: string, inputMethod: LinkInputType) => void;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  autoFocus?: boolean;
  provider?: Promise<ActivityProvider>;
  displayText?: string;
  displayUrl?: string;
}

export interface State {
  provider?: ActivityProvider;
  items: Array<ActivityItem>;
  selectedIndex: number;
  text: string;
  isLoading: boolean;
  displayText: string;
}

class LinkAddToolbar extends PureComponent<
  Props & WrappedComponentProps,
  State
> {
  /* To not fire on-blur on tab-press */
  private isTabPressed: boolean = false;

  /* To prevent firing blur callback on submit */
  private submitted: boolean = false;

  private urlInputContainer: PanelTextInput | null = null;

  private displayTextInputContainer: PanelTextInput | null = null;

  private urlBlur: () => void;

  private textBlur: () => void;

  private handleClearText: () => void;

  private handleClearDisplayText: () => void;

  constructor(props: Props & WrappedComponentProps) {
    super(props);

    this.state = {
      selectedIndex: -1,
      isLoading: false,
      text: normalizeUrl(props.displayUrl),
      displayText: props.displayText || '',
      items: [],
    };

    /* Cache functions */
    this.urlBlur = this.handleBlur.bind(this, 'url');
    this.textBlur = this.handleBlur.bind(this, 'text');

    this.handleClearText = this.createClearHandler('text');
    this.handleClearDisplayText = this.createClearHandler('displayText');
  }

  async resolveProvider(unresolvedProvider: Promise<ActivityProvider>) {
    const provider = await unresolvedProvider;
    this.setState({ provider });
    return provider;
  }

  async componentDidMount() {
    if (this.props.provider) {
      const activityProvider = await this.resolveProvider(this.props.provider);
      await this.loadRecentItems(activityProvider);
    }
  }

  private async loadRecentItems(activityProvider: ActivityProvider) {
    try {
      if (!this.state.text) {
        this.setState({
          isLoading: true,
          items: limit(await activityProvider.getRecentItems()),
        });
      }
    } finally {
      this.setState({ isLoading: false });
    }
  }

  private updateInput = async (input: string) => {
    this.setState({ text: input });

    if (this.state.provider) {
      if (input.length === 0) {
        this.setState({
          items: limit(await this.state.provider.getRecentItems()),
          selectedIndex: -1,
        });
      } else {
        this.setState({
          items: limit(await this.state.provider.searchRecent(input)),
          selectedIndex: 0,
        });
      }
    }
  };

  private createClearHandler = (field: 'text' | 'displayText') => {
    return () => {
      this.setState({
        [field]: '',
      } as any);

      switch (field) {
        case 'text': {
          if (this.urlInputContainer) {
            this.urlInputContainer.focus();
          }
          break;
        }
        case 'displayText': {
          if (this.displayTextInputContainer) {
            this.displayTextInputContainer.focus();
          }
        }
      }
    };
  };

  private handleSelected = (href: string, text: string) => {
    this.setState(
      {
        displayText: text,
      },
      () => {
        if (this.props.onSubmit) {
          this.props.onSubmit(
            href,
            this.state.displayText || text,
            INPUT_METHOD.TYPEAHEAD,
          );
          this.trackAutoCompleteAnalyticsEvent(
            'uidu.editor-core.format.hyperlink.autocomplete.click',
          );
        }
      },
    );
  };

  private handleMouseMove = (objectId: string) => {
    const { items } = this.state;

    if (items) {
      const index = findIndex(items, (item) => item.objectId === objectId);
      this.setState({
        selectedIndex: index,
      });
    }
  };

  private handleSubmit = () => {
    const { items, text, selectedIndex } = this.state;
    // add the link selected in the dropdown if there is one, otherwise submit the value of the input field
    if (items && items.length > 0 && selectedIndex > -1) {
      const item = items[selectedIndex];
      const url = normalizeUrl(item.url);
      if (this.props.onSubmit) {
        this.props.onSubmit(
          url,
          this.state.displayText || item.name,
          INPUT_METHOD.TYPEAHEAD,
        );
        this.trackAutoCompleteAnalyticsEvent(
          'uidu.editor-core.format.hyperlink.autocomplete.keyboard',
        );
      }
    } else if (text && text.length > 0) {
      const url = normalizeUrl(text);
      if (this.props.onSubmit && url) {
        this.submitted = true;
        this.props.onSubmit(
          url,
          this.state.displayText || text,
          INPUT_METHOD.MANUAL,
        );
        this.trackAutoCompleteAnalyticsEvent(
          'uidu.editor-core.format.hyperlink.autocomplete.notselected',
        );
      }
    }
  };

  private handleKeyDown = (e: KeyboardEvent<any>) => {
    const { items, selectedIndex } = this.state;
    this.submitted = false;
    this.isTabPressed = e.keyCode === 9;

    if (!items || !items.length) {
      return;
    }

    if (e.keyCode === 40) {
      // down
      e.preventDefault();
      this.setState({
        selectedIndex: (selectedIndex + 1) % items.length,
      });
    } else if (e.keyCode === 38) {
      // up
      e.preventDefault();
      this.setState({
        selectedIndex: selectedIndex > 0 ? selectedIndex - 1 : items.length - 1,
      });
    }
  };

  private handleTextKeyDown = (displayText: string) => {
    this.setState({
      displayText,
    });
  };

  private handleBlur = (type: string) => {
    const url = normalizeUrl(this.state.text);
    if (this.props.onBlur && !this.submitted && url) {
      this.props.onBlur(
        type,
        url,
        this.state.displayText || this.state.text,
        this.isTabPressed,
      );
    }
  };

  private trackAutoCompleteAnalyticsEvent(name: string) {
    const numChars = this.state.text ? this.state.text.length : 0;
    analyticsService.trackEvent(name, { numChars: numChars });
  }

  render() {
    const { items, isLoading, selectedIndex, text, displayText } = this.state;
    const {
      intl: { formatMessage },
      provider,
    } = this.props;
    const placeholder = formatMessage(
      provider
        ? linkToolbarCommonMessages.placeholder
        : linkToolbarCommonMessages.linkPlaceholder,
    );

    const formatLinkAddressText = formatMessage(
      linkToolbarCommonMessages.linkAddress,
    );
    const formatClearLinkText = formatMessage(messages.clearLink);
    const formatDisplayText = formatMessage(messages.displayText);

    return (
      <div className="recent-list">
        <Container provider={!!provider}>
          <UrlInputWrapper>
            <PanelTextInput
              tw="pl-14"
              addonsBefore={[
                <IconWrapper tw="px-4">
                  <Tooltip content={formatLinkAddressText}>
                    <FontAwesomeIcon
                      icon={faLink}
                      title={formatLinkAddressText}
                    />
                  </Tooltip>
                </IconWrapper>,
              ]}
              ref={(ele) => (this.urlInputContainer = ele)}
              placeholder={placeholder}
              onSubmit={this.handleSubmit}
              onChange={this.updateInput}
              autoFocus={{ preventScroll: true }}
              onCancel={this.urlBlur}
              onBlur={this.urlBlur}
              defaultValue={text}
              onKeyDown={this.handleKeyDown}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...(text && {
                addonsAfter: [
                  <IconWrapper tw="px-4">
                    <Tooltip content={formatClearLinkText}>
                      <ClearText onClick={this.handleClearText}>
                        <FontAwesomeIcon
                          icon={faX}
                          title={formatClearLinkText}
                        />
                      </ClearText>
                    </Tooltip>
                    ,
                  </IconWrapper>,
                ],
              })}
            />
          </UrlInputWrapper>
          <RecentList
            items={items}
            isLoading={isLoading}
            selectedIndex={selectedIndex}
            onSelect={this.handleSelected}
            onMouseMove={this.handleMouseMove}
          />
          <TextInputWrapper>
            <PanelTextInput
              tw="pl-14"
              addonsBefore={[
                <IconWrapper tw="px-4">
                  <Tooltip content={formatDisplayText}>
                    <FontAwesomeIcon icon={faFont} title={formatDisplayText} />
                  </Tooltip>
                </IconWrapper>,
              ]}
              ref={(ele) => (this.displayTextInputContainer = ele)}
              placeholder={formatDisplayText}
              ariaLabel={'Link label'}
              testId={'Link label'}
              onChange={this.handleTextKeyDown}
              onCancel={this.textBlur}
              onBlur={this.textBlur}
              defaultValue={displayText}
              onSubmit={this.handleSubmit}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...(displayText && {
                addonsAfter: [
                  <IconWrapper tw="px-4">
                    <Tooltip content={formatClearLinkText}>
                      <ClearText onClick={this.handleClearDisplayText}>
                        <FontAwesomeIcon
                          icon={faX}
                          title={formatClearLinkText}
                        />
                      </ClearText>
                    </Tooltip>
                  </IconWrapper>,
                ],
              })}
            />
          </TextInputWrapper>
        </Container>
      </div>
    );
  }
}

const findIndex = (array: any[], predicate: (item: any) => boolean): number => {
  let index = -1;
  array.some((item, i) => {
    if (predicate(item)) {
      index = i;
      return true;
    }
    return false;
  });

  return index;
};

const limit = (items: Array<ActivityItem>) => {
  return items.slice(0, 5);
};

export default injectIntl(LinkAddToolbar);
