import React from 'react';
import { IntlProvider } from 'react-intl';
import { PortalProvider, PortalRenderer } from '../../ui/PortalProvider';
import { EditorContent } from './internal/components/EditorContent';
import { EditorInternal } from './internal/components/EditorInternal';
import {
  PresetProvider,
  usePresetContext,
} from './internal/context/preset-context';
import {
  EditorSharedConfig,
  EditorSharedConfigConsumer,
  useEditorSharedConfig,
} from './internal/context/shared-config';
import { EditorProps } from './internal/editor-props-type';

/**
 * Main Editor component. Use in combination with `EditorContent` and a `Preset`.
 * Internally it constructs `ProseMirror View` and mounts it to `EditorContent`.
 *
 * `EditorContent` can be wrapped to implement any layout/design requirements.
 *
 * ```js
 * <Preset>
 *   <Editor>
 *     <EditorContent/>
 *   </Editor>
 * </Preset>
 * ```
 */
function Editor(props: EditorProps) {
  const plugins = usePresetContext();

  return (
    <IntlProvider locale="en">
      <PortalProvider
        onAnalyticsEvent={props.onAnalyticsEvent}
        render={(portalProviderAPI) => (
          <>
            <EditorInternal
              {...props}
              plugins={plugins.length ? plugins : props.plugins}
              portalProviderAPI={portalProviderAPI}
              onAnalyticsEvent={props.onAnalyticsEvent}
            />
            <PortalRenderer portalProviderAPI={portalProviderAPI} />
          </>
        )}
      />
    </IntlProvider>
  );
}

/**
 *
 * Public API Exports.
 *
 */
export {
  PresetProvider,
  Editor,
  EditorContent,
  EditorSharedConfigConsumer,
  useEditorSharedConfig,
};
export type { EditorProps, EditorSharedConfig };
