import { defaultSchema } from '@uidu/adf-schema';
import EmailSerializer from '@uidu/email-renderer';

export default function text({ props }) {
  console.log(props);
  // const doc = JSON.parse();
  const node = defaultSchema.nodeFromJSON({
    type: 'doc',
    version: 1,
    content: props.content,
  });
  const emailSerializer = new EmailSerializer(defaultSchema, {
    isImageStubEnabled: true,
    isInlineCSSEnabled: true,
  });
  const { result: html } = emailSerializer.serializeFragmentWithImages(
    node.content,
    // context,
  );
  // should parse content from email serializer
  return `<mj-section><mj-column><mj-text>${html}</mj-text></mj-column></mj-section>`;
}
