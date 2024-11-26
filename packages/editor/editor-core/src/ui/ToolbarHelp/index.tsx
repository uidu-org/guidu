import QuestionIcon from '@atlaskit/icon/glyph/question';
import * as React from 'react';
import ToolbarButton from '../ToolbarButton';
import WithHelpTrigger from '../WithHelpTrigger';

function ToolbarHelp() {
  return (
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
}

export default ToolbarHelp;
