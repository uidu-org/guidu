import { SafePlugin } from '@uidu/editor-common/safe-plugin';
import { extractSliceFromStep } from '@uidu/editor-common/utils';
import { closeHistory } from 'prosemirror-history';
import { Fragment, Schema, Slice } from 'prosemirror-model';
import { PluginKey, TextSelection, Transaction } from 'prosemirror-state';
import { ReplaceAroundStep, ReplaceStep, Step } from 'prosemirror-transform';

const getEnterKeyboardActionStep = (trs: Transaction[]): Step | null => {
  const firstTr = trs.length === 1 && trs[0];

  if (
    !firstTr ||
    !firstTr.docChanged ||
    !firstTr.isGeneric ||
    !(firstTr.selection instanceof TextSelection)
  ) {
    return null;
  }
  const { selection, steps } = firstTr;
  const replaceSteps = steps.filter(
    (step) => step instanceof ReplaceStep || step instanceof ReplaceAroundStep,
  );

  if (!selection.$cursor || replaceSteps.length !== 1) {
    return null;
  }

  return replaceSteps[0];
};

const isSliceSplittingBlockNode = (slice: Slice): boolean => {
  const hasOnlyTwoChildren = slice.size > 1 && slice.content.childCount === 2;
  if (!hasOnlyTwoChildren) {
    return false;
  }

  const firstNode = slice.content.child(0);
  const secondNode = slice.content.child(1);

  return firstNode && secondNode && firstNode.type === secondNode.type;
};

const isSliceAddingNewlineChar = (slice: Slice, schema: Schema): boolean => {
  const newLine = Fragment.from(schema.text('\n'));

  return slice.content.eq(newLine);
};

export const pluginKey = new PluginKey('betterTypeHistoryPlugin');

export default () => {
  return new SafePlugin({
    key: pluginKey,

    appendTransaction: (transactions, oldState, newState) => {
      const hasHandlePasteMeta = transactions.find((tran) =>
        tran.getMeta(pluginKey),
      );
      if (hasHandlePasteMeta) {
        return closeHistory(newState.tr);
      }

      const enterStep = getEnterKeyboardActionStep(transactions);
      if (!enterStep) {
        return;
      }

      const slice = extractSliceFromStep(enterStep);
      const { schema } = newState;

      if (
        slice &&
        (isSliceSplittingBlockNode(slice) ||
          isSliceAddingNewlineChar(slice, schema))
      ) {
        return closeHistory(newState.tr);
      }
    },
  });
};
