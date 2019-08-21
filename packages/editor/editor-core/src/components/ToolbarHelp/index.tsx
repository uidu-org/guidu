import * as React from 'react';
import QuestionIcon from '@atlaskit/icon/glyph/question';
import ToolbarButton from '../ToolbarButton';
import WithHelpTrigger from '../WithHelpTrigger';

const ToolbarHelp = () => (
  <WithHelpTrigger
    render={(showHelp: () => void) => (
      <ToolbarButton
        onClick={showHelp}
        title="Open help dialog"
        titlePosition="left"
        iconBefore={<QuestionIcon label="Open help dialog" />}
      />
    )}
  />
);

export default ToolbarHelp;
