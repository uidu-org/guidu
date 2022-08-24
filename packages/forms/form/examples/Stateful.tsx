import Button from '@uidu/button';
import { ScrollableContainer, ShellBody } from '@uidu/shell';
import React, { useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import FieldText from '../../field-text/src/components/FieldText';
import Form, { FormSubmit } from '../src';

function Stateless({ setList, list, text, setText }) {
  const form = useRef<UseFormReturn>(null);
  // console.log('inputs', form.current?.inputs);
  // console.log('getCurrentValues', form.current?.getCurrentValues());
  // console.log('getPristineValues', form.current?.getPristineValues());

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <ShellBody>
      <ScrollableContainer>
        <div>
          <Form<{ foo: string; bar: string }>
            handleSubmit={async (model) => console.log(model)}
            footerRenderer={(props) => <FormSubmit {...props}>Send</FormSubmit>}
            ref={form}
          >
            <FieldText label="text foo  " name="foo" tw="border-red-500" />
            <FieldText label="text bar  " name="bar" tw="border-red-500" />
            {/* <FieldTextareaHook
              label="Long text  "
              name="long"
              register={register}
              autoSize
              onChange={console.log}
              required
            /> */}
            <button type="submit">
              Send {form.current?.formState.isValid}
            </button>
          </Form>
          <pre>{JSON.stringify(form.current?.formState, null, 2)}</pre>
          <Button
            onClick={() =>
              form.current?.setValue(
                'foo',
                (form.current?.getValues('foo') || []).concat(1),
                // {
                //   shouldDirty: true,
                // },
              )
            }
          >
            add
          </Button>
          <Button
            onClick={() =>
              form.current?.setValue(
                'bar',
                form.current?.getValues('bar') + 'foo',
                // { shouldDirty: true },
              )
            }
          >
            add text
          </Button>
        </div>
      </ScrollableContainer>
    </ShellBody>
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
