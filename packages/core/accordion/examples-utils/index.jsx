import React from 'react';

export const defaultAccordionItems = [
  {
    title: <h4>Test |</h4>,
    body: (
      <p>
        Accessible Accordion component for React. Inspired by{' '}
        <a
          href="https://github.com/react-component/collapse"
          target="_blank"
          rel="noopener noreferrer"
        >
          rc-collapse
        </a>{' '}
        and{' '}
        <a
          href="https://github.com/daviferreira/react-sanfona"
          target="_blank"
          rel="noopener noreferrer"
        >
          react-sanfona
        </a>
        .
      </p>
    ),
  },
  {
    title: <h4>Test ||</h4>,
    body: <p>Ciaoone</p>,
    bodyProps: {
      className: 'text-primary',
    },
  },
];
