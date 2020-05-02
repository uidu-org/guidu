import React from 'react';
import { format } from '../../../utils';

export default function Items({
  resultSet,
  data,
  datumRenderer,
  tableColumns,
  formatter,
}) {
  return (
    <ul className="list-group list-group-flush" style={{ overflow: 'auto' }}>
      {data.map((datum) => {
        if (datumRenderer) {
          return datumRenderer(datum, resultSet);
        }

        return (
          <a
            key={datum.key}
            href="#"
            className="list-group-item list-group-item-action d-flex"
          >
            {tableColumns.map((tableColumn, index) => {
              if (index === 0) {
                return (
                  <span className="text-truncate">
                    {datum[tableColumn.key]}
                  </span>
                );
              }
              return (
                <span className="text-muted ml-auto text-nowrap">
                  {formatter
                    ? format(datum[tableColumn.key], formatter)
                    : datum[tableColumn.key]}
                </span>
              );
            })}
          </a>
        );
      })}
    </ul>
  );
}
