import * as React from 'react';
import { mount } from 'enzyme';
import { default as MediaImage } from '../../mediaImage';

const commonProps = {
  id: 'dummy-id',
  className: 'media-image',
  mediaApiConfig: {
    clientId: 'clientId',
    token: 'token',
    baseUrl: 'https://atlassian.com',
  },
};

describe('<MediaImage />', () => {
  it('should not add <img /> if it receives an empty clientId', () => {
    const props = {
      ...commonProps,
      mediaApiConfig: {
        ...commonProps.mediaApiConfig,
        clientId: '',
      },
    };

    const wrapper = mount(<MediaImage {...props} />);
    expect(wrapper.find('img')).toHaveLength(0);
  });

  it('should not add <img /> if it receives an empty token', () => {
    const props = {
      ...commonProps,
      mediaApiConfig: {
        ...commonProps.mediaApiConfig,
        token: '',
      },
    };

    const wrapper = mount(<MediaImage {...props} />);
    expect(wrapper.find('img')).toHaveLength(0);
  });

  it('should not add <img /> if it receives an empty baseUrl', () => {
    const props = {
      ...commonProps,
      mediaApiConfig: {
        ...commonProps.mediaApiConfig,
        baseUrl: '',
      },
    };

    const wrapper = mount(<MediaImage {...props} />);
    expect(wrapper.find('img')).toHaveLength(0);
  });

  it('should add width and height styles if props exist', () => {
    const wrapper = mount(
      <MediaImage {...commonProps} width={10} height={20} />,
    );
    expect(wrapper.find('img').props().style).toMatchObject({
      width: '10px',
      height: '20px',
    });
  });

  describe('When it builds src endpoint', () => {
    it('should add clientId and token as query parameters', () => {
      const wrapper = mount(<MediaImage {...commonProps} />);
      expect(wrapper.find('img').props().src).toEqual(
        'https://atlassian.com/file/dummy-id/image?client=clientId&token=token',
      );
    });

    it('should add clientId and token as query parameters', () => {
      const collectionName = 'my-collection-name';
      const wrapper = mount(
        <MediaImage {...commonProps} collectionName={collectionName} />,
      );
      expect(wrapper.find('img').props().src).toEqual(
        `https://atlassian.com/file/dummy-id/image?client=clientId&token=token&collection=${collectionName}`,
      );
    });
  });
});
