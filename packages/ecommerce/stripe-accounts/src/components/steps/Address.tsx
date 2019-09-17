import FieldText from '@uidu/field-text';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';

type AddressProps = {
  scope: 'individual' | 'business';
  stripeAccount: any;
};

export default class Address extends PureComponent<AddressProps> {
  render() {
    const { stripeAccount, scope } = this.props;
    const prefix = scope === 'individual' ? 'individual' : 'business';

    return (
      <>
        <div className="row stretched">
          <div className="col-sm-8">
            <FieldText
              type="text"
              label={
                <FormattedMessage
                  id={`guidu.stripeAccounts.${scope}.address`}
                  defaultMessage="Primary address"
                />
              }
              name={`stripe_account[${prefix}_address]`}
              value={stripeAccount[`${prefix}_address`] || ''}
              required
            />
          </div>
          <div className="col-sm-4">
            <FieldText
              type="text"
              label={
                <FormattedMessage
                  id={`guidu.stripeAccounts.${scope}.postalCode`}
                  defaultMessage="Postal code"
                />
              }
              name={`stripe_account[${prefix}_postal_code]`}
              value={stripeAccount[`${prefix}_postal_code`] || ''}
              // validations={{
              //   isLength: 5,
              // }}
              // validationErrors={{
              //   isLength: 'Inserisci un CAP valido',
              // }}
              required
            />
          </div>
        </div>
        <div className="row stretched">
          <div className="col-sm-4">
            <FieldText
              type="text"
              label={
                <FormattedMessage
                  id={`guidu.stripeAccounts.${scope}.city`}
                  defaultMessage="City"
                />
              }
              name={`stripe_account[${prefix}_city]`}
              value={stripeAccount[`${prefix}_city`] || ''}
              required
            />
          </div>
          <div className="col-sm-4">
            <FieldText
              type="text"
              label={
                <FormattedMessage
                  id={`guidu.stripeAccounts.${scope}.state`}
                  defaultMessage="State"
                />
              }
              name={`stripe_account[${prefix}_state]`}
              value={stripeAccount[`${prefix}_state`] || ''}
              // validations={{
              //   isLength: 2,
              // }}
              // validationErrors={{
              //   isLength: 'Inserisci la sigla della tua provincia (ES. MI)',
              // }}
              required
            />
          </div>
          <div className="col-sm-4">
            <FieldText
              type="text"
              label={
                <FormattedMessage
                  id={`guidu.stripeAccounts.${scope}.country`}
                  defaultMessage="Country"
                />
              }
              name={`stripe_account[${prefix}_country]`}
              value={stripeAccount[`${prefix}_country`] || ''}
              autoCapitalize="characters"
              // validations={{
              //   isLength: 2,
              // }}
              // validationErrors={{
              //   isLength: 'Inserisci la sigla dello stato (ES. IT)',
              // }}
              required
            />
          </div>
        </div>
        <FieldText
          type="text"
          label={
            <FormattedMessage
              id={`guidu.stripeAccounts.${scope}.dob`}
              defaultMessage="Date of birth"
            />
          }
          name={`stripe_account[${prefix}_birthdate]`}
          value={stripeAccount[`${prefix}_birthdate`] || ''}
          mask="99/99/9999"
          help={`GG/MM/AAAA - Es: ${moment().format('DD/MM/YYYY')}`}
          required
        />
      </>
    );
  }
}
