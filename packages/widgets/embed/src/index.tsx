/** @jsxRuntime classic */
/* @jsx node */

import { dom, node } from 'jsx-pragmatic';
import React from 'react';
import ReactDOM from 'react-dom';
import * as zoid from 'zoid/dist/zoid.frameworks';

console.log(zoid);

const CLASS = {
  VISIBLE: 'visible',
  INVISIBLE: 'invisible',
};

export const Button = zoid.create({
  tag: 'my-button',
  url: ({ props }) => {
    console.log(props);
    return `https://widgets.uidu.local:8443/button?code=${props.code}`;
    // local: 'https://widgets.uidu.local:8443/show',
    // dev: 'http://widgets.uidu.it.org/show',
    // live: 'https://widgets.uidu.org/show',
  },
  defaultEnv: 'local',
  dimensions: {
    width: '100%',
    height: '55px',
  },
  autoResize: true,
  props: {
    loginContainer: { type: 'string' },
    code: {
      type: 'string',
      queryParam: true,
    },
  },
});

export const Modal = zoid.create({
  tag: 'my-modal',
  url: ({ props }) => {
    console.log(props);
    return `https://widgets.uidu.local:8443/modal?code=${props.code}`;
    // local: 'https://widgets.uidu.local:8443/renderer',
    // dev: 'http://widgets.uidu.it.org/renderer',
    // live: 'https://widgets.uidu.org/renderer',
  },
  defaultEnv: 'local',
  props: {
    code: {
      type: 'string',
      queryParam: true,
    },
  },
  // prerenderTemplate: ({ doc }) => {
  //   console.log(doc);
  //   return (
  //     <p>Please wait while the component loaddnk osdkno ndsns s...</p>
  //   ).render(dom({ doc }));
  // },
  containerTemplate: (props) => {
    console.log(props);
    const {
      uid,
      doc,
      tag,
      context,
      close,
      focus,
      event,
      frame,
      prerenderFrame,
    } = props;

    event.on(zoid.EVENT.RENDERED, () => {
      prerenderFrame.classList.remove(CLASS.VISIBLE);
      prerenderFrame.classList.add(CLASS.INVISIBLE);

      frame.classList.remove(CLASS.INVISIBLE);
      frame.classList.add(CLASS.VISIBLE);

      setTimeout(() => {
        if (prerenderFrame && prerenderFrame.parentNode) {
          prerenderFrame.parentNode.removeChild(prerenderFrame);
        }
      }, 1);
    });

    prerenderFrame.classList.add(CLASS.VISIBLE);
    frame.classList.add(CLASS.INVISIBLE);

    return (
      <div id={uid} onClick={focus}>
        <style>
          {`
            #${uid} {
              z-index: 2147483647;
              display: block;
              background: rgba(0, 0, 0, 0.4);
              border: 0px none transparent;
              overflow: hidden auto;
              visibility: visible;
              margin: 0px;
              padding: 0px;
              -webkit-tap-highlight-color: transparent;
              position: fixed;
              left: 0px;
              top: 0px;
              width: 100%;
              height: 100%;
            }
            #${uid} iframe {
              position: absolute;
              width: 50%;
              left: 50%;
              top: 50%;
              transform: translateX(-50%) translateY(-50%);
              height: 80%;
              transition: opacity .2s ease-in-out;
            }
            #${uid} > iframe.${CLASS.INVISIBLE} {
              opacity: 0;
            }
            #${uid} > iframe.${CLASS.VISIBLE} {
              opacity: 1;
            }
          `}
        </style>
        <a href="#" onClick={close}>
          Close iframe
        </a>
        <frame el={frame} style={{ zIndex: 200 }} />
        <frame el={prerenderFrame} />
      </div>
    ).render(dom({ doc }));
  },
});

export const ReactButton = Button.driver('react', {
  React,
  ReactDOM,
});

export const ReactModal = Modal.driver('react', {
  React,
  ReactDOM,
});
