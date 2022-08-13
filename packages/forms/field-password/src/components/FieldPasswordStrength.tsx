import loadable from '@loadable/component';
import classNames from 'classnames';
import React, { useRef } from 'react';

const Zxcvbn = loadable.lib(() => import('zxcvbn'));

export default function FieldPasswordStrength({
  passwordStrengths,
  instructions,
  value,
}: {
  passwordStrengths: Record<string, number>;
  instructions: string;
  value: string;
}) {
  const zxcvbnRef: React.RefObject = useRef();

  const passwordStrength =
    value && value !== '' && zxcvbnRef.current
      ? zxcvbnRef.current.default(value).score
      : null;

  return (
    <>
      <Zxcvbn ref={zxcvbnRef} />
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
          <div className="ml-2 rounded progress w-25" style={{ height: '2px' }}>
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
