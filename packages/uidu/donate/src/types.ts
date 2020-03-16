import { PaymentIntent, Stripe } from '@stripe/stripe-js';
import { PaymentProviderTypes } from '@uidu/payments';

export type Pledge = {
  id?: string | number;
  amount: number;
  name?: string;
  description?: string;
};

export type DonationProps = {
  donation?: any;
  handleSubmit?: any;
  providers: Array<PaymentProviderTypes>;
  pledges: Array<Pledge>;
  currency: string;
};

export type DonateProps = {
  baseUrl: string;
  stripe: Stripe;
  donation?: any;
  donationCampaign?: any;
  onCreate: (donation, token) => void;
  currentMember?: any;
  currentOrganization: any;
  providers: Array<PaymentProviderTypes>;
  pledges: Array<Pledge>;
  currency: string;
  createContact?: (model: any) => Promise<any>;
  updateCurrentMember?: (model: any) => Promise<any>;
  createDonation?: (
    model: any,
  ) => Promise<{
    donation: any;
    client_secret: PaymentIntent['client_secret'];
  }>;
  updateDonation?: (model: any) => Promise<any>;
  createSubscription?: (
    model: any,
  ) => Promise<{
    subscription: any;
    client_secret: PaymentIntent['client_secret'];
  }>;
  updateSubscription?: (model: any) => Promise<any>;
};

export type DonateState = {
  donation: any;
  contact?: any;
  activeSlide: number;
  provider: PaymentProviderTypes;
};
