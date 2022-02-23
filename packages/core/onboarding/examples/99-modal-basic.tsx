import Button from '@uidu/button';
import React, { Component } from 'react';
import { Modal } from '../src';
import welcomeImage from './assets/this-is-new-jira.png';

interface State {
  active: boolean;
}

export default class Example extends Component<{}, State> {
  state: State = { active: false };

  start = () => this.setState({ active: true });

  finish = () => this.setState({ active: false });

  render() {
    const { active } = this.state;

    return (
      <div>
        <Button onClick={this.start}>Launch benefits modal</Button>
        {active && (
          <Modal
            actions={[
              { onClick: this.finish, text: 'Switch to the new JIRA' },
              { onClick: this.finish, text: 'Remind me later' },
            ]}
            header={(props) => (
              <div tw="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <svg
                  tw="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden"
                  width={640}
                  height={784}
                  fill="none"
                  viewBox="0 0 640 784"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
                      x={118}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        tw="text-gray-200"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    y={72}
                    width={640}
                    height={640}
                    tw="text-gray-50"
                    fill="currentColor"
                  />
                  <rect
                    x={118}
                    width={404}
                    height={784}
                    fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
                  />
                </svg>
                <div tw="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <button
                    type="button"
                    tw="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span tw="sr-only">Watch our video to learn more</span>
                    <img
                      tw="w-full"
                      src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                      alt=""
                    />
                    <div
                      tw="absolute inset-0 w-full h-full flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <svg
                        tw="h-20 w-20 text-indigo-500"
                        fill="currentColor"
                        viewBox="0 0 84 84"
                      >
                        <circle
                          opacity="0.9"
                          cx={42}
                          cy={42}
                          r={42}
                          fill="white"
                        />
                        <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            )}
            heading="Experience your new JIRA"
            image={welcomeImage}
            key="welcome"
          >
            <p>
              Switch context, jump between project, and get back to work quickly
              with our new look and feel.
            </p>
            <p>Take it for a spin and let us know what you think.</p>
          </Modal>
        )}
      </div>
    );
  }
}
