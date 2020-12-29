import { ProfileCardAction, ProfileClient } from '@uidu/profilecard';

export interface ProfilecardProvider {
  cloudId: string;
  resourceClient: ProfileClient;
  getActions: (
    id: string,
    text: string,
    accessLevel?: string,
  ) => ProfileCardAction[];
}
