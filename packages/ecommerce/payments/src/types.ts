import {
  PaymentIntent,
  PaymentMethod,
  PaymentRequest,
  Stripe,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { FormProps } from '@uidu/form';
import { FC, ReactNode } from 'react';
import { IconProps } from 'react-feather';

export type PaymentProviderTypes =
  | 'credit_card'
  | 'credit_card_split'
  | 'bank_account';

export type PaymentProviders = {
  id: PaymentProviderTypes;
  name?: string | ReactNode;
  component: FC<any>;
  icon?: FC<IconProps>;
};

export interface SharedPaymentProps {
  stripe?: Stripe | Promise<Stripe | null>;
  stripeOptions?: StripeElementsOptions;
  stripeBillingDetails?: PaymentMethod['billing_details'];
  formProps?: any;
  footerRenderer: FormProps['footerRenderer'];
  /** Label is printed in Payment Request */
  label: string;
  onSave: (paymentIntent: PaymentIntent, model: any) => Promise<any>;
  children: (paymentProps: any) => any;
  amount: number;
  providers: PaymentProviderTypes[];
}

export type SinglePaymentProps = SharedPaymentProps & {
  clientSecret: PaymentIntent['client_secret'];
};

export type RecurringPaymentProps = SharedPaymentProps & {
  createSubscription: any;
};

export type PaymentMethodsProps = {
  providers: PaymentProviderTypes[];
  paymentRequest?: PaymentRequest;
  enablePaymentRequest?: boolean;
  label: string;
  amount: number;
  handleCharge: () => void;
  onChange: (provider: PaymentProviderTypes) => void;
};

export type PayWithCardProps = {
  handleSubmit: () => void;
};
export type PayWithBankProps = {
  handleSubmit: () => void;
};

export type PayProps = PayWithCardProps &
  PayWithBankProps & {
    stripe: Stripe;
    provider: PaymentProviderTypes;
    providerProps?: any;
  };
