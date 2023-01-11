import { Element } from '@craftjs/core';
import {
  ScrollableContainer,
  ShellBody,
  ShellMain,
  ShellSidebar,
} from '@uidu/shell';
import mjml2html from 'mjml-browser';
import React, { useRef } from 'react';
import { IntlProvider } from 'react-intl';
import styled from 'styled-components';
import tw from 'twin.macro';
import EmailBuilder, { Container, serializer, Text } from '../src';
import SettingsPanel from './components/SettinsPanel';
import Toolbox from './components/Toolbox';

const Wrapper = styled.div`
  ${tw`w-full`}

  .component-selected {
    ${tw`relative`}
  }
  .component-selected::after {
    content: ' ';
    ${tw`absolute top-0 left-0 block w-full h-full border border-dashed pointer-events-none border-primary`}
  }
`;

export default function Basic() {
  const emailRef = useRef(null);

  const setAndPrintJson = (json) => {
    if (!json) return null;

    const mjml = serializer(
      json,
      `<mj-head><mj-font name="Inter"
       href="https://fonts.googleapis.com/css?family=Inter" /><mj-attributes><mj-all font-size="16px" font-family="Inter"></mj-all><mj-text margin="8px"></mj-text></mj-attributes></mj-head>`,
    );
    console.log(mjml);
    const { html } = mjml2html(mjml, {
      validationLevel: 'skip',
    });
    console.log(html);
    if (emailRef && emailRef.current.contentDocument && html) {
      emailRef.current.contentDocument.body.innerHTML = html;
    }
    return serializer(json);
  };

  return (
    <IntlProvider locale="en">
      <Wrapper>
        <EmailBuilder
          onChange={(json) => setAndPrintJson(json)}
          value={
            <Element canvas is={Container}>
              <Text
                content={[
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'Another text',
                      },
                    ],
                  },
                ]}
              />
              <Text
                content={[
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: "I'm already rendered here",
                      },
                    ],
                  },
                ]}
              />
            </Element>
          }
        >
          {({ renderFrame, editor }) => (
            <ShellMain>
              <ShellBody>
                <ShellSidebar tw="border-r w-2/12">
                  <Toolbox />
                </ShellSidebar>
                <ShellMain className="craftjs-renderer" tw="p-8 bg-gray-50">
                  <ShellBody>
                    <ScrollableContainer>
                      <div tw="h-full bg-white border border-gray-200 rounded shadow-sm">
                        {renderFrame()}
                      </div>
                      <h1>E-mail HTML</h1>
                      <iframe
                        ref={emailRef}
                        frameBorder="0"
                        src="about:blank"
                        style={{ width: '100%', height: '800px' }}
                      />
                    </ScrollableContainer>
                  </ShellBody>
                </ShellMain>
                {/* {editor.query.getEvent('selected').size() > 0 && ( */}
                <ShellSidebar tw="border-l w-2/12">
                  <SettingsPanel />
                </ShellSidebar>
                {/* )} */}
              </ShellBody>
            </ShellMain>
          )}
        </EmailBuilder>
      </Wrapper>
    </IntlProvider>
  );
}
