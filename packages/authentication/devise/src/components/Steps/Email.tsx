import FieldText from '@uidu/field-text';
import { Form, FormSubmit } from '@uidu/form';
import React, { PureComponent } from 'react';
import { ArrowLeft } from 'react-feather';
import { Link } from 'react-router-dom';
import { userDataFromIdentity } from '../../utils';

export default class DeviseStepEmail extends PureComponent<any> {
  handleSubmit = model => {
    const { routes, checkExistence, history, onSave } = this.props;
    return checkExistence(model.user.email).then(response => {
      if (response.data.exists) {
        return onSave({ ...model.user, ...response.data }).then(() =>
          history.push(`${routes.sessions}/email/password`),
        );
      }
      return onSave({ ...model.user, ...response.data }).then(() =>
        history.push(`${routes.sessions}/email/info`),
      );
    });
  };

  render() {
    const { currentIdentity, routes } = this.props;
    return (
      <Form
        handleSubmit={this.handleSubmit}
        footerRenderer={({ canSubmit, loading }) => [
          <FormSubmit
            className="btn-primary w-100"
            canSubmit={canSubmit}
            loading={loading}
            label="Avanti"
          />,
          <Link
            to={routes.sessions}
            className="btn btn-sm shadow-none d-flex align-items-center justify-content-center mt-3"
          >
            <ArrowLeft className="mr-2" size={18} />
            Altre opzioni
          </Link>,
        ]}
      >
        {currentIdentity && [
          <FieldText
            type="hidden"
            name="identity_ids"
            value={currentIdentity.id}
          />,
          <FieldText
            label="Conferma il tuo nome"
            name="user[first_name]"
            value={userDataFromIdentity(currentIdentity).firstName}
          />,
          <FieldText
            label="Conferma il tuo cognome"
            name="user[last_name]"
            value={userDataFromIdentity(currentIdentity).lastName}
          />,
          <FieldText
            type="hidden"
            name="user[remote_avatar_url]"
            value={userDataFromIdentity(currentIdentity).avatar}
          />,
        ]}
        <FieldText
          type="email"
          label={
            currentIdentity && currentIdentity.data.email
              ? 'Conferma la tua email'
              : 'Inserisci la tua email'
          }
          name="user[email]"
          autoComplete="email"
          autoCorrect="off"
          value={currentIdentity ? currentIdentity.data.email : ''}
          required
        />
      </Form>
    );
  }
}
