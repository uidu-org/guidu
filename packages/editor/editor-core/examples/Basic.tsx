import { ShellHeader, ShellMain } from '@uidu/shell';
import React, { useRef } from 'react';
import { IntlProvider } from 'react-intl';
import { Editor } from '../src';

export default function Basic({}) {
  const element = useRef(null);

  return (
    <IntlProvider locale="en">
      <ShellMain>
        <Editor>
          {({ renderToolbar, renderEditor, view }) => (
            <>
              <ShellHeader tw="border-b">{renderToolbar({})}</ShellHeader>
              <div tw="h-full flex flex-col min-w-0 min-h-0 bg-gray-50">
                <div tw="flex flex-row h-full min-w-0 min-h-0 my-5">
                  <div tw="rounded overflow-scroll [scroll-behavior:smooth] flex-col flex-grow relative h-full max-w-5xl border border-dashed mx-auto bg-white">
                    <div
                      tw="flex-grow h-full"
                      onClick={() => {
                        console.log(view);
                        view.focus();
                      }}
                    >
                      {renderEditor({})}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Editor>
      </ShellMain>
    </IntlProvider>
  );
}
