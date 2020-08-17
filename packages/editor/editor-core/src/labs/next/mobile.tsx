import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@uidu/analytics';
// import { Context as CardContext } from '@atlaskit/smart-card';
import React, { useCallback } from 'react';
// import { createContextAdapter } from '../../nodeviews';
import { MobileAppearance } from '../../ui/AppearanceComponents/Mobile';
import {
  Editor,
  EditorContent,
  EditorSharedConfig,
  EditorSharedConfigConsumer,
} from './Editor';
import { EditorProps } from './internal/editor-props-type';
import { useCreateAnalyticsHandler } from './internal/hooks/use-analytics';

export interface MobileEditorProps extends EditorProps {
  isMaxContentSizeReached?: boolean;
  maxHeight?: number;
}

// allows connecting external React.Context through to nodeviews
// const ContextAdapter = createContextAdapter({
//   card: CardContext,
// });

export function MobileEditor(
  props: MobileEditorProps & WithAnalyticsEventsProps,
) {
  const { maxHeight, createAnalyticsEvent } = props;
  const handleAnalyticsEvent = useCreateAnalyticsHandler(createAnalyticsEvent);
  const renderWithConfig = useCallback(
    (config: EditorSharedConfig | null) => {
      return (
        <MobileAppearance
          editorView={config && config.editorView}
          maxHeight={maxHeight}
        >
          <EditorContent />
        </MobileAppearance>
      );
    },
    [maxHeight],
  );

  return (
    // <ContextAdapter>
    <Editor {...props} onAnalyticsEvent={handleAnalyticsEvent}>
      <EditorSharedConfigConsumer>
        {renderWithConfig}
      </EditorSharedConfigConsumer>
    </Editor>
    // </ContextAdapter>
  );
}

MobileEditor.displayName = 'MobileEditor';

export const Mobile = withAnalyticsEvents()(MobileEditor);
