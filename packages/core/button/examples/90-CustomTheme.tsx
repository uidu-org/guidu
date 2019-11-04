import AddIcon from '@atlaskit/icon/glyph/editor/add';
import { colors } from '@uidu/theme';
import Button, { ButtonGroup } from '../src';

export default () => (
  <div style={{ margin: 20 }}>
    <h3 style={{ marginBottom: 15 }}>ADG Button</h3>
    <ButtonGroup>
      <Button iconBefore={<AddIcon label="add" />}>Button</Button>
      <Button appearance="primary">Button</Button>
      <Button appearance="warning">Button</Button>
    </ButtonGroup>

    <h3 style={{ marginBottom: 15 }}>Themed Button</h3>
    <ButtonGroup>
      <ThemedButton iconBefore={<AddIcon label="add" />}>Button</ThemedButton>
      <ThemedButton appearance="primary">Button</ThemedButton>
      <ThemedButton isDisabled>Button</ThemedButton>
    </ButtonGroup>
  </div>
);

// CUSTOM BUTTON THEME - theme.ts

const ThemedButton = (props: any) => (
  <Button
    {...props}
    theme={(currentTheme, { appearance = 'default', state = 'default' }) => {
      const { buttonStyles, ...rest } = currentTheme({
        ...props,
        appearance,
        state,
      });
      return {
        buttonStyles: {
          ...buttonStyles,
          ...getButtonStyles({
            ...props,
            appearance: appearance,
            state,
          }),
        },
        ...rest,
      };
    }}
  />
);

// CUSTOM BUTTON STYLING - getStyles.ts
interface ButtonValues {
  appearance: string;
  state: string;
}

type ButtonProperty = {
  [key: string]: any;
};

export const button = {
  border: 'none',
  padding: '0px 15px',
  borderRadius: '15px',

  background: {
    default: {
      default: colors.N30,
      hover: colors.N40,
      active: colors.N50,
    },
    primary: {
      default: '#00AECC',
      hover: '#0098B7',
      active: '#0082A0',
    },
  },
  boxShadow: {
    default: {
      default: `1px 2px 0 0 ${colors.N40A}`,
      hover: `1px 2px 0 0 ${colors.N50A}`,
      active: '0px 0px 0 0',
    },
    primary: {
      default: `1px 2px 0 0 #0098B7`,
      hover: `1px 2px 0 0 #0082A0`,
      active: '0px 0px 0 0',
    },
  },
  transform: {
    default: 'initial',
    active: 'translateY(2px) translateX(1px)',
  },
  transition: {
    default:
      'background 0.1s ease-out, box-shadow 0.1s cubic-bezier(0.47, 0.03, 0.49, 1.38) transform:0.1s',
    active:
      'background 0s ease-out, box-shadow 0s cubic-bezier(0.47, 0.03, 0.49, 1.38) transform:0s',
  },
};

const getBackground = (
  background: ButtonProperty,
  { appearance, state }: ButtonValues,
) => {
  if (!background[appearance]) {
    return background.default[state];
  }
  return background[appearance][state];
};

const getBoxShadow = (
  boxShadow: ButtonProperty,
  { appearance, state }: ButtonValues,
) => {
  if (boxShadow[appearance][state]) return boxShadow[appearance][state];
  return boxShadow[appearance];
};

const getTransform = (transform: ButtonProperty, { state }: ButtonValues) => {
  return transform[state];
};

const getTransition = (transition: ButtonProperty, { state }: ButtonValues) => {
  return transition['default'][state];
};

const getButtonStyles = (props: ButtonValues) => ({
  border: button.border,
  background: getBackground(button.background, props),
  borderRadius: button.borderRadius,
  boxShadow: getBoxShadow(button.boxShadow, props),
  padding: button.padding,
  transform: getTransform(button.transform, props),
  transition: getTransition(button.transition, props),
});
