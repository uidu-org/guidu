import { TaskListContent, TaskListDefinition } from '@uidu/adf-schema';

export const taskList = (attrs: TaskListDefinition['attrs']) => (
  ...content: TaskListContent
): TaskListDefinition => ({
  type: 'taskList',
  attrs,
  content,
});
