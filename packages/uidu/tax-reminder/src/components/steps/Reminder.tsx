import FieldDate from '@uidu/field-date';
import { Form, FormSubmit } from '@uidu/form';
import Select from '@uidu/select';
import moment from 'moment';
import React, { Component } from 'react';

export default class Donation extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      customAmount: false,
      selectedAmount: null,
      recurrence: 'once',
    };
  }

  customize = e => {
    e.preventDefault();
    this.setState({
      customAmount: true,
    });
  };

  handleSubmit = async model => {
    console.log(model);
    this.props.onSave({
      donation: {
        ...model.donation,
        amount: parseInt(model.donation.amount.id, 10) * 100,
      },
    });
  };

  handleRecurrence = (name, value) => {
    this.setState({
      recurrence: value,
    });
  };

  handleSelection = (name, value) => {
    this.setState({
      customAmount: false,
      selectedAmount: value.id,
    });
  };

  handleCustomAmount = (name, value) => {
    this.setState({
      selectedAmount: value,
    });
  };

  render() {
    const { submitted } = this.props;
    const { selectedAmount, customAmount, amount, recurrence } = this.state;

    return (
      <Form
        handleSubmit={this.handleSubmit}
        footerRenderer={({ canSubmit, loading }) => [
          <div key="form-footer">
            <div className="w-100 px-4">
              <FormSubmit
                label={
                  <span>
                    Dona {selectedAmount && `${selectedAmount} €`}{' '}
                    {recurrence === 'month' && (
                      <span className="small">
                        <i>al mese</i>
                      </span>
                    )}
                  </span>
                }
                loading={loading}
                canSubmit={canSubmit}
                className="px-5 btn-tax-returns btn-block mb-3"
              />
            </div>
          </div>,
          selectedAmount && (
            <p
              className="text-muted mb-0 px-4"
              key="month-recurring-suggestion"
            >
              {' '}
              on hover dovrei mostrare la description del "Piano" qui sotto{' '}
              {selectedAmount}
            </p>
          ),
        ]}
      >
        <p>
          Quando hai in programma la dichiarazione dei redditi? Ti manderemo un
          promemoria il giorno selezionato.
        </p>
        <FieldDate
          label="Che giorno vuoi ricevere il promemoria?"
          name="tax_return_campaign_reminder[day]"
          selectMonths
          value={moment().toDate()}
          required
        />
        <Select
          options={moment()
            .localeData()
            .months()
            .map((item, index) => ({
              id: index + 1,
              name: item.charAt(0).toUpperCase() + item.slice(1),
            }))}
          label="Fascia oraria"
          name="tax_return_campaign_reminder[month]"
          value={6}
          required
        />
      </Form>
    );
  }
}
