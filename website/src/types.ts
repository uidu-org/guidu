export type NavGroupItem = {
  external?: boolean;
  to?: string | Record<string, string | Location>;
  title: string;
  isSelected?: (param1: string, param2: string) => boolean;
  isCompact?: boolean;
  iconSelected?: boolean;
  icon?: React.ReactNode;
  items?: Array<NavGroup>;
};

export type NavGroup = {
  title?: string;
  items: Array<NavGroupItem>;
};

export type File = {
  type: 'file';
  id: string;
  exports: () => Promise<Object>;
  contents: () => Promise<string>;
};

export type Directory = {
  type: 'dir';
  id: string;
  children: Array<any>;
};

export type Func = () => void;

export type SpinnerSizes =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | number;

export type SpinnerProps = {
  /** Time in milliseconds after component mount before spinner is visible. */
  delay?: number;
  /** Set the spinner color to white, for use in dark-themed UIs. */
  invertColor?: boolean;
  /** Handler for once the spinner has completed its outro animation */
  onComplete?: Func;
  /** Size of the spinner. */
  size?: SpinnerSizes;
  /** Whether the process is complete and the spinner should leave */
  isCompleting?: boolean;
};

export type SpinnerPhases = 'DELAY' | 'ENTER' | 'IDLE' | 'LEAVE' | '';

export type SpinnerState = {
  phase: SpinnerPhases;
};

export type Window = {
  unmountApp?: () => void;
  location: { pathname: string; search?: string };
};
