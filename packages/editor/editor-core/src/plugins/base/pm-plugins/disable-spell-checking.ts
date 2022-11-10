import { SafePlugin } from '@uidu/editor-common/safe-plugin';
import {
  Browsers,
  DisableSpellcheckByBrowser,
} from '@uidu/editor-common/types';
import { browser as browserEnv } from '@uidu/editor-common/utils';
import { EditorState, PluginKey } from 'prosemirror-state';
import { getFeatureFlags } from '../../feature-flags-context';

function getCurrentBrowserAndVersion():
  | {
      browser: Browsers;
      version: number;
    }
  | undefined {
  switch (true) {
    case browserEnv.chrome === true:
      return { browser: 'chrome', version: browserEnv.chrome_version };
    case browserEnv.ie === true:
      return { browser: 'ie', version: browserEnv.ie_version };
    case browserEnv.gecko === true:
      return { browser: 'gecko', version: browserEnv.gecko_version };
    case browserEnv.safari === true:
      return { browser: 'safari', version: browserEnv.safari_version };
  }
  return undefined;
}

export default () =>
  new SafePlugin({
    key: new PluginKey('disableSpellchecking'),
    props: {
      attributes: (editorState: EditorState) => {
        const featureFlags = getFeatureFlags(editorState) || undefined;
        if (!featureFlags) {
          return;
        }

        const browserConfigFeatureFlag: DisableSpellcheckByBrowser | undefined =
          featureFlags.disableSpellcheckByBrowser;

        const userCurrentBrowserAndVersion = getCurrentBrowserAndVersion();
        if (!userCurrentBrowserAndVersion || !browserConfigFeatureFlag) {
          return;
        }

        const browserVersionDisableRange =
          browserConfigFeatureFlag[userCurrentBrowserAndVersion!.browser];

        if (
          !browserVersionDisableRange ||
          !browserEnv[userCurrentBrowserAndVersion.browser]
        ) {
          return;
        }

        const shouldDisableSpellcheck = !!browserVersionDisableRange.maximum
          ? userCurrentBrowserAndVersion.version >=
              browserVersionDisableRange.minimum &&
            userCurrentBrowserAndVersion.version <=
              browserVersionDisableRange.maximum
          : browserEnv[userCurrentBrowserAndVersion.browser] &&
            userCurrentBrowserAndVersion.version >=
              browserVersionDisableRange.minimum;

        if (shouldDisableSpellcheck) {
          return { spellcheck: 'false' };
        }

        return;
      },
    },
  });
