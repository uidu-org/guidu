import { ExtensionLayout } from '@uidu/adf-schema';
import { ADNode, calcBreakoutWidth, ExtensionHandlers, getExtensionRenderer, overflowShadow, OverflowShadowProps, WidthConsumer } from '@uidu/editor-common';
import * as React from 'react';
import { RendererContext } from '..';
import { renderNodes, Serializer } from '../..';
import { RendererCssClassName } from '../../consts';

export interface Props {
  serializer: Serializer<any>;
  extensionHandlers?: ExtensionHandlers;
  rendererContext: RendererContext;
  extensionType: string;
  extensionKey: string;
  text?: string;
  parameters?: any;
  layout?: ExtensionLayout;
}

export const renderExtension = (
  content: any,
  layout: string,
  options?: OverflowShadowProps,
) => {
  return (
    <WidthConsumer>
      {({ width }) => (
        <div
          ref={options && options.handleRef}
          className={`${RendererCssClassName.EXTENSION} ${options &&
            options.shadowClassNames}`}
          style={{
            width: calcBreakoutWidth(layout, width),
          }}
          data-layout={layout}
        >
          <div className={RendererCssClassName.EXTENSION_OVERFLOW_CONTAINER}>
            {content}
          </div>
        </div>
      )}
    </WidthConsumer>
  );
};

const Extension: React.StatelessComponent<Props & OverflowShadowProps> = ({
  serializer,
  extensionHandlers,
  rendererContext,
  extensionType,
  extensionKey,
  text,
  parameters,
  layout = 'default',
  handleRef,
  shadowClassNames,
}) => {
  try {
    if (extensionHandlers && extensionHandlers[extensionType]) {
      const render = getExtensionRenderer(extensionHandlers[extensionType]);
      const content = render(
        {
          type: 'extension',
          extensionKey,
          extensionType,
          parameters,
          content: text,
        },
        rendererContext.adDoc,
      );

      switch (true) {
        case content && React.isValidElement(content):
          // Return the content directly if it's a valid JSX.Element
          return renderExtension(content, layout, {
            handleRef,
            shadowClassNames,
          });
        case !!content:
          // We expect it to be Atlassian Document here
          const nodes = Array.isArray(content) ? content : [content];
          return renderNodes(
            nodes as ADNode[],
            serializer,
            rendererContext.schema,
            'div',
          );
      }
    }
  } catch (e) {
    /** We don't want this error to block renderer */
    /** We keep rendering the default content */
  }
  // Always return default content if anything goes wrong
  return renderExtension(text || 'extension', layout, {
    handleRef,
    shadowClassNames,
  });
};

export default overflowShadow(Extension, {
  overflowSelector: `.${RendererCssClassName.EXTENSION_OVERFLOW_CONTAINER}`,
});
