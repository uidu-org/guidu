import React from 'react';
import CountUp from 'react-countup';
import { format, manipulator } from '../../utils';

export default function Comparator({ comparatorData, currentValue, area }) {
  if (comparatorData) {
    const previousValue: number = manipulator(comparatorData, area.rollup);
    const difference =
      currentValue && previousValue ? currentValue / previousValue - 1 : null;
    return (
      <>
        <div className="col-2 text-left">
          {difference !== null ? (
            <h6
              className={`my-0 ${
                difference >= 0 ? 'text-success' : 'text-danger'
              }`}
            >
              <CountUp
                start={0}
                end={difference}
                decimals={3}
                suffix="%"
                formattingFn={(value: any) => format(value, 'percent')}
              />
            </h6>
          ) : (
            <h6 className="text-warning my-0">N/A</h6>
          )}
        </div>
        <div className="col-5 text-left">
          <h6 className="ml-4 m-0 text-muted font-weight-light">
            <CountUp
              start={0}
              end={previousValue}
              decimals={2}
              formattingFn={(value: any) => format(value, area.formatter)}
            />
          </h6>
        </div>
      </>
    );
  }
  return null;
}
