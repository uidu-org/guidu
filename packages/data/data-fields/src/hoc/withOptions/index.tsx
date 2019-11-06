import loadable from '@loadable/component';
import { Field } from '../../types';

const WithOptionsForm = loadable(() => import('./form'));

const WithOptions = (props: any): Field => ({
  ...props,
  form: WithOptionsForm,
});

export default WithOptions;
