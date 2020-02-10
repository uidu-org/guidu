import FieldDownshift, { DownshiftHorizontalCard } from '@uidu/field-downshift';
import FieldText from '@uidu/field-text';
import { Form, FormSubmit } from '@uidu/form';
import Select from '@uidu/select';
import React, { Component } from 'react';

const Menu = props => <div className="row" {...props} />;

const Item = props => (
  <div className="col-6 col-sm-3">
    <DownshiftHorizontalCard
      {...props}
      scope="donations"
    ></DownshiftHorizontalCard>
  </div>
);

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
    console.log(value);
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
        footerRenderer={({ canSubmit, loading }) => (
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
        )}
      >
        <Select
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
          label="Frquency"
          name="donation[recurrence]"
          value={recurrence}
          onChange={this.handleRecurrence}
          required
        />
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
        <div className="form-group">
          <label htmlFor="" className="form-label mb-2">
            Amount
          </label>
          <FieldDownshift
            layout="elementOnly"
            name="donation[amount]"
            items={[
              {
                id: '25',
                name: '25 €',
              },
              {
                id: '50',
                name: '50 €',
              },
              {
                id: '100',
                name: '100 €',
              },
              {
                id: '500',
                name: '500 €',
              },
            ]}
            // menuStyle={{ marginLeft: '-0.445rem', marginRight: '-0.445rem' }}
            onChange={this.handleSelection}
            item={Item}
            menu={Menu}
            // optionRenderer={(item, { getItemProps, value }) => {
            //   const isSelected = !customAmount && value && value.id === item.id;
            //   return (
            //     <div className="col-6 d-flex" key={item.id}>
            //       <button
            //         {...getItemProps({ item })}
            //         type="button"
            //         key={item.id}
            //         className={classNames('card m-2 flex-row flex-grow-1 p-2', {
            //           'border-donations': isSelected,
            //         })}
            //         tabIndex={0}
            //       >
            //         {isSelected && (
            //           <div
            //             className="position-absolute d-flex align-items-center"
            //             style={{ top: 6, right: 6 }}
            //           >
            //             <CheckCircle size={13} color="#26a69a" />
            //           </div>
            //         )}
            //         <h5 className="text-medium m-0 text-nowrap flex-shrink-0 w-100">
            //           <sup
            //             className="small text-muted mr-1"
            //             style={{ top: '-.3em' }}
            //           >
            //             <small>€</small>
            //           </sup>
            //           {item.name}
            //         </h5>
            //       </button>
            //     </div>
            //   );
            // }}
            required={!customAmount}
          />
          <FieldText
            addonBefore={
              <span className="input-group-text" id="basic-addon1">
                €
              </span>
            }
            type="number"
            placeholder="Or choose your donation amount"
            name="donation[amount]"
            layout="elementOnly"
            onChange={this.handleCustomAmount}
            value={selectedAmount}
            min="5"
            required
          />
        </div>
        <Select name="donation[payment_method]" label="Payment method" />
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
