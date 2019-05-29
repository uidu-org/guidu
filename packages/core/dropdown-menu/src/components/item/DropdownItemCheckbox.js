// @flow

import Item, { withItemFocus } from '@uidu/item';
import { CheckSquare as CheckboxIcon } from 'react-feather';
import supportsVoiceover from '../../util/supportsVoiceover';
import withToggleInteraction from '../hoc/withToggleInteraction';

export default withToggleInteraction(withItemFocus(Item), CheckboxIcon, () =>
  supportsVoiceover() ? 'checkbox' : 'menuitemcheckbox',
);
