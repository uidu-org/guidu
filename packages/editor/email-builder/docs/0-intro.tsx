import { Example, md } from '@uidu/docs';

export default md`
# Email builder

Email Builder is an email creation tool that allows users to design and build custom emails using the powerful and popular JavaScript library, React. Built on top of the Craft.js framework, this email builder offers a range of pre-designed templates and easy-to-use drag-and-drop functionality for creating beautiful and effective emails. With the ability to add custom HTML and CSS, users have complete control over the look and feel of their emails. Whether you're a marketing professional, small business owner, or just looking to create personal emails, React Email Builder has everything you need to craft professional and engaging emails.

## Example

${(
  <Example
    Component={require('../examples/Basic').default}
    title="With Providers"
    source={require('!!raw-loader!../examples/Basic').default}
  />
)}

`;
