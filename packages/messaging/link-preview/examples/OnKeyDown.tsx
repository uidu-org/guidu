import { FieldTextStateless } from '@uidu/field-text';
import Form, { useForm } from '@uidu/form';
import debounce from 'lodash/debounce';
import React, { useState } from 'react';
import LinkPreview, { extractFirstUrl } from '../src';

export default function Basic() {
  const [url, setUrl] = useState(null);

  const handleSubmit = async (model) => {
    setUrl(model.url);
  };

  const debounceExtractUrl = debounce((e) => {
    const nextUrl = extractFirstUrl(e.target.value);
    if (url !== nextUrl) {
      setUrl(nextUrl);
    }
  }, 500);

  const onKeyUp = (event) => {
    event.persist();
    debounceExtractUrl(event);
  };

  const form = useForm({});

  return (
    <>
      <Form form={form} handleSubmit={handleSubmit} footerRenderer={() => {}}>
        <FieldTextStateless type="url" name="url" onKeyUp={onKeyUp} />
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
