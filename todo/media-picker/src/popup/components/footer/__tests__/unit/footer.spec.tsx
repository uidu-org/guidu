import { SelectedItem } from '../../../../domain';
import * as React from 'react';
import { shallow } from 'enzyme';
import {
  getComponentClassWithStore,
  mockStore,
  mockState,
} from '@uidu/media-test-helpers';
import { Footer, default as ConnectedFooter } from '../../footer';
import { Wrapper, CancelButton, InsertButton } from '../../styled';
import { startImport, hidePopup } from '../../../../actions';

const ConnectedFooterWithStore = getComponentClassWithStore(ConnectedFooter);

const createConnectedComponent = () => {
  const store = mockStore();
  const dispatch = store.dispatch;
  const component = shallow(<ConnectedFooterWithStore store={store} />).find(
    Footer,
  );
  return { component, dispatch };
};

describe('<Footer />', () => {
  const upfrontId = Promise.resolve('1');
  const SELECTED_ITEM: SelectedItem = {
    serviceName: 'google',
    mimeType: 'image/jpg',
    id: 'some-id',
    name: 'some-name',
    size: 123456,
    date: Date.now(),
    upfrontId,
  };

  describe('Connected Footer component', () => {
    test('should dispatch an action when onInsert is called', () => {
      const { component, dispatch } = createConnectedComponent();
      component.props().onInsert([SELECTED_ITEM]);
      expect(dispatch).toBeCalledWith(startImport());
    });

    test('should dispatch an action when onCancel is called', () => {
      const { component, dispatch } = createConnectedComponent();
      component.props().onCancel();
      expect(dispatch).toBeCalledWith(hidePopup());
    });

    test('should pass all required state through to component props', () => {
      const { component } = createConnectedComponent();
      const { selectedItems, canInsert, canCancel } = component.props();

      expect(selectedItems).toEqual(mockState.selectedItems);
      expect(canInsert).toEqual(
        !(mockState.view.isUploading || mockState.view.isCancelling),
      );
      expect(canCancel).toEqual(
        !(mockState.view.isUploading || mockState.view.isCancelling),
      );
    });
  });

  describe('#render()', () => {
    it('should render Wrapper, CancelButton, AttachButton', () => {
      const element = shallow(
        <Footer
          selectedItems={[SELECTED_ITEM]}
          canInsert={true}
          canCancel={false}
          onInsert={jest.fn()}
          onCancel={jest.fn()}
        />,
      );

      expect(element.find(Wrapper)).toHaveLength(1);
      expect(element.find(CancelButton)).toHaveLength(1);
      expect(element.find(InsertButton)).toHaveLength(1);
    });

    it('should disable the cancel button when canCancel=false', () => {
      const element = shallow(
        <Footer
          selectedItems={[]}
          canInsert={true}
          canCancel={false}
          onInsert={jest.fn()}
          onCancel={jest.fn()}
        />,
      );
      expect(
        element
          .find(CancelButton)
          .first()
          .prop('isDisabled'),
      ).toBeTruthy();
    });

    it('should enable the cancel button when canCancel=true', () => {
      const element = shallow(
        <Footer
          selectedItems={[]}
          canInsert={true}
          canCancel={true}
          onInsert={jest.fn()}
          onCancel={jest.fn()}
        />,
      );
      expect(
        element
          .find(CancelButton)
          .first()
          .prop('isDisabled'),
      ).toBeFalsy();
    });

    it('should hide the insert button when itemCount=0', () => {
      const element = shallow(
        <Footer
          selectedItems={[]}
          canInsert={true}
          canCancel={true}
          onInsert={jest.fn()}
          onCancel={jest.fn()}
        />,
      );
      expect(element.find(InsertButton)).toHaveLength(0);
    });

    it('should show the insert button when itemCount>0', () => {
      const element = shallow(
        <Footer
          selectedItems={[SELECTED_ITEM]}
          canInsert={true}
          canCancel={true}
          onInsert={jest.fn()}
          onCancel={jest.fn()}
        />,
      );
      expect(element.find(InsertButton).prop('isDisabled')).toBeFalsy();
    });

    it('should disable the insert button when canInsert=false', () => {
      const element = shallow(
        <Footer
          selectedItems={[SELECTED_ITEM]}
          canInsert={false}
          canCancel={true}
          onInsert={jest.fn()}
          onCancel={jest.fn()}
        />,
      );
      expect(element.find(InsertButton).prop('isDisabled')).toBeTruthy();
    });

    it('should enable the insert button when canInsert=true', () => {
      const element = shallow(
        <Footer
          selectedItems={[SELECTED_ITEM]}
          canInsert={true}
          canCancel={true}
          onInsert={jest.fn()}
          onCancel={jest.fn()}
        />,
      );
      expect(element.find(InsertButton).prop('isDisabled')).toBeFalsy();
    });

    it('should pass the number of selected items to the formatted message', () => {
      const element = shallow(
        <Footer
          selectedItems={[SELECTED_ITEM]}
          canInsert={true}
          canCancel={true}
          onInsert={jest.fn()}
          onCancel={jest.fn()}
        />,
      );
      expect(element.find(InsertButton).prop('children').props.values).toEqual({
        0: 1,
      });
    });
  });
});
