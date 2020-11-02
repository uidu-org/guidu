import React from 'react';
import { format } from '../../../utils';

export default function Items({
  resultSet,
  data,
  datumRenderer,
  tableColumns,
  formatter,
}) {
  console.log(data);
  return (
    <ul className="list-group list-group-flush" style={{ overflow: 'auto' }}>
      {data.map((datum) =>
        datum.data.map((d) => {
          if (datumRenderer) {
            return datumRenderer(d, resultSet);
          }

          console.log(d);

          return (
            <a
              key={d.key}
              href="#"
              className="list-group-item list-group-item-action d-flex"
            >
              {tableColumns.map((tableColumn, index) => {
                if (index === 0) {
                  return (
                    <span className="text-truncate">{d[tableColumn.key]}</span>
                  );
                }
                return (
                  <span className="text-muted ml-auto text-nowrap">
                    {formatter
                      ? format(d[tableColumn.key], formatter)
                      : d[tableColumn.key]}
                  </span>
                );
              })}
            </a>
          );
        }),
      )}
    </ul>
  );
}
