import React from 'react';
import 'twin.macro';
import { DashletHeaderProps } from './types';

export default function DashletHeader(props: DashletHeaderProps) {
  const { name, description, isCard, children } = props;

  const className = isCard ? 'card-header py-4 ' : 'py-3 ';

  return (
    <div tw="bg-white px-4 py-5 border-b border-gray-200 border-opacity-50 sm:px-6">
      <div tw="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
        <div tw="ml-4 mt-4">
          <h3 tw="text-lg leading-6 font-medium text-gray-900">{name}</h3>
          {description ? (
            <p tw="mt-1 text-sm text-gray-500">{description}</p>
          ) : null}
        </div>
        <div tw="ml-4 mt-4 flex-shrink-0">
          {children}
          {/* <button
            type="button"
            tw="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create new job
          </button> */}
        </div>
      </div>
    </div>
  );
  return (
    <div
      className={`${className}d-flex align-items-center justify-content-between`}
    >
      <div>
        <h5 className="card-title h6 m-0">{name}</h5>
        {description && <p className="text-muted mb-0">{description}</p>}
      </div>
      {children}
    </div>
  );
}
