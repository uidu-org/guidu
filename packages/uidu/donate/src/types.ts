import { Stripe } from '@stripe/stripe-js';
import { PaymentProviderTypes } from '@uidu/payments';
import {
  Contact,
  Donation,
  DonationCampaign,
  Subscription,
} from '@uidu/schema.d.ts';

export type DonationProps = {
  donation?: Partial<Donation>;
  donationCampaign?: Partial<DonationCampaign>;
  handleSubmit?: any;
  providers: Array<PaymentProviderTypes>;
};

export type DonateProps = {
  embedded?: boolean;
  baseUrl: string;
  stripe: Stripe | Promise<Stripe | null>;
  donation?: Partial<Donation>;
  donationCampaign?: Partial<DonationCampaign>;
  onCreate: (donation, token) => void;
  currentContact?: any;
  currentOrganization: any;
  providers: Array<PaymentProviderTypes>;
  createPaymentIntent: (model: any) => Promise<any>;
  createDonation: (model: any) => Promise<Partial<Donation>>;
  updateDonation: (model: any) => Promise<Partial<Donation>>;
  updateCurrentContact: (model: any) => Promise<Partial<Contact>>;
  subscribeToPlan: (
    donation: Partial<Donation>,
    model: any,
  ) => Promise<Partial<Subscription>>;
};
