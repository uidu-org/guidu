import tw from 'twin.macro';

export const buttonVariants = {
  primary: {
    default: tw`--tw-bg-opacity[1] background-color[rgba(var(--brand-primary), var(--tw-bg-opacity))] color[rgba(var(--brand-on-primary), 1)] hover:bg-opacity-70`,
    hover: tw`--tw-bg-opacity[1] background-color[rgba(var(--brand-primary), var(--tw-bg-opacity))] color[rgba(var(--brand-on-primary), 1)] hover:bg-opacity-70`,
    active: tw`--tw-bg-opacity[1] background-color[rgba(var(--brand-primary), var(--tw-bg-opacity))] color[rgba(var(--brand-on-primary), 1)] hover:bg-opacity-70`,
    disabled: tw`opacity-70 background-color[rgba(var(--brand-primary), 0.7)] color[rgba(var(--brand-on-primary), 1)] hover:bg-opacity-70`,
    selected: tw`--tw-bg-opacity[1] background-color[rgba(var(--brand-primary), var(--tw-bg-opacity))] color[rgba(var(--brand-on-primary), 1)] hover:bg-opacity-70`,
    focusSelected: tw`--tw-bg-opacity[1] background-color[rgba(var(--brand-primary), var(--tw-bg-opacity))] color[rgba(var(--brand-on-primary), 1)] hover:bg-opacity-70`,
  },
  default: {
    default: tw`--tw-bg-opacity[1] background-color[rgba(var(--brand-secondary), var(--tw-bg-opacity))] color[rgba(var(--brand-on-secondary), 1)] hover:bg-opacity-70`,
    hover: tw`--tw-bg-opacity[1] background-color[rgba(var(--brand-secondary), var(--tw-bg-opacity))] color[rgba(var(--brand-on-secondary), 1)] hover:bg-opacity-70`,
    active: tw`--tw-bg-opacity[1] background-color[rgba(var(--brand-secondary), var(--tw-bg-opacity))] color[rgba(var(--brand-on-secondary), 1)] hover:bg-opacity-70`,
    disabled: tw`opacity-70 cursor-not-allowed background-color[rgba(var(--brand-secondary), var(--tw-bg-opacity))] color[rgba(var(--brand-on-secondary), 1)] hover:bg-opacity-70`,
    selected: tw`--tw-bg-opacity[1] background-color[rgba(var(--brand-secondary), var(--tw-bg-opacity))] color[rgba(var(--brand-on-secondary), 1)] hover:bg-opacity-70`,
    focusSelected: tw`--tw-bg-opacity[1] background-color[rgba(var(--brand-secondary), var(--tw-bg-opacity))] color[rgba(var(--brand-on-secondary), 1)] hover:bg-opacity-70`,
  },
};
