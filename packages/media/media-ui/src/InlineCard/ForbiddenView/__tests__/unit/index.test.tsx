import * as React from 'react';
import { mount } from 'enzyme';
import { truncateUrlForErrorView } from '../../../utils';
import { InlineCardForbiddenView } from '../..';

const URL =
  'http://product.example.com/lorem/ipsum/dolor/sit/amet/consectetur/adipiscing/volutpat/';
const trunkatedURL = truncateUrlForErrorView(URL);

describe('Unauth view', () => {
  it('should render the trancated url', () => {
    const element = mount(
      <InlineCardForbiddenView url={URL} onAuthorise={() => {}} />,
    );
    expect(element.text()).toContain(trunkatedURL);
  });

  it('should do click if try again clicked', () => {
    const onRetrySpy = jest.fn();
    const element = mount(
      <InlineCardForbiddenView url={URL} onAuthorise={onRetrySpy} />,
    );
    element.find('button').simulate('click');
    expect(onRetrySpy).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick if onRetry was triggered', () => {
    const onClickSpy = jest.fn();
    const onRetrySpy = jest.fn();
    const element = mount(
      <InlineCardForbiddenView
        url={URL}
        onAuthorise={onRetrySpy}
        onClick={onClickSpy}
      />,
    );
    element.find('button').simulate('click');
    expect(onRetrySpy).toHaveBeenCalledTimes(1);
    expect(onClickSpy).not.toHaveBeenCalled();
  });
});
