jest.mock('../../../../../tools/gridCellScaler');

import * as React from 'react';
import { shallow } from 'enzyme';

import Button from '@uidu/button';
import Spinner  from '@uidu/spinner';
import FieldText from '@atlaskit/field-text';
import { CardView } from '@atlaskit/media-card';
import { fakeIntl, mountWithIntlContext } from '@uidu/media-test-helpers';

import {
  mockStore,
  mockState,
  getComponentClassWithStore,
} from '@uidu/media-test-helpers';
import ConnectedGiphyView, { GiphyView } from '../../giphyView';
import { BricksLayout } from '../../bricksGrid';
import {
  Title,
  ButtonContainer,
  WarningContainer,
  WarningIconWrapper,
  WarningImage,
  WarningHeading,
  WarningSuggestion,
} from '../../styles';
import { searchGiphy, fileClick } from '../../../../../actions';
import gridCellScaler from '../../../../../tools/gridCellScaler';

const ConnectedGiphyViewWithStore = getComponentClassWithStore(
  ConnectedGiphyView,
);

const createConnectedComponent = () => {
  const store = mockStore();
  const dispatch = store.dispatch;
  const component = mountWithIntlContext(
    <ConnectedGiphyViewWithStore store={store} />,
  ).find(GiphyView);

  return { component, dispatch };
};

