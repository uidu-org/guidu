jest.mock('../../../service/newUploadServiceImpl');

import { Context, ContextFactory } from '@uidu/media-core';
import { Browser, BrowserConfig } from '../../types';
import { BrowserImpl } from '../../browser';

describe('Browser', () => {
  let browser: Browser | undefined;
  let context: Context;
  let browseConfig: BrowserConfig;
  const createElement = document.createElement;

  beforeEach(() => {
    document.createElement = createElement;

    context = ContextFactory.create({
      authProvider: {} as any,
    });
    browseConfig = {
      uploadParams: {},
    };

    if (browser) {
      browser.teardown();
      browser = undefined;
    }
  });

  it('should append the input to the body', () => {
    const inputsBefore = document.querySelectorAll('input[type=file]');
    browser = new BrowserImpl(context, browseConfig);
    const inputsAfter = document.querySelectorAll('input[type=file]');
    expect(inputsAfter.length).toBeGreaterThan(inputsBefore.length);
  });

  it('should remove the input from the body', () => {
    browser = new BrowserImpl(context, browseConfig);
    const inputsBefore = document.querySelectorAll('input[type=file]');
    browser.teardown();
    const inputsAfter = document.querySelectorAll('input[type=file]');
    expect(inputsAfter.length).toBeLessThan(inputsBefore.length);
  });

  it('should add and remove event listeners from the input element', () => {
    const addEventListener = jest.fn();
    const removeEventListener = jest.fn();
    const input = document.createElement('input');

    input.addEventListener = addEventListener;
    input.removeEventListener = removeEventListener;
    document.createElement = jest.fn().mockReturnValue(input);
    browser = new BrowserImpl(context, browseConfig);
    expect(addEventListener).toHaveBeenCalledTimes(1);
    expect(addEventListener.mock.calls[0][0]).toEqual('change');

    browser.teardown();
    expect(removeEventListener).toHaveBeenCalledTimes(1);
    expect(removeEventListener.mock.calls[0][0]).toEqual('change');
  });

  it('should add upload files when user picks some', () => {
    const input = document.createElement('input');
    document.createElement = jest.fn().mockReturnValue(input);
    browser = new BrowserImpl(context, browseConfig);

    const spy = jest.spyOn(browser['uploadService'], 'addFiles');
    input.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toBeCalledWith([]);
  });
});
