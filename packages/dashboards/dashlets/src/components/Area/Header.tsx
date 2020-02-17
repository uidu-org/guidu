import React from 'react';
import CountUp from 'react-countup';
import { format, manipulator } from '../../utils';

const renderDifference = ({ difference }) => {
  if (difference) {
    return (
      <CountUp
        start={0}
        end={difference}
        delay={0}
        decimals={3}
        suffix="%"
        formattingFn={(value: any) => format(value, 'percent')}
      >
        {({ countUpRef }) => (
          <span
            style={{ paddingTop: '0.15rem', paddingBottom: '0.15rem' }}
            className={`ml-2 px-1 badge ${
              difference >= 0 ? 'badge-success' : 'badge-warning'
            }`}
            ref={countUpRef}
          />
        )}
      </CountUp>
    );
  }
  return <span className="text-warning ml-3">N/A</span>;
};

export default function Header({
  label,
  comparatorData,
  rowData,
  namespace,
  rollup,
  formatter,
}) {
  const currentValue = manipulator(rowData[namespace], rollup);
  console.log(comparatorData);
  let previousValue, difference;
  if (comparatorData[namespace]) {
    previousValue = manipulator(comparatorData[namespace], rollup);
    console.log(previousValue);
    difference =
      currentValue && previousValue ? currentValue / previousValue - 1 : null;
  }

  console.log(difference);

  return (
    <div className="card-body">
      <h6 className="mb-1 text-muted font-weight-light d-flex align-items-center">
        {label}
        {comparatorData[namespace] ? renderDifference({ difference }) : null}
      </h6>
      <div className="row align-items-center text-nowrap">
        <div className="col-6">
          <CountUp
            start={0}
            end={currentValue}
            delay={0}
            formattingFn={value => format(value, formatter)}
          >
            {({ countUpRef }) => <h5 className="m-0" ref={countUpRef}></h5>}
          </CountUp>
        </div>
        {comparatorData[namespace] && (
          <div className="col-6 text-right">
            <h6 className="ml-4 m-0 text-muted font-weight-light">
              <CountUp
                start={0}
                end={previousValue}
                decimals={2}
                formattingFn={(value: any) => format(value, formatter)}
              />
            </h6>
          </div>
        )}
      </div>
    </div>
  );
}
