import {
  PaymentIntent,
  PaymentMethod,
  Stripe,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { FC, ReactNode } from 'react';
import { IconProps } from 'react-feather';

export type PaymentProviderTypes = {
  id: 'credit_card' | 'bank_account';
  name?: string | ReactNode;
  component: FC<any>;
  icon?: FC<IconProps>;
};

export interface SharedPaymentProps {
  provider: PaymentProviderTypes;
  stripe?: Stripe | Promise<Stripe | null>;
  stripeOptions?: StripeElementsOptions;
  stripeBillingDetails: PaymentMethod['billing_details'];
  scope?: string;
}

export type SinglePaymentProps = SharedPaymentProps & {
  amount: number;
  onSuccess: (paymentIntent: PaymentIntent) => void;
  clientSecret: PaymentIntent['client_secret'];
  children: (paymentProps: any) => any;
};

export type RecurringPaymentProps = SharedPaymentProps & {
  createSubscription: any;
  onSuccess: (paymentIntent: PaymentIntent) => void;
  children: (paymentProps: any) => any;
};

export type PaymentMethodsProps = {
  label: string;
  amount: number;
  handleCharge: () => void;
  onChange: (provider: PaymentProviderTypes) => void;
};

export type PayWithCardProps = {
  handleSubmit: () => void;
  scope?: string;
};
export type PayWithBankProps = {
  handleSubmit: () => void;
  scope?: string;
  mandate?: any;
};

export type PayProps = PayWithCardProps &
  PayWithBankProps & {
    stripe: Stripe;
    provider: PaymentProviderTypes;
    providerProps?: any;
  };
