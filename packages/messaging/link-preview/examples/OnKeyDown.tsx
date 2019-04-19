import React, { Component } from 'react';
import { Form } from '@uidu/form';
import { FieldTextStateless } from '@uidu/field-text';
import debounce from 'lodash/debounce';

import LinkPreview, { extractFirstUrl } from '../src';

export default class Basic extends Component<any> {
  state = {
    url: null,
  };

  handleSubmit = async model => {
    await this.setState({ url: model.url });
  };

  debounceExtractUrl = debounce(e => {
    const { url } = this.state;
    const nextUrl = extractFirstUrl(e.target.value);
    if (url !== nextUrl) {
      this.setState({
        url: nextUrl,
      });
    }
  }, 500);

  onKeyUp = event => {
    event.persist();
    this.debounceExtractUrl(event);
  };

  render() {
    const { url } = this.state;
    return [
      <Form handleSubmit={this.handleSubmit} footerRenderer={() => {}}>
        <FieldTextStateless type="url" name="url" onKeyUp={this.onKeyUp} />
      </Form>,
      url && [
        <LinkPreview
          url={url}
          className="mt-4 card flex-row"
          onScraped={console.log}
        />,
      ],
    ];
  }
}
