import { Stripe } from '@stripe/stripe-js';
import { PaymentProviderTypes } from '@uidu/payments';

export type Pledge = {
  id?: string | number;
  amount: number;
  name?: string;
  description?: string;
};

export type DonateProps = {
  stripe: Stripe;
  donation?: any;
  donationCampaign?: any;
  onCreate: (donation, token) => void;
  currentMember?: any;
  currentOrganization: any;
  providers: Array<PaymentProviderTypes>;
  pledges: Array<Pledge>;
  currency: string;
};

export type DonateState = {
  donation: any;
  contact?: any;
  activeSlide: number;
  provider: PaymentProviderTypes;
};
