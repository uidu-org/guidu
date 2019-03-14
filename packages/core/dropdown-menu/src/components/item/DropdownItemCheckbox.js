// @flow

import CheckboxIcon from '@atlaskit/icon/glyph/checkbox';
import Item, { withItemFocus } from '@uidu/item';
import withToggleInteraction from '../hoc/withToggleInteraction';
import supportsVoiceover from '../../util/supportsVoiceover';

export default withToggleInteraction(withItemFocus(Item), CheckboxIcon, () =>
  supportsVoiceover() ? 'checkbox' : 'menuitemcheckbox',
);
