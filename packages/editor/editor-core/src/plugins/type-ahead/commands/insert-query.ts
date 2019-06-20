import { safeInsert } from 'prosemirror-utils';
import { Command } from '../../../types';

export function insertTypeAheadQuery(trigger: string): Command {
  return function(state, dispatch) {
    if (dispatch) {
      dispatch(
        safeInsert(
          state.schema.text(trigger, [
            state.schema.marks.typeAheadQuery.create({ trigger }),
          ]),
        )(state.tr),
      );
    }
    return true;
  };
}
