import { PluginKey } from 'prosemirror-state';
import React from 'react';
import { EditorPlugin, FeedbackInfo } from '../../types';
import pkg from '../../version.json';
import {
  ACTION,
  ACTION_SUBJECT,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';
import { IconFeedback } from '../quick-insert/assets';
import loadJiraCollectorDialogScript from './loadJiraCollectorDialogScript';

export const pluginKey = new PluginKey('feedbackDialogPlugin');

let showJiraCollectorDialog: () => void;
let feedbackInfoHash: string;
let defaultFeedbackInfo: FeedbackInfo;

const hashFeedbackInfo = (feedbackInfo: FeedbackInfo): string => {
  const { product, packageName, packageVersion, labels } = feedbackInfo;
  return [product, packageName, packageVersion, ...(labels || [])].join('|');
};

export const openFeedbackDialog = async (feedbackInfo?: FeedbackInfo) =>
  new Promise(async (resolve, reject) => {
    const combinedFeedbackInfo = {
      ...defaultFeedbackInfo,
      ...feedbackInfo,
    };
    const newFeedbackInfoHash = hashFeedbackInfo(combinedFeedbackInfo);
    if (!showJiraCollectorDialog || feedbackInfoHash !== newFeedbackInfoHash) {
      try {
        showJiraCollectorDialog = await loadJiraCollectorDialogScript(
          [
            combinedFeedbackInfo.product || 'n/a',
            ...(combinedFeedbackInfo.labels || []),
          ],
          combinedFeedbackInfo.packageName || '',
          pkg.version,
          combinedFeedbackInfo.packageVersion || '',
        );

        feedbackInfoHash = newFeedbackInfoHash;
      } catch (err) {
        reject(err);
      }
    }

    const timeoutId = window.setTimeout(showJiraCollectorDialog, 0);
    // Return the timoutId for consumers to call clearTimeout if they need to.
    resolve(timeoutId);
  });

const feedbackDialog = (feedbackInfo: FeedbackInfo): EditorPlugin => {
  defaultFeedbackInfo = feedbackInfo;
  return {
    name: 'feedbackDialog',

    pluginsOptions: {
      quickInsert: ({ formatMessage }) => [
        {
          title: formatMessage(messages.feedbackDialog),
          description: formatMessage(messages.feedbackDialogDescription),
          priority: 400,
          keywords: ['feedback', 'bug'],
          icon: () => (
            <IconFeedback label={formatMessage(messages.feedbackDialog)} />
          ),
          action(insert, state) {
            const tr = insert('');
            openFeedbackDialog(feedbackInfo);

            return addAnalytics(state, tr, {
              action: ACTION.OPENED,
              actionSubject: ACTION_SUBJECT.FEEDBACK_DIALOG,
              attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
              eventType: EVENT_TYPE.UI,
            });
          },
        },
      ],
    },
  };
};

export default feedbackDialog;
