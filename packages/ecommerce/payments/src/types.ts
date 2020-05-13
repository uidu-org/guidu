import {
  PaymentIntent,
  PaymentMethod,
  Stripe,
  StripeElementsOptions,
} from '@stripe/stripe-js';

export type PaymentProviderTypes = {
  id: 'card' | 'bank_account';
  name?: string | React.ReactNode;
};

export interface SharedPaymentProps {
  provider: PaymentProviderTypes;
  stripe?: Stripe | Promise<Stripe | null>;
  stripeOptions?: StripeElementsOptions;
  stripeBillingDetails: PaymentMethod['billing_details'];
  scope?: string;
}

export type PaymentsProps = SharedPaymentProps & {
  amount: number;
  onSuccess: (paymentIntent: PaymentIntent) => void;
  clientSecret: PaymentIntent['client_secret'];
  children: (paymentProps: any) => any;
};

export type SubscriptionProps = SharedPaymentProps & {
  createSubscription: any;
  onSuccess: (paymentIntent: PaymentIntent) => void;
  children: (paymentProps: any) => any;
};

export type PayWithProps = {
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
