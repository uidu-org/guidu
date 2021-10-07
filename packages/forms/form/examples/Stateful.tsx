import Button from '@uidu/button';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FieldText from '../../field-text/src/components/FieldTextHook';

function Stateless({ setList, list, text, setText }) {
  // console.log('inputs', form.current?.inputs);
  // console.log('getCurrentValues', form.current?.getCurrentValues());
  // console.log('getPristineValues', form.current?.getPristineValues());
  const { register, handleSubmit, formState, setValue, getValues } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const {
    isDirty,
    dirtyFields,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
    touchedFields,
    isSubmitting,
    isValidating,
    isValid,
    errors,
  } = formState;

  console.log(isDirty);
  console.log(dirtyFields);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldText name="foo" {...register('foo')} />
        <FieldText name="foo" {...register('bar')} />
        <button type="submit">Send {formState.isValid}</button>
      </form>
      <pre>{JSON.stringify(formState, null, 2)}</pre>
      <Button
        onClick={() =>
          setValue('foo', (getValues('foo') || []).concat(1), {
            shouldDirty: true,
          })
        }
      >
        add
      </Button>
      <Button
        onClick={() =>
          setValue('bar', getValues('bar') + 'foo', { shouldDirty: true })
        }
      >
        add text
      </Button>
    </>
  );
}

export default function StateHandler({}) {
  const [list, setList] = useState([]);
  const [text, setText] = useState('');
  return (
    <>
      <Stateless list={list} setList={setList} text={text} setText={setText} />
    </>
  );
}
