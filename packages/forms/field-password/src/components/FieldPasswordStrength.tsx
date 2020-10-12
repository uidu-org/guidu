import classNames from 'classnames';
import React, { useRef } from 'react';
import Zxcvbn from 'zxcvbn';

export default function FieldPasswordStrength({
  passwordStrengths,
  instructions,
  value,
}) {
  const zxcvbn: React.RefObject<any> = useRef();

  const passwordStrength =
    value && value !== '' && zxcvbn.current
      ? zxcvbn.current.default(value).score
      : null;

  return (
    <>
      <Zxcvbn ref={zxcvbn} />
      <small className="form-text text-muted d-flex align-items-center">
        <span>
          {instructions}{' '}
          {!!passwordStrength ? (
            <b>{passwordStrengths[passwordStrength]}</b>
          ) : (
            <b>{passwordStrengths[0]}</b>
          )}
        </span>
        {!!passwordStrength && (
          <div className="progress rounded w-25 ml-2" style={{ height: '2px' }}>
            <div
              className={classNames('progress-bar', {
                'bg-warning': passwordStrength <= 2,
                'bg-success': passwordStrength > 2,
              })}
              role="progressbar"
              style={{
                width: `${(passwordStrength / 4) * 100}%`,
              }}
              aria-valuenow={(passwordStrength / 4) * 100}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        )}
      </small>
    </>
  );
}
