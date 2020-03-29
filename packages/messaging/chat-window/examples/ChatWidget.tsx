import React from 'react';

export default function ChatWidget() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ backgroundColor: 'blue', maxWidth: '65%' }}>
          <div>Message body</div>
          <div style={{ width: '100vw', maxWidth: '30rem' }}>Attachments</div>
        </div>
        <div style={{ backgroundColor: 'red' }}>actions</div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ backgroundColor: 'blue', maxWidth: '65%' }}>
          Message body
        </div>
        <div style={{ backgroundColor: 'red' }}>actions</div>
      </div>
    </div>
  );
}
