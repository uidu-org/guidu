import { ScrollableContainer, ShellBody, ShellMain } from '@uidu/shell';
import React from 'react';
import { DeviseWrapperProps } from '../types';

export default function DeviseWrapper({
  children,
  header,
  footer,
  className = 'col-sm-8 col-md-6 col-xl-4',
}: DeviseWrapperProps) {
  return (
    <>
      <ShellBody>
        <ShellMain>
          <ScrollableContainer>
            <div
              className="container-fluid d-flex flex-column justify-content-center"
              style={{ flex: '1 1 auto', minHeight: '100vh' }}
            >
              <div className="row align-items-center justify-content-center my-4 my-sm-5">
                <div className={className}>
                  {header}
                  <div className="card px-3 py-5">{children}</div>
                  {footer}
                </div>
              </div>
            </div>
          </ScrollableContainer>
        </ShellMain>
      </ShellBody>
    </>
  );
}
