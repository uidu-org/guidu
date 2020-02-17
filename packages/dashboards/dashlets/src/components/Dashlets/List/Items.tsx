import React from 'react';
import { format } from '../../../utils';

export default function Items({ data, datumRenderer, limit, formatter }) {
  return (
    <ul
      className="list-group list-group-flush"
      style={{ overflow: 'scroll', overscrollBehavior: 'contain' }}
    >
      {data.slice(0, limit).map(datum => {
        if (datumRenderer) {
          return datumRenderer(datum);
        }

        return (
          <a
            key={datum.key}
            href="#"
            className="list-group-item list-group-item-action d-flex"
          >
            {datum.key}
            <span className="text-muted ml-auto">
              {formatter ? format(datum.value, formatter) : datum.value}
            </span>
          </a>
        );
      })}
    </ul>
  );
}
