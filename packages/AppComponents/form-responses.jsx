import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Question } from 'components/FormQuestion';
import { Form, FormSubmit } from '@uidu/forms';
import { Input } from '@uidu/inputs';

export default class FormResponses extends PureComponent {
  handleSubmit = model => {
    const { formResponse, createFormResponse, updateFormResponse } = this.props;
    if (!formResponse.id) {
      return createFormResponse(model);
    }
    return updateFormResponse(formResponse, model);
  };

  render() {
    const { form, formResponse, responsable, contact } = this.props;

    if (!form) {
      return <p>Loading</p>;
    }

    return (
      <Form
        handleSubmit={this.handleSubmit}
        footerRenderer={({ canSubmit, loading }) => (
          <div className="row">
            <div className="col-sm-6 col-lg-4">
              <FormSubmit
                label="Salva i dati"
                className="btn btn-donations btn-block"
                canSubmit={canSubmit}
                loading={loading}
              />
            </div>
          </div>
        )}
      >
        <Input
          type="hidden"
          name="form_response[contact_id]"
          value={contact.id}
        />
        <Input type="hidden" name="form_response[form_id]" value={form.id} />
        <Input
          type="hidden"
          name="form_response[responsable_id]"
          value={responsable.id}
        />
        <Input
          type="hidden"
          name="form_response[responsable_type]"
          value={responsable.klass}
        />
        {form.questions.map((question, index) => (
          <Question
            index={index}
            key={question.id}
            answers={formResponse.answers}
            question={question}
          />
        ))}
      </Form>
    );
  }
}

FormResponses.propTypes = {
  form: PropTypes.shape(PropTypes.obj),
  formResponse: PropTypes.shape(PropTypes.obj),
  createFormResponse: PropTypes.func.isRequired,
  updateFormResponse: PropTypes.func.isRequired,
  testMode: PropTypes.bool,
};

FormResponses.defaultProps = {
  form: null,
  formResponse: {},
  testMode: false,
};
