import AkButton from '@atlaskit/button';
import { ShallowWrapper, shallow } from 'enzyme';
import * as React from 'react';

import { FolderViewer, FolderViewerProps } from '../../folderView';

describe('<FolderViewr />', () => {
  const setup = () => {
    const props: FolderViewerProps = {
      path: [],
      service: {
        accountId: 'some-service-account-id',
        name: 'google',
      },
      items: [],
      selectedItems: [],
      isLoading: false,
      onFileClick: jest.fn(),
      onFolderClick: jest.fn(),
      onLoadMoreClick: jest.fn(),
      setUpfrontIdDeferred: jest.fn(),
    };

    return { props };
  };

  it('should render loading button given folder is loading', () => {
    const { props } = setup();
    const wrapper = shallow(
      <FolderViewer
        {...props}
        isLoading={true}
        currentCursor="some-current-cursor"
      />,
    );

    const buttons = wrapper.find(AkButton);
    expect(buttons).toHaveLength(1);

    const button = buttons.first();
    expect((button.props() as any).children).toEqual('Loading...');
  });

  it('should not call onLoadMoreClick handler given folder is loading', () => {
    const { props } = setup();
    const wrapper: ShallowWrapper<
      FolderViewerProps,
      {},
      FolderViewer
    > = shallow(
      <FolderViewer
        {...props}
        isLoading={true}
        currentCursor="some-current-cursor"
      />,
    );

    const buttons = wrapper.find(AkButton);
    const button = buttons.first();

    button.simulate('click');
    expect(wrapper.instance().props.onLoadMoreClick).not.toBeCalled();
  });

  it('should render load more button given next page cursor', () => {
    const { props } = setup();
    const wrapper = shallow(
      <FolderViewer {...props} nextCursor="some-next-cursor" />,
    );

    const buttons = wrapper.find(AkButton);
    expect(buttons).toHaveLength(1);

    const button = buttons.first();
    expect((button.props() as any).children).toEqual('Load more');
  });

  it('should call onLoadMoreClick handler given next page cursor', () => {
    const { props } = setup();
    const wrapper: ShallowWrapper<
      FolderViewerProps,
      {},
      FolderViewer
    > = shallow(<FolderViewer {...props} nextCursor="some-next-cursor" />);

    const buttons = wrapper.find(AkButton);
    const button = buttons.first();

    button.simulate('click');
    expect(wrapper.instance().props.onLoadMoreClick).toBeCalled();
  });
});
