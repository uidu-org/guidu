import FieldText from '@uidu/field-text';
import { Form, FormSubmit } from '@uidu/form';
import { RadioGroup } from '@uidu/radio';
import Select from '@uidu/select';
import classNames from 'classnames';
import React, { Component } from 'react';
import { CheckCircle } from 'react-feather';

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
        submitted={submitted}
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
                className="px-5 btn-donations btn-block mb-3"
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
        <div className="form-group mb-0 p-3 p-xl-4">
          <RadioGroup
            options={[
              {
                id: 'once',
                name: 'Una volta',
              },
              {
                id: 'month',
                name: 'Ogni mese',
              },
            ]}
            buttonClassName="btn border btn-sm w-50 mb-0"
            activeClassName="btn-donations"
            className="btn-group btn-group-toggle w-100"
            layout="elementOnly"
            name="donation[recurrence]"
            value={recurrence}
            onChange={this.handleRecurrence}
            required
          />
        </div>
        {recurrence === 'month' && (
          <p className="px-4 small text-muted">
            Potrai modificare la tua donazione ricorrente in ogni momento
          </p>
        )}
        {/*<div className="form-group px-4">
          <Input
            type="number"
            placeholder="Choose your donation amount"
            name="donation[amount]"
            layout="elementOnly"
            onChange={this.handleCustomAmount}
            min="5"
            value="30"
            autoFocus
            required
          />
        </div>
        */}
        <div className="form-group container-fluid px-3">
          <Select
            name="donation[amount]"
            options={[
              {
                id: '10',
                name: '10',
                description:
                  'towards sharing safety skills worldwide to prepare families, schools, and organizations to protect their kids',
              },
              {
                id: '25',
                name: '25',
                description:
                  'to support and guide a family whose child has suffered abuse or bullying',
              },
              {
                id: '50',
                name: '50',
                description:
                  'to put our internationally-acclaimed prevention curriculum into the hands of educators and community leaders',
              },
              {
                id: '100',
                name: '100',
                description:
                  'to help plant seeds of safety skills every day of the year for young people with disabilities who face higher risks of abuse, bullying, and violence',
              },
              {
                id: '250',
                name: '250',
                description:
                  'to help plant seeds of safety skills every day of the year for young people with disabilities who face higher risks of abuse, bullying, and violence',
              },
              {
                id: '500',
                name: '500',
                description:
                  'to help plant seeds of safety skills every day of the year for young people with disabilities who face higher risks of abuse, bullying, and violence',
              },
            ]}
            layout="elementOnly"
            menuClassName="row no-gutters mb-0"
            // menuStyle={{ marginLeft: '-0.445rem', marginRight: '-0.445rem' }}
            onChange={this.handleSelection}
            optionRenderer={(item, { getItemProps, value }) => {
              const isSelected = !customAmount && value && value.id === item.id;
              return (
                <div className="col-6 d-flex" key={item.id}>
                  <button
                    {...getItemProps({ item })}
                    type="button"
                    key={item.id}
                    className={classNames('card m-2 flex-row flex-grow-1 p-2', {
                      'border-donations': isSelected,
                    })}
                    tabIndex={0}
                  >
                    {isSelected && (
                      <div
                        className="position-absolute d-flex align-items-center"
                        style={{ top: 6, right: 6 }}
                      >
                        <CheckCircle size={13} color="#26a69a" />
                      </div>
                    )}
                    <h5 className="text-medium m-0 text-nowrap flex-shrink-0 w-100">
                      <sup
                        className="small text-muted mr-1"
                        style={{ top: '-.3em' }}
                      >
                        <small>€</small>
                      </sup>
                      {item.name}
                    </h5>
                  </button>
                </div>
              );
            }}
            exposed
            required={!customAmount}
          />
          <div className="m-2">
            <button
              type="button"
              className={classNames(
                'card flex-row d-block p-3 w-100 text-center',
                // {
                //   'bg-primary text-white': customAmount,
                // },
              )}
              tabIndex={0}
              onClick={this.customize}
            >
              <p className="m-0 text-medium text-center text-nowrap flex-shrink-0">
                Choose your amount
              </p>
            </button>
          </div>
          {customAmount && (
            <div className="form-group mt-3 m-2">
              <FieldText
                type="number"
                placeholder="Choose your donation amount"
                name="donation[amount]"
                layout="elementOnly"
                onChange={this.handleCustomAmount}
                min="5"
                autoFocus
                required
              />
            </div>
          )}
        </div>
        {/* {recurrence !== 'month' && (
          <div className="px-4 form-group justify-content-center d-flex">
            <ModalTrigger
              onSave={() => {
                console.log('save');
              }}
              modalContent={
                <Modal>
                  <ModalBody>
                    <p>Dona in onore di</p>
                  </ModalBody>
                </Modal>
              }
            >
              <button
                className="d-flex align-items-center btn btn-sm"
                type="button"
              >
                <Gift size={18} className="mr-2 flex-shrink-0" /> Give in honor
                of someone
              </button>
            </ModalTrigger>
          </div>
        )} */}
      </Form>
    );
  }
}
