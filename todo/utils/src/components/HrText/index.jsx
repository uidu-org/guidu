import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Hr = styled.hr`
  border: 0;
  color: black;
  height: 1.5em;
  line-height: 1em;
  opacity: 0.5;
  outline: 0;
  position: relative;
  text-align: center;

  &::before {
    background: linear-gradient(to right, transparent, #818078, transparent);
    content: '';
    // use the linear-gradient for the fading effect
    // use a solid background color for a solid bar
    height: 1px;
    left: 0;
    position: absolute;
    top: 50%;
    width: 100%;
  }

  &::after {
    // this is really the only tricky part, you need to specify the background color of the container element...
    background-color: #fcfcfa;
    color: #818078;
    content: attr(data-content);
    display: inline-block;
    line-height: 1.5em;
    padding: 0 0.5em;
    position: relative;
  }
`;

export default function HrText({ text }) {
  return <Hr data-content={text} />;
}

HrText.propTypes = {
  text: PropTypes.string.isRequired,
};
