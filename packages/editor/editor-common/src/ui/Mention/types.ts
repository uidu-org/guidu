import { ProfileClient, ProfileCardAction } from '@atlaskit/profilecard';

export { ProfileCardAction };

export interface ProfilecardProvider {
  cloudId: string;
  resourceClient: ProfileClient;
  getActions: (
    id: string,
    text: string,
    accessLevel?: string,
  ) => ProfileCardAction[];
}
