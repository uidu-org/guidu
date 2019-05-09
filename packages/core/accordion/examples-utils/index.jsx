import React from 'react';

export const defaultAccordionItems = [
         {
           title: expanded => (
             <h6>Test | {expanded ? '' : '| 4 tasks'}</h6>
           ),
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
          uuid: 'second',
           title: expanded => (
             <h6>Test 2 {expanded ? '' : '| 6 tasks'}</h6>
           ),
           body: <p>Ciaoone</p>,
           bodyProps: {
             className: 'text-primary',
           },
         },
       ];
