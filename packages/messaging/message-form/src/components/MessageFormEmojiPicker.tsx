import { Picker } from 'emoji-mart';
// import 'emoji-mart/css/emoji-mart.css';
import React from 'react';

export default function MessageFormEmojiPicker({
  mentionsInput,
  mentionsComponentInput,
}) {
  return (
    <Picker
      set="apple"
      onSelect={(emoji: any) => {
        const previousValue = mentionsInput.current.state.value;
        const newValue = `${previousValue ? `${previousValue.value} ` : ''}${
          emoji.native
        }`;
        mentionsInput.current.setValue({
          ...previousValue,
          value: newValue,
          plainTextValue: newValue,
        });
        mentionsComponentInput.current.handleChange(
          null,
          newValue,
          newValue,
          previousValue ? previousValue.mentions : [],
        );
      }}
      showPreview={false}
      style={{
        width: '100%',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        color: 'inherit',
        borderRadius: 0,
        border: 0,
        margin: '1rem 0 0',
      }}
    />
  );
}
