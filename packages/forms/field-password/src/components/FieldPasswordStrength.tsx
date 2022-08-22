import loadable from '@loadable/component';
import React, { useMemo, useRef } from 'react';
import tw from 'twin.macro';

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
  const zxcvbnRef: React.RefObject<any> = useRef(null);

  const passwordStrength = useMemo<number>(() => {
    if (value === '') {
      return 0;
    }
    if (zxcvbnRef.current) {
      try {
        return zxcvbnRef.current.default(value).score;
      } catch (e) {
        return 0;
      }
    }
    return 0;
  }, [value]);

  return (
    <>
      <Zxcvbn ref={zxcvbnRef} />
      <div tw="mt-2 text-sm flex items-center">
        <span>{instructions}</span>
        {Number(passwordStrength) >= 0 && (
          <div tw="mx-3 rounded w-40 h-2 bg-gray-100">
            <div
              css={[
                tw`h-full transition-all duration-500 ease-in-out rounded`,
                Number(passwordStrength) <= 2
                  ? tw`bg-red-500`
                  : tw`bg-green-500`,
              ]}
              role="progressbar"
              style={{
                width: `${(Number(passwordStrength) / 4) * 100}%`,
              }}
              aria-valuenow={(Number(passwordStrength) / 4) * 100}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        )}
        <span>
          <b>{passwordStrengths[passwordStrength]}</b>
        </span>
      </div>
    </>
  );
}
