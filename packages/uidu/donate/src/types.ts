import { PaymentProviderTypes } from '@uidu/payments';

export type DonateProps = {
  donation?: any;
  donationCampaign?: any;
  onCreate: (donation, token) => void;
  currentMember?: any;
  currentOrganization: any;
  providers: Array<PaymentProviderTypes>;
};

export type DonateState = {
  donation: any;
  contact?: any;
  activeSlide: number;
  provider: PaymentProviderTypes;
};
