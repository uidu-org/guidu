import {
  PaymentIntent,
  PaymentMethod,
  Stripe,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { FormProps } from '@uidu/form';
import { FC, ReactNode } from 'react';
import { IconProps } from 'react-feather';

export type PaymentProviderTypes = {
  id: 'credit_card' | 'bank_account';
  name?: string | ReactNode;
  component: FC<any>;
  icon?: FC<IconProps>;
};

export interface SharedPaymentProps {
  stripe?: Stripe | Promise<Stripe | null>;
  stripeOptions?: StripeElementsOptions;
  stripeBillingDetails: PaymentMethod['billing_details'];
  scope?: string;
  footerRenderer: FormProps['footerRenderer'];
  /** Label is printed in Payment Request */
  label: string;
  onSave: (paymentIntent: PaymentIntent, model: any) => Promise<any>;
  children: (paymentProps: any) => any;
  amount: number;
}

export type SinglePaymentProps = SharedPaymentProps & {
  clientSecret: PaymentIntent['client_secret'];
};

export type RecurringPaymentProps = SharedPaymentProps & {
  createSubscription: any;
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
