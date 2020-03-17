import React from 'react';

const getCounts = (array: Array<any>) =>
  array.reduce((a, c) => ((a[c] = (a[c] || 0) + 1), a), Object.create(null));

export default function MessageReactions({ reactions = [] }) {
  const reactionsCounter = getCounts(reactions);
  return (
    <div className="mt-2">
      {Object.keys(reactionsCounter).map(reaction => (
        <button key={reaction} className="btn btn-sm border mr-2 px-2 py-1">
          {reaction} {reactionsCounter[reaction]}
        </button>
      ))}
    </div>
  );
}
