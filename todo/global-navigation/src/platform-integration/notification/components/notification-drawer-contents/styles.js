// @flow

import { gridSize } from '@atlaskit/theme';

const externalContent = (hasIframeLoaded: boolean) => ({
  visibility: hasIframeLoaded ? 'visible' : 'hidden',
  height: `calc(100% - ${3 * gridSize()}px)`,
  width: '100%',
  border: 0,
  flex: '1 1 auto',
});

const spinnerWrapper = {
  display: 'flex',
  'justify-content': 'center',
  position: 'relative',
  top: '11.25rem',
};

export { externalContent, spinnerWrapper };
