import ChevronLeftLargeIcon from '@atlaskit/icon/glyph/chevron-left-large';
import EditorUnlinkIcon from '@atlaskit/icon/glyph/editor/unlink';
import { ErrorMessage, ProviderFactory } from '@uidu/editor-common';
import { colors } from '@uidu/theme';
import React from 'react';
import { defineMessages, IntlShape, WrappedComponentProps } from 'react-intl';
import styled from 'styled-components';
import { linkToolbarMessages } from '../../../messages';
import PanelTextInput from '../../../ui/PanelTextInput';
import RecentSearch from '../../../ui/RecentSearch';
import {
  Container,
  UrlInputWrapper,
} from '../../../ui/RecentSearch/ToolbarComponents';
import {
  ChildProps,
  RecentSearchInputTypes,
  RecentSearchSubmitOptions,
} from '../../../ui/RecentSearch/types';
import { INPUT_METHOD } from '../../analytics/types/enums';
import Button from '../../floating-toolbar/ui/Button';
import Separator from '../../floating-toolbar/ui/Separator';
import { normalizeUrl } from '../../hyperlink/utils';

export const mediaLinkToolbarMessages = defineMessages({
  backLink: {
    id: 'uidu.editor-core.backLink',
    defaultMessage: 'Go back',
    description: 'Go back from media linking toolbar to main toolbar',
  },
});

export type Props = {
  intl: IntlShape;
  providerFactory: ProviderFactory;
  editing: boolean;
  onBack: (url: string, meta: { inputMethod?: RecentSearchInputTypes }) => void;
  onUnlink: () => void;
  onCancel: () => void;
  onBlur: (href: string) => void;
  onSubmit: (
    href: string,
    meta: { inputMethod: RecentSearchInputTypes },
  ) => void;
  displayUrl?: string;
};

const ValidationWrapper = styled.section`
  display: flex;
  line-height: 0;
  padding: 12px 24px 12px 0;
  margin: 0 4px 0 32px;
  border-top: 1px solid ${colors.R400};
  align-items: start;
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.span`
  padding: 4px 8px 4px 0px;
`;

export class LinkAddToolbar extends React.PureComponent<
  Props & WrappedComponentProps
> {
  state = {
    validationErrors: [],
  };

  private handleSubmit = ({ url, inputMethod }: RecentSearchSubmitOptions) => {
    this.props.onSubmit(url, { inputMethod });
  };

  private handleOnBack = ({
    url,
    inputMethod,
  }: {
    url: string;
    inputMethod?: RecentSearchInputTypes;
  }) => {
    const { onBack } = this.props;
    if (onBack) {
      onBack(url, { inputMethod });
    }
  };

  private handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  };

  private handleUnlink = () => {
    const { onUnlink } = this.props;
    if (onUnlink) {
      onUnlink();
    }
  };

  private handleOnBlur = (options: RecentSearchSubmitOptions) => {
    this.props.onBlur(options.url);
  };

  private getValidationErrors(
    value: string,
    inputMethod?: INPUT_METHOD,
  ): string[] {
    const {
      intl: { formatMessage },
    } = this.props;

    // dont show validation errors if input method is typeahed, which means user selects from search list
    if (inputMethod === INPUT_METHOD.TYPEAHEAD) {
      return [];
    }
    if (!value) {
      return [formatMessage(linkToolbarMessages.emptyLink)];
    }
    // if url can be normalized - we consider it is a valid url
    // also don't show validaition errors for empty values
    if (normalizeUrl(value)) {
      return [];
    } else {
      return [formatMessage(linkToolbarMessages.invalidLink)];
    }
  }

  private renderContainer = ({
    activityProvider,
    inputProps: { onChange, onKeyDown, onSubmit, value },
    currentInputMethod,
    renderRecentList,
  }: ChildProps) => {
    const {
      intl: { formatMessage },
      displayUrl,
    } = this.props;
    const getPlaceholder = (hasActivityProvider: boolean) =>
      formatMessage(
        hasActivityProvider
          ? linkToolbarMessages.placeholder
          : linkToolbarMessages.linkPlaceholder,
      );

    const formatLinkAddressText = formatMessage(
      mediaLinkToolbarMessages.backLink,
    );
    const formatUnlinkText = formatMessage(linkToolbarMessages.unlink);

    const errorsList = this.state.validationErrors.map(function (error, index) {
      return <ErrorMessage key={index}>{error}</ErrorMessage>;
    });

    return (
      <div className="recent-list">
        <Container provider={!!activityProvider}>
          <UrlInputWrapper>
            <ButtonWrapper>
              <Button
                title={formatLinkAddressText}
                icon={<ChevronLeftLargeIcon label={formatLinkAddressText} />}
                onClick={() =>
                  this.handleOnBack({
                    url: value,
                    inputMethod: currentInputMethod,
                  })
                }
              />
            </ButtonWrapper>
            <PanelTextInput
              placeholder={getPlaceholder(!!activityProvider)}
              autoFocus={true}
              onCancel={this.handleCancel}
              defaultValue={value}
              onSubmit={(inputValue) => {
                const validationErrors = this.getValidationErrors(
                  inputValue,
                  currentInputMethod,
                );
                this.setState({ validationErrors });
                if (!validationErrors.length) {
                  onSubmit();
                }
              }}
              onChange={(value) => {
                this.setState({ validationErrors: [] });
                onChange(value);
              }}
              onKeyDown={onKeyDown}
            />
            {normalizeUrl(displayUrl) && (
              <>
                <Separator />
                <Button
                  title={formatUnlinkText}
                  icon={<EditorUnlinkIcon label={formatUnlinkText} />}
                  onClick={this.handleUnlink}
                />
              </>
            )}
          </UrlInputWrapper>
          {!!errorsList.length && (
            <ValidationWrapper>{errorsList}</ValidationWrapper>
          )}
          {renderRecentList()}
        </Container>
      </div>
    );
  };

  render() {
    const { providerFactory, displayUrl } = this.props;

    return (
      <RecentSearch
        defaultUrl={normalizeUrl(displayUrl)}
        providerFactory={providerFactory}
        onSubmit={this.handleSubmit}
        onBlur={this.handleOnBlur}
        render={this.renderContainer}
      />
    );
  }
}

export default LinkAddToolbar;
