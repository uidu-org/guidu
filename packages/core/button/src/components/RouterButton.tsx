import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonProps } from '../types';
import Button from './Button';

export default function RouterButton(props: ButtonProps) {
  return <Button as={Link} to={props.to} {...props} />;
}
