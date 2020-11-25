import { CreditCard, DollarSign } from 'react-feather';
import { PaymentProviderTypes } from '../../types';
import PayWithBank from './Bank';
import PayWithCard from './Card';

const paymentProviders: PaymentProviderTypes[] = [
  {
    id: 'credit_card',
    component: PayWithCard,
    name: 'Card',
    icon: CreditCard,
  },
  {
    id: 'bank_account',
    component: PayWithBank,
    name: 'Transfer',
    icon: DollarSign,
  },
];

export { paymentProviders, PayWithBank, PayWithCard };
