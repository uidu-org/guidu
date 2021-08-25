import { CreditCard, DollarSign } from 'react-feather';
import { PaymentProviders } from '../../types';
import PayWithBank from './Bank';
import PayWithCard from './Card';
import PayWithCardSplit from './CardSplit';

const paymentProviders: PaymentProviders[] = [
  {
    id: 'credit_card',
    component: PayWithCard,
    name: 'Card',
    icon: CreditCard,
  },
  {
    id: 'credit_card_split',
    component: PayWithCardSplit,
    name: 'CardSplit',
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
