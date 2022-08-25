import FieldText from '@uidu/field-text';
import Form, { FormSubmit } from '@uidu/form';
import React, { Component } from 'react';
import LinkPreview from '../src';

export default class Basic extends Component<any> {
  state = {
    url: null,
  };

  handleSubmit = async (model) => {
    await this.setState({ url: model.url });
  };

  render() {
    const { url } = this.state;
    return [
      <Form
        handleSubmit={this.handleSubmit}
        footerRenderer={({ loading, canSubmit }) => (
          <FormSubmit canSubmit={canSubmit} loading={loading} />
        )}
      >
        <FieldText type="url" name="url" />
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
