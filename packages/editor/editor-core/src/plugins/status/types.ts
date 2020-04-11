import { Color as ColorType } from '@uidu/status/element';

export type StatusType = {
  color: ColorType;
  text: string;
  localId?: string;
};

export type StatusState = {
  isNew: boolean;
  showStatusPickerAt: number | null;
};

export interface StatusPluginOptions {
  menuDisabled: boolean;
  useInlineWrapper?: boolean;
  allowZeroWidthSpaceAfter?: boolean;
}
