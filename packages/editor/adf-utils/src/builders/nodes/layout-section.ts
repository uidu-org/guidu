import {
  LayoutColumnDefinition,
  LayoutSectionDefinition,
} from '@uidu/adf-schema';

export const layoutSection = () => (
  content: Array<LayoutColumnDefinition>,
): LayoutSectionDefinition => ({
  type: 'layoutSection',
  content,
});
