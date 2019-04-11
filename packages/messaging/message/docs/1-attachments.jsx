// @flow
import React from 'react';
import { md, Example, Props, code } from '@uidu/docs';

export default md`
  Message Attachments use [MediaFilmstrip](/packages/media/media-filmstrip) to display file attachments.


  ## Usage

  Just pass attachments as message prop.

  ${(
    <Example
      packageName="@uidu/message"
      Component={require('../examples/01-with-attachments')}
      title="Message"
      source={require('!!raw-loader!../examples/01-with-attachments')}
    />
  )}
`;
