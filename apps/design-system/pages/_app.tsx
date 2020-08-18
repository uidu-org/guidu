import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import '../styles/globals.css';

const mdComponents = {
  h1: (props) => <h1 style={{ color: 'tomato' }} {...props} />,
};

function MyApp({ Component, pageProps }) {

  return (
    <MDXProvider components={mdComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp
