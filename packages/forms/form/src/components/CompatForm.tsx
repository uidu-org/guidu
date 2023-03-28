import React from 'react';
import { useForm } from 'react-hook-form';
import Form from './Form';

export default function CompatForm(props) {
  const form = useForm({});
  return <Form form={form} {...props} />;
}
