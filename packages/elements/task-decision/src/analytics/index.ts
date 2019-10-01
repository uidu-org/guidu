import { createAndFireEvent } from '@uidu/analytics';

export const fabricElementsChannel = 'fabric-elements';

export const createAndFireEventInElementsChannel = createAndFireEvent(
  fabricElementsChannel,
);
