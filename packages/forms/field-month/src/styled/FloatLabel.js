import styled from 'styled-components';
// Float Labels
// https://github.com/tonystar/bootstrap-float-label 4.0.2

export default styled.label`
  display: block;
  margin-bottom: 0;
  position: relative;

  & > span {
    cursor: text;
    font-size: 0.8rem;
    left: 1rem;
    line-height: 1;
    opacity: 1;
    padding: 0 1px;
    pointer-events: none;
    position: absolute;
    top: -0.5em;
    transition: left, opacity, top 0.2s;
    z-index: 3;

    &::after {
      background: #fff;
      content: ' ';
      display: block;
      height: 2px;
      left: -0.02em;
      position: absolute;
      right: -0.02em;
      top: 50%;
      z-index: -1;
    }
  }

  .form-control {
    &:placeholder-shown {
      &:not(:focus) {
        &::placeholder {
          opacity: 0;
        }

        & + * {
          font-size: 1rem;
          opacity: 0.5;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }

    &::placeholder {
      opacity: 1;
      transition: left, opacity, top 0.2s;
    }
  }
`;
