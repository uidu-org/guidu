import tw from 'twin.macro';

export const buttonVariants = {
  primary: {
    default: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-primary), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-primary), 1)]`,
    focus: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-primary), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-primary), 1)] ring-2 ring-offset-1 [--tw-ring-color:rgba(var(--brand-primary), .2)]`,
    hover: tw`[--tw-bg-opacity:.8] [background-color:rgba(var(--brand-primary), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-primary), 1)]`,
    active: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-primary), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-primary), 1)]`,
    disabled: tw`opacity-70 [background-color:rgba(var(--brand-primary), 0.7)] [color:rgba(var(--brand-on-primary), 1)] `,
    selected: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-primary), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-primary), 1)]`,
    focusSelected: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-primary), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-primary), 1)]`,
  },
  secondary: {
    default: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-secondary), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-secondary), 1)]`,
    focus: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-secondary), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-secondary), 1)] ring-2 ring-offset-1 [--tw-ring-color:rgba(var(--brand-secondary), .9)]`,
    hover: tw`[--tw-bg-opacity:.8] [background-color:rgba(var(--brand-secondary), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-secondary), 1)]`,
    active: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-secondary), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-secondary), 1)]`,
    disabled: tw`opacity-70 cursor-not-allowed [background-color:rgba(var(--brand-secondary), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-secondary), 1)]`,
    selected: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-secondary), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-secondary), 1)]`,
    focusSelected: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-secondary), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-secondary), 1)]`,
  },
  default: {
    default: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-subtle), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-subtle), 1)]`,
    focus: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-subtle), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-subtle), 1)] ring-2 ring-offset-1 [--tw-ring-color:rgba(var(--brand-subtle), .9)]`,
    hover: tw`[--tw-bg-opacity:.8] [background-color:rgba(var(--brand-subtle), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-subtle), 1)]`,
    active: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-subtle), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-subtle), 1)]`,
    disabled: tw`opacity-70 cursor-not-allowed [background-color:rgba(var(--brand-subtle), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-subtle), 1)]`,
    selected: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-subtle), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-subtle), 1)]`,
    focusSelected: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-subtle), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-subtle), 1)]`,
  },

  danger: {
    default: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-danger), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-danger), 1)]`,
    focus: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-danger), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-danger), 1)] ring-2 ring-offset-1 [--tw-ring-color:rgba(var(--brand-danger), .9)]`,
    hover: tw`[--tw-bg-opacity:.8] [background-color:rgba(var(--brand-danger), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-danger), 1)]`,
    active: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-danger), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-danger), 1)]`,
    disabled: tw`opacity-70 cursor-not-allowed [background-color:rgba(var(--brand-danger), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-danger), 1)]`,
    selected: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-danger), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-danger), 1)]`,
    focusSelected: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-danger), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-danger), 1)]`,
  },
  warning: {
    default: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-warning), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-warning), 1)]`,
    focus: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-warning), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-warning), 1)] ring-2 ring-offset-1 [--tw-ring-color:rgba(var(--brand-warning), .9)]`,
    hover: tw`[--tw-bg-opacity:.8] [background-color:rgba(var(--brand-warning), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-warning), 1)]`,
    active: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-warning), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-warning), 1)]`,
    disabled: tw`opacity-70 cursor-not-allowed [background-color:rgba(var(--brand-warning), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-warning), 1)]`,
    selected: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-warning), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-warning), 1)]`,
    focusSelected: tw`[--tw-bg-opacity:1] [background-color:rgba(var(--brand-warning), var(--tw-bg-opacity))] [color:rgba(var(--brand-on-warning), 1)]`,
  },
};

export default buttonVariants;
