import { colors } from '@uidu/theme';
import styled from 'styled-components';

// Normal .className gets overridden by input[type=text] hence this hack to produce input.className
export const Input = styled.input<{ width?: number }>`
  input& {
    background: transparent;
    border: 0;
    border-radius: 0;
    box-sizing: content-box;
    color: ${colors.N400};
    flex-grow: 1;
    font-size: 13px;
    line-height: 20px;
    padding: 0;
    ${props => (props.width ? `width: ${props.width}px` : '')};
    min-width: 145px;

    /* Hides IE10+ built-in [x] clear input button */
    &::-ms-clear {
      display: none;
    }

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${colors.N800};
      opacity: 0.5;
    }
  }
`;
