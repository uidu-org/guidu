import { TaskListDefinition, TaskItemDefinition } from '@uidu/adf-schema';

export const taskList = (attrs: TaskListDefinition['attrs']) => (
  ...content: Array<TaskItemDefinition>
): TaskListDefinition => ({
  type: 'taskList',
  attrs,
  content,
});
