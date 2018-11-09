import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src';

const value =
  '<p>Type some text to tesst the <a href="#autosave-feature">autosave</a> feature.</p><p>ciao&nbsp;<span class="ck-tokenizr badge badge-primary badge-pill" data-widget="tokenizr" data-id="h3" data-name="Heading 2"></span>&nbsp;</p>';
ReactDOM.render(
  <App
    value={value}
    config={{
      tokenizr: {
        options: [
          {
            'data-widget': 'tokenizr',
            id: 'first_name',
            name: 'first_name',
            class: 'ck-tokenizr badge badge-primary badge-pill',
          },
          {
            'data-widget': 'tokenizr',
            id: 'h3',
            name: 'Heading 2',
            class: 'ck-tokenizr badge badge-primary badge-pill',
          },
          {
            'data-widget': 'tokenizr',
            id: 'h4',
            name: 'Heading 3',
            class: 'ck-tokenizr badge badge-primary badge-pill',
          },
        ],
      },
    }}
  />,
  document.getElementById('root'),
);