describe('<ConnectedGiphyView />', () => {
  const setUpfrontIdDeferred = jest.fn();
  const upfrontId = Promise.resolve('1');

  it('should deliver all required props to stateless component', () => {
    const { component } = createConnectedComponent();
    const props = component.props();

    expect(props.hasError).toEqual(mockState.view.hasError);
    expect(props.isLoading).toEqual(mockState.view.isLoading);
    expect(props.cardModels).toEqual(mockState.giphy.imageCardModels);
    expect(props.selectedItems).toEqual(mockState.selectedItems);
  });

  it('should dispatch an action when onSearchQueryChange is called', () => {
    const { component, dispatch } = createConnectedComponent();
    component.props().onSearchQueryChange('some random query');
    expect(dispatch).toBeCalledWith(searchGiphy('some random query', false));
  });

  it('should dispatch an action when onLoadMoreButtonClick is called', () => {
    const { component, dispatch } = createConnectedComponent();
    component.props().onLoadMoreButtonClick('some random query', true);
    expect(dispatch).toBeCalledWith(searchGiphy('some random query', true));
  });

  it('should dispatch an action when onCardClick is called', () => {
    Date.now = jest.fn().mockReturnValue(10);
    const { component, dispatch } = createConnectedComponent();

    const id = 'id';
    const name = 'name';
    const size = 12345;
    const mimeType = 'image/gif';

    const cardModel = { metadata: { id, name, size } };

    component.props().onCardClick(cardModel as any, upfrontId);
    expect(dispatch).toBeCalledWith(
      fileClick({ id, name, size, mimeType, upfrontId, date: 10 }, 'giphy'),
    );
    (Date.now as any).mockClear();
  });

  describe('<GiphyView />', () => {
    const cardModels: Array<any> = [
      { metadata: { id: 'id-1' }, dimensions: {} },
      { metadata: { id: 'id-2' }, dimensions: {} },
      { metadata: { id: 'id-3' }, dimensions: {} },
      { metadata: { id: 'id-4' }, dimensions: {} },
      { metadata: { id: 'id-5' }, dimensions: {} },
    ];
    const totalResultCount = 100;
    const selectedItems: Array<any> = [
      { id: 'id-1', serviceName: 'giphy' },
      { id: 'id-2', serviceName: 'google' },
      { id: 'id-4', serviceName: 'giphy' },
      { id: 'id-7', serviceName: 'dropbox' },
    ];

    const onSearchQueryChange = jest.fn();
    const onLoadMoreButtonClick = jest.fn();
    const onCardClick = jest.fn();

    beforeEach(() => {
      (gridCellScaler as jest.Mock<typeof gridCellScaler>).mockReturnValue({
        width: 10,
        height: 10,
      });
    });

    afterEach(() => {
      onSearchQueryChange.mockClear();
      onLoadMoreButtonClick.mockClear();
      onCardClick.mockClear();
    });

    it('should render title, search bar and load more button', () => {
      const giphyView = shallow(
        <GiphyView
          hasError={false}
          isLoading={false}
          cardModels={cardModels}
          totalResultCount={totalResultCount}
          selectedItems={[]}
          onSearchQueryChange={onSearchQueryChange}
          onLoadMoreButtonClick={onLoadMoreButtonClick}
          onCardClick={onCardClick}
          setUpfrontIdDeferred={setUpfrontIdDeferred}
          intl={fakeIntl}
        />,
      );

      expect(giphyView.find(Title)).toHaveLength(1);
      expect(giphyView.find(FieldText)).toHaveLength(1);
      expect(giphyView.find(ButtonContainer)).toHaveLength(1);
      expect(giphyView.find(Button)).toHaveLength(1);
    });

    it('should render a CardView for each item passed in', () => {
      const giphyView = shallow(
        <GiphyView
          intl={fakeIntl}
          hasError={false}
          isLoading={true}
          cardModels={cardModels}
          totalResultCount={totalResultCount}
          selectedItems={[]}
          onSearchQueryChange={onSearchQueryChange}
          onLoadMoreButtonClick={onLoadMoreButtonClick}
          onCardClick={onCardClick}
          setUpfrontIdDeferred={setUpfrontIdDeferred}
        />,
      );

      expect(giphyView.find(CardView)).toHaveLength(5);
      expect(
        giphyView
          .find(CardView)
          .first()
          .props(),
      ).toEqual(
        expect.objectContaining({
          status: 'complete',
          dimensions: { width: 10, height: 10 },
          dataURI: cardModels[0].dataURI,
          metadata: cardModels[0].metadata,
          selectable: true,
        }),
      );
    });

    it('should render CardView with selected=true for selectedItems which are in items', () => {
      const giphyView = shallow(
        <GiphyView
          intl={fakeIntl}
          hasError={false}
          isLoading={true}
          cardModels={cardModels}
          totalResultCount={totalResultCount}
          selectedItems={selectedItems}
          onSearchQueryChange={onSearchQueryChange}
          onLoadMoreButtonClick={onLoadMoreButtonClick}
          onCardClick={onCardClick}
          setUpfrontIdDeferred={setUpfrontIdDeferred}
        />,
      );

      expect(giphyView.find(CardView)).toHaveLength(5);
      expect(
        giphyView.find(CardView).filterWhere(card => !!card.props().selected),
      ).toHaveLength(2);
    });

    it('should NOT render bricks layout when cardModels is an empty array', () => {
      const giphyView = shallow(
        <GiphyView
          intl={fakeIntl}
          hasError={false}
          isLoading={false}
          cardModels={[]}
          totalResultCount={totalResultCount}
          selectedItems={[]}
          onSearchQueryChange={onSearchQueryChange}
          onLoadMoreButtonClick={onLoadMoreButtonClick}
          onCardClick={onCardClick}
          setUpfrontIdDeferred={setUpfrontIdDeferred}
        />,
      );

      expect(giphyView.find(BricksLayout)).toHaveLength(0);
    });

    it('should render error components when hasError is true', () => {
      const giphyView = shallow(
        <GiphyView
          intl={fakeIntl}
          hasError={true}
          isLoading={false}
          cardModels={[]}
          totalResultCount={totalResultCount}
          selectedItems={[]}
          onSearchQueryChange={onSearchQueryChange}
          onLoadMoreButtonClick={onLoadMoreButtonClick}
          onCardClick={onCardClick}
          setUpfrontIdDeferred={setUpfrontIdDeferred}
        />,
      );

      expect(giphyView.find(WarningContainer)).toHaveLength(1);
      expect(giphyView.find(WarningIconWrapper)).toHaveLength(1);
      expect(giphyView.find(WarningHeading)).toHaveLength(1);
      expect(giphyView.find(WarningSuggestion)).toHaveLength(1);
      expect(giphyView.find(Button)).toHaveLength(1);

      expect(giphyView.find(BricksLayout)).toHaveLength(0);
    });

    it('should call onSearchQueryChange() when the "Try again" button is clicked', () => {
      const giphyView = shallow(
        <GiphyView
          intl={fakeIntl}
          hasError={true}
          isLoading={false}
          cardModels={cardModels}
          selectedItems={[]}
          totalResultCount={totalResultCount}
          onSearchQueryChange={onSearchQueryChange}
          onLoadMoreButtonClick={onLoadMoreButtonClick}
          onCardClick={onCardClick}
          setUpfrontIdDeferred={setUpfrontIdDeferred}
        />,
      );

      giphyView.setState({ query: 'some-search-query' });
      giphyView.find(Button).simulate('click');

      expect(onSearchQueryChange).toHaveBeenCalledTimes(1);
      expect(onSearchQueryChange).toHaveBeenCalledWith('some-search-query');
    });

    it('should render empty state when isLoading is false and items is an empty array', () => {
      const giphyView = shallow(
        <GiphyView
          intl={fakeIntl}
          hasError={false}
          isLoading={false}
          cardModels={[]}
          totalResultCount={totalResultCount}
          selectedItems={[]}
          onSearchQueryChange={onSearchQueryChange}
          onLoadMoreButtonClick={onLoadMoreButtonClick}
          onCardClick={onCardClick}
          setUpfrontIdDeferred={setUpfrontIdDeferred}
        />,
      );

      expect(giphyView.find(Title)).toHaveLength(1);
      expect(giphyView.find(FieldText)).toHaveLength(1);
      expect(giphyView.find(WarningImage)).toHaveLength(1);
      expect(giphyView.find(WarningContainer)).toHaveLength(1);
      expect(giphyView.find(WarningHeading)).toHaveLength(1);
    });

    it('should show the load more button when totalResultCount is undefined', () => {
      const giphyView = shallow(
        <GiphyView
          intl={fakeIntl}
          hasError={false}
          isLoading={true}
          cardModels={[]}
          totalResultCount={undefined}
          selectedItems={[]}
          onSearchQueryChange={onSearchQueryChange}
          onLoadMoreButtonClick={onLoadMoreButtonClick}
          onCardClick={onCardClick}
          setUpfrontIdDeferred={setUpfrontIdDeferred}
        />,
      );

      expect(giphyView.find(Button)).toHaveLength(1);
    });

    it('should disable the load more button and show a spinner when isLoading is true', () => {
      const giphyView = shallow(
        <GiphyView
          intl={fakeIntl}
          hasError={false}
          isLoading={true}
          cardModels={cardModels}
          totalResultCount={cardModels.length}
          selectedItems={[]}
          onSearchQueryChange={onSearchQueryChange}
          onLoadMoreButtonClick={onLoadMoreButtonClick}
          onCardClick={onCardClick}
          setUpfrontIdDeferred={setUpfrontIdDeferred}
        />,
      );

      expect(giphyView.find(Button)).toHaveLength(1);
      expect(giphyView.find(Button).prop('isDisabled')).toBe(true);
      expect(giphyView.find(Button).prop('iconAfter')).toEqual(<Spinner />);
    });

    it('should NOT show the load more button when the totalResultCount equals the number of cardModels and the card is NOT loading', () => {
      const giphyView = shallow(
        <GiphyView
          intl={fakeIntl}
          hasError={false}
          isLoading={false}
          cardModels={cardModels}
          totalResultCount={cardModels.length}
          selectedItems={[]}
          onSearchQueryChange={onSearchQueryChange}
          onLoadMoreButtonClick={onLoadMoreButtonClick}
          onCardClick={onCardClick}
          setUpfrontIdDeferred={setUpfrontIdDeferred}
        />,
      );

      expect(giphyView.find(Button)).toHaveLength(0);
    });

    it('should call onSearchQueryChange() when FieldText fires onChange after one second', () => {
      const giphyView = shallow(
        <GiphyView
          intl={fakeIntl}
          hasError={false}
          isLoading={true}
          cardModels={[]}
          totalResultCount={totalResultCount}
          selectedItems={[]}
          onSearchQueryChange={onSearchQueryChange}
          onLoadMoreButtonClick={onLoadMoreButtonClick}
          onCardClick={onCardClick}
          setUpfrontIdDeferred={setUpfrontIdDeferred}
        />,
      );

      giphyView
        .find(FieldText)
        .simulate('change', { currentTarget: { value: 'some-search-query' } });
      expect(onSearchQueryChange).toHaveBeenCalledTimes(1);
    });

    it('should call onLoadMoreButtonClick() when the load more button is clicked', () => {
      const giphyView = shallow(
        <GiphyView
          intl={fakeIntl}
          hasError={false}
          isLoading={false}
          cardModels={cardModels}
          selectedItems={[]}
          totalResultCount={totalResultCount}
          onSearchQueryChange={onSearchQueryChange}
          onLoadMoreButtonClick={onLoadMoreButtonClick}
          onCardClick={onCardClick}
          setUpfrontIdDeferred={setUpfrontIdDeferred}
        />,
      );

      giphyView.setState({ query: 'some-search-query' });
      giphyView.find(Button).simulate('click');

      expect(onLoadMoreButtonClick).toHaveBeenCalledTimes(1);
      expect(onLoadMoreButtonClick).toHaveBeenCalledWith(
        'some-search-query',
        true,
      );
    });

    it('should call onCardClick() when a CardView is clicked', () => {
      const giphyView = shallow(
        <GiphyView
          intl={fakeIntl}
          hasError={false}
          isLoading={true}
          cardModels={cardModels}
          selectedItems={[]}
          totalResultCount={totalResultCount}
          onSearchQueryChange={onSearchQueryChange}
          onLoadMoreButtonClick={onLoadMoreButtonClick}
          onCardClick={onCardClick}
          setUpfrontIdDeferred={setUpfrontIdDeferred}
        />,
      );

      giphyView
        .find(CardView)
        .first()
        .simulate('click');

      expect(onCardClick).toHaveBeenCalledTimes(1);
      expect(onCardClick).toHaveBeenCalledWith(
        { dimensions: {}, metadata: { id: 'id-1' } },
        expect.anything(),
      );
    });
  });
});
