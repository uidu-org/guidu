import { ServiceAccountWithType } from '../domain';

export const UPDATE_SERVICE_LIST = 'SERVICE_LIST_UPDATE';

export interface UpdateServiceListAction {
  readonly type: 'SERVICE_LIST_UPDATE';
  readonly accounts: Promise<ServiceAccountWithType[]>;
}

export function updateServiceList(
  accounts: Promise<ServiceAccountWithType[]>,
): UpdateServiceListAction {
  return {
    type: UPDATE_SERVICE_LIST,
    accounts,
  };
}
