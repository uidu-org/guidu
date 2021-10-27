import React from 'react';

export default function Cell(params) {
  if (!params.value) {
    return null;
  }

  return (
    <div>
      {(params.value || []).map((attachment, index) => {
        console.log(attachment);
        return (
          <div tw="h-5 rounded" key={attachment.id}>
            <img src={attachment.url} tw="h-full rounded" />
          </div>
        );
      })}
    </div>
  );
}
