import * as React from 'react';
import { shallow } from 'enzyme';
import { Ellipsify } from '@uidu/media-ui';
import { mountWithIntlContext } from '@uidu/media-test-helpers';
import { CardOverlay } from '../../cardImageView/cardOverlay';
import {
  TitleWrapper,
  Metadata,
  ErrorMessage,
  Retry,
} from '../../cardImageView/cardOverlay/styled';

import { CardActionsView } from '../../../utils/';

describe('CardOverlay', () => {
  const errorMessage = 'Loading failed';

  it('should not render the title or subtitle when the card has errored', () => {
    const title = 'card is lyfe';
    const subtitle = 'do you even card?';
    const card = shallow(
      <CardOverlay
        error={errorMessage}
        mediaName={title}
        subtitle={subtitle}
        persistent={true}
      />,
    );

    expect(
      card
        .find(ErrorMessage)
        .childAt(0)
        .text(),
    ).toEqual(errorMessage);
    expect(
      card
        .find(TitleWrapper)
        .find(Ellipsify)
        .props().text,
    ).toBe('');
    expect(card.find(Metadata)).toHaveLength(0);
  });

  it('should pass triggerColor "white" to Menu component when overlay is NOT persistent', () => {
    const card = shallow(<CardOverlay persistent={false} />);
    expect(card.find(CardActionsView).props().triggerColor).toEqual('white');
  });

  it('should pass triggerColor as "undefined" to Menu component when overlay is persistent', () => {
    const card = shallow(<CardOverlay persistent={true} />);
    expect(card.find(CardActionsView).props().triggerColor).toEqual(undefined);
  });

  it('should allow manual retry when "onRetry" is passed', () => {
    const onRetry = jest.fn();
    const card = mountWithIntlContext(
      <CardOverlay persistent={false} onRetry={onRetry} error={errorMessage} />,
    );
    const retryComponent = card.find(Retry);

    expect(retryComponent).toHaveLength(1);
    retryComponent.simulate('click');
    expect(onRetry).toHaveBeenCalled();
  });
});
