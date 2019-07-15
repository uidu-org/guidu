export type PaymentProviderTypes = 'card' | 'bank_account';

export type PaymentsProps = {
  amount: number;
  provider: PaymentProviderTypes;
  stripe?: stripe.Stripe;
  scope?: string;
  onSave: (token) => void;
  onPaymentIntentSuccess: (intent) => void;
  onPaymentIntentError: (intent) => void;
  onSourceSuccess: (source) => void;
  onSourceError: (source) => void;
};

export type PaymentsState = {
  paymentIntent: any; // stripe.StripePaymentMethod;
  loading: boolean;
  formError: any;
};

export type PayWithProps = {
  label: string;
  amount: number;
  handleCharge: () => void;
  onChange: (provider: PaymentProviderTypes) => void;
};

export type PayProps = {
  provider: PaymentProviderTypes;
  providerProps?: any;
};
