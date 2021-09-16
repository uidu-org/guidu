import React from 'react';

export function Table({ children }) {
  return <table>{children}</table>;
}

export function Tr({ children, isOdd }) {
  return <tr>{children}</tr>;
}

export function Td({ children }) {
  return <td tw="px-6 py-4 whitespace-nowrap">{children}</td>;
}

export function Th({ children }) {
  return (
    <th tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  );
}
