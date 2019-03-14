import * as React from 'react';
import { shallow } from 'enzyme';
import { Filmstrip, FilmstripView, FilmstripProps, FilmstripItem } from '../..';
import { fakeContext } from '@uidu/media-test-helpers';
import { Card } from '@atlaskit/media-card';
import { Identifier } from '@uidu/media-core';

describe('<Filmstrip />', () => {
  const firstIdenfier: Identifier = {
    id: 'id-1',
    mediaItemType: 'file',
  };
  const setup = (props?: Partial<FilmstripProps>) => {
    const context = fakeContext();
    const items: FilmstripItem[] = [
      {
        identifier: firstIdenfier,
      },
      {
        identifier: {
          id: 'id-2',
          mediaItemType: 'file',
        },
      },
    ];
    const component = shallow(
      <Filmstrip context={context} items={items} {...props} />,
    );

    return {
      component,
      context,
    };
  };

  it('should render a FilmstripView with the right amount of Cards', () => {
    const { component } = setup();

    expect(component.find(FilmstripView)).toHaveLength(1);
    expect(component.find(FilmstripView).find(Card)).toHaveLength(2);
  });

  it('should use right React key for Cards', () => {
    const { component } = setup();

    expect(
      component
        .find(FilmstripView)
        .find(Card)
        .at(0)
        .key(),
    ).toEqual('id-1');
    expect(
      component
        .find(FilmstripView)
        .find(Card)
        .at(1)
        .key(),
    ).toEqual('id-2');
  });

  it('should pass properties down to Cards', () => {
    const { component, context } = setup({
      items: [
        {
          identifier: firstIdenfier,
          selectable: true,
          selected: true,
        },
      ],
    });

    expect(
      component
        .find(FilmstripView)
        .find(Card)
        .first()
        .props(),
    ).toEqual(
      expect.objectContaining({
        context,
        selectable: true,
        selected: true,
        identifier: {
          id: 'id-1',
          mediaItemType: 'file',
        },
      }),
    );
  });

  it('should render loading cards if context is missing', () => {
    const { component } = setup({
      context: undefined,
    });
    expect(component.find('CardView[status="loading"]')).toHaveLength(2);
  });
});
