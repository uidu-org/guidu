import loadable from '@loadable/component';

const WithOptionsForm = loadable(() => import('./form'));

export default props => ({
  ...props,
  form: WithOptionsForm,
});
