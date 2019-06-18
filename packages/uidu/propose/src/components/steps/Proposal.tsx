import Field from '@uidu/field';
import { Form, FormSubmit } from '@uidu/form';
import React, { Component } from 'react';

export default class Proposal extends Component<any, any> {
  render() {
    const { form, proposal } = this.props;

    return (
      <Form
        handleSubmit={this.props.handleSubmit}
        footerRenderer={({ canSubmit, loading }) => [
          <div key="form-footer">
            <div className="w-100 px-4">
              <FormSubmit
                loading={loading}
                canSubmit={canSubmit}
                className="px-5 btn-tax-returns btn-block mb-3"
              />
            </div>
          </div>,
        ]}
      >
        {form.questions.map(question => (
          <Field
            answers={proposal.answers}
            object="proposal"
            question={question}
          />
        ))}
      </Form>
    );
  }
}
