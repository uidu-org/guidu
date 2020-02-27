import {
  PaymentIntent,
  Stripe,
  StripeElementsOptions,
  StripeError,
} from '@stripe/stripe-js';

export type PaymentProviderTypes = {
  id: 'card' | 'bank_account';
  name: string | React.ReactNode;
};

export type PaymentsProps = {
  amount: number;
  provider: PaymentProviderTypes;
  stripe?: Stripe;
  stripeOptions?: StripeElementsOptions;
  scope?: string;
  onSuccess: ({
    paymentIntent,
    error,
  }: {
    paymentIntent?: PaymentIntent;
    error?: StripeError;
  }) => void;
  clientSecret: PaymentIntent['client_secret'];
  children: (paymentProps: any) => any;
};

export type SubscriptionProps = {
  provider: PaymentProviderTypes;
  stripe?: Stripe;
  stripeOptions?: StripeElementsOptions;
  scope?: string;
  createSubscription: any;
  onSuccess: ({
    paymentIntent,
    error,
  }: {
    paymentIntent?: PaymentIntent;
    error?: StripeError;
  }) => void;
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
