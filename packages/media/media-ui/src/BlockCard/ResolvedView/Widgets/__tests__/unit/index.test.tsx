import * as React from 'react';
import { shallow } from 'enzyme';
import Badge from '@atlaskit/badge';
import Lozenge from '@atlaskit/lozenge';
import { ImageIcon } from '../../../../../BlockCard/ImageIcon';
import Widgets from '../..';
import { WidgetDetails, Title, Text } from '../../styled';

describe('Widgets', () => {
  it('should render zero details as null', () => {
    const element = shallow(<Widgets details={[]} />);
    expect(element.getElement()).toBeNull();
  });

  it('should render a title and some text', () => {
    const element = shallow(
      <Widgets
        details={[
          {
            title: 'Modified',
            text: '03/10/1990',
          },
        ]}
      />,
    );
    expect(
      element
        .find(WidgetDetails)
        .render()
        .text(),
    ).toEqual('Modified:03/10/1990');
  });

  it('should render an icon', () => {
    const element = shallow(
      <Widgets
        details={[
          {
            icon: 'https://www.example.com/foobar.jpg',
          },
        ]}
      />,
    );
    const icon = element.find(ImageIcon);
    expect(icon).toHaveLength(1);
    expect(icon.props()).toEqual(
      expect.objectContaining({
        src: 'https://www.example.com/foobar.jpg',
      }),
    );
  });

  it('should render a badge', () => {
    const element = shallow(
      <Widgets
        details={[
          {
            badge: {
              value: 12,
            },
          },
        ]}
      />,
    );
    const badge = element.find(Badge);
    expect(badge).toHaveLength(1);
    expect(badge.props()).toEqual(
      expect.objectContaining({
        appearance: 'default',
        max: 99,
        value: 12,
      }),
    );
  });

  it('should render a lozenge', () => {
    const element = shallow(
      <Widgets
        details={[
          {
            lozenge: {
              appearance: 'success',
              text: 'Closed',
            },
          },
        ]}
      />,
    );
    const lozenge = element.find(Lozenge);
    expect(lozenge).toHaveLength(1);
    expect(lozenge.props()).toEqual(
      expect.objectContaining({
        appearance: 'success',
        children: 'Closed',
        isBold: false,
      }),
    );
  });

  it('should render widget details in order', () => {
    const element = shallow(
      <Widgets
        details={[
          {
            title: 'Modified',
            text: '03/10/1990',
            icon: 'https://www.example.com/foobar.jpg',
            lozenge: {
              appearance: 'success',
              text: 'Closed',
            },
            badge: {
              value: 12,
            },
          },
        ]}
      />,
    );

    const details = element.find(WidgetDetails).children();
    expect(details.at(0).type()).toEqual(Title);
    expect(details.at(1).type()).toEqual(ImageIcon);
    expect(details.at(2).type()).toEqual(Badge);
    expect(details.at(3).type()).toEqual(Lozenge);
    expect(details.at(4).type()).toEqual(Text);
  });

  it('should render a number of widgets', () => {
    const element = shallow(
      <Widgets
        details={[
          {
            title: 'Modified',
            text: '03/10/1990',
          },
          {
            icon: 'https://www.example.com/foobar.jpg',
          },
          {
            lozenge: {
              appearance: 'success',
              text: 'Closed',
            },
          },
          {
            badge: {
              value: 12,
            },
          },
        ]}
      />,
    );

    const widgets = element.find(WidgetDetails);

    expect(
      widgets.at(0).contains(<Title key="title">Modified:</Title>),
    ).toBeTruthy();
    expect(
      widgets.at(0).contains(<Text key="text">03/10/1990</Text>),
    ).toBeTruthy();

    expect(
      widgets
        .at(1)
        .contains(
          <ImageIcon src="https://www.example.com/foobar.jpg" size={16} />,
        ),
    ).toBeTruthy();

    expect(
      widgets.at(2).contains(<Lozenge appearance="success">Closed</Lozenge>),
    ).toBeTruthy();

    expect(
      widgets
        .at(3)
        .contains(<Badge appearance="default" max={99} value={12} />),
    ).toBeTruthy();
  });
});
