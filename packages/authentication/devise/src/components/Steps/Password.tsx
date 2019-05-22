import FieldPassword from '@uidu/field-password';
import FieldText from '@uidu/field-text';
import { Form, FormActions, FormFooter, FormSubmit } from '@uidu/form';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class DeviseStepPassword extends PureComponent<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      formError: null,
    };
  }

  handleSubmit = async model => {
    const { onSave } = this.props;
    await onSave(model.user);
  };

  render() {
    const { user, slider, routes } = this.props;
    const { formError } = this.state;
    return (
      <Form
        handleSubmit={this.handleSubmit}
        footerRenderer={({ canSubmit, loading }) => [
          <FormFooter>
            <FormActions className="w-100">
              <FormSubmit
                className="btn-primary w-100"
                canSubmit={canSubmit}
                loading={loading}
                label={'utils.actions.sign_in'}
              />
            </FormActions>
          </FormFooter>,
          user && user.exists && (
            <Link
              to={{
                pathname: `/${routes.passwords}`,
                search: user && `?email=${user.email}`,
              }}
              className="btn btn-sm shadow-none d-flex align-items-center justify-content-center mt-3"
            >
              Password dimenticata?
            </Link>
          ),
        ]}
      >
        {/* <div className="text-center mb-4">
          <h3>
          {user && user.exists
            ? `Bentornat@${user.trusted ? ` ${user.trusted.name}` : ''}`
            : 'Benvenut@'}
            </h3>
            <p>
            Inserisci la tua password per accedere, o recuperala usando il
            link sottostante
            </p>
            <button
            className="btn btn-round py-2 btn btn-round py-2 d-flex align-items-center mx-auto border"
            type="button"
            onClick={() => slider.prev()}
            >
            <span className="mr-2">
            <Avatar
            size="small"
            src={user && user.trusted ? user.trusted.avatar : ''}
            />
            </span>
            {user && user.email}
            </button>
          </div> */}
        <FieldText
          type="hidden"
          name="user[email]"
          value={user && user.email}
        />
        {user && user.first_name && (
          <FieldText
            type="hidden"
            name="user[first_name]"
            value={user.first_name}
          />
        )}
        {user && user.last_name && (
          <FieldText
            type="hidden"
            name="user[last_name]"
            value={user.last_name}
          />
        )}
        <div className="form-group">
          <FieldPassword
            measurePasswordStrength={false}
            autoComplete="current-password"
            label="Inserisci la tua password"
            name="user[password]"
            type="password"
            id="new-password"
            validations="minLength:8"
            required
          />
        </div>
        {formError && (
          <div className="alert alert-danger mb-4 animated zoomIn">
            {formError.error}
          </div>
        )}
      </Form>
    );
  }
}
