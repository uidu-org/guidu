import { Plugin, Transaction } from 'prosemirror-state';
import { Step } from 'prosemirror-transform';
import { sendLogs } from '../../../utils/sendLogs';

const hasInvalidSteps = (tr: Transaction) =>
  ((tr.steps || []) as (Step & { from: number; to: number })[]).some(
    (step) => step.from > step.to,
  );

export default () => {
  return new Plugin({
    filterTransaction(tr) {
      if (hasInvalidSteps(tr)) {
        // eslint-disable-next-line no-console
        console.warn(
          'The transaction was blocked because it contains invalid steps',
          tr.steps,
        );

        sendLogs({
          events: [
            {
              name: 'uidu.fabric.editor.invalidstep',
              product: 'uidu',
              properties: {
                message: 'Blocked transaction with invalid steps',
              },
              serverTime: new Date().getTime(),
              server: 'local',
              user: '-',
            },
          ],
        });
        return false;
      }

      return true;
    },
  });
};
