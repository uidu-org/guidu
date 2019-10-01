import * as React from 'react';
import { Status, Color } from '../src/element';

const StatusInParagraph = ({ text, color }: { text: string; color: Color }) => (
  <p>
    <Status text={text} color={color} />
  </p>
);

export default () => (
  <div>
    <StatusInParagraph text="Unavailable" color="neutral" />
    <StatusInParagraph text="New" color="purple" />
    <StatusInParagraph text="In progress" color="blue" />
    <StatusInParagraph text="Blocked" color="red" />
    <StatusInParagraph text="On hold" color="yellow" />
    <StatusInParagraph text="Done" color="green" />
  </div>
);
