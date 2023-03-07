import FieldText from '@uidu/field-text';
import Form, { FormSubmit, useForm } from '@uidu/form';
import React, { useState } from 'react';
import LinkPreview from '../src';

export default function Basic() {
  const [url, setUrl] = useState(null);

  const handleSubmit = async (model) => {
    setUrl(model.url);
  };

  const form = useForm({});

  return (
    <>
      <Form
        form={form}
        handleSubmit={handleSubmit}
        footerRenderer={({ loading, canSubmit }) => (
          <FormSubmit canSubmit={canSubmit} loading={loading} />
        )}
      >
        <FieldText type="url" name="url" />
      </Form>
      {url && (
        <LinkPreview
          url={url}
          className="flex-row mt-4 card"
          onScraped={console.log}
        />
      )}
    </>
  );
}
