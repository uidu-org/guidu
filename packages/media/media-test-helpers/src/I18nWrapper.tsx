import * as React from 'react';
import { Component, ReactElement } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import { locales, languages } from '@uidu/media-ui';
import LanguagePicker from './LanguagePicker';
import * as es from 'react-intl/locale-data/es';

addLocaleData(es);

export interface I18NWrapperState {
  locale: string;
}

export interface I18NWrapperProps {
  children: ReactElement<any>;
}

export class I18NWrapper extends Component<I18NWrapperProps, I18NWrapperState> {
  state: I18NWrapperState = {
    locale: 'en',
  };

  onLocaleChange = (option: any) => {
    this.setState({
      locale: option.value,
    });
  };

  render() {
    const { children } = this.props;
    const { locale } = this.state;
    // We need to clone the element and pass a the locale prop to force a re render
    const childrenWithLocale = React.cloneElement(children, { locale });

    return (
      <IntlProvider
        locale={this.getLocalTag(locale)}
        messages={locales[locale]}
      >
        <div>
          <LanguagePicker
            languages={languages}
            locale={locale}
            onChange={this.loadLocale}
          />
          {childrenWithLocale}
        </div>
      </IntlProvider>
    );
  }

  private loadLocale = async (locale: string) => {
    this.setState({ locale });
  };

  private getLocalTag = (locale: string) => locale.substring(0, 2);
}
