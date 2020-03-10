import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldMentionsComponent from './components/FieldMentions';
export { default as FieldMentionsStateless } from './components/FieldMentionsStateless';
export { defaultMentionStyle, defaultStyle } from './utils';

const FieldMentions = withFormsy(ComponentHOC(FieldMentionsComponent));

export default FieldMentions;
