import * as React from 'react';
import { shallow } from 'enzyme';
import ImageLoader from 'react-render-image';
import { PreviewView, LoadingView, NoImageView, LoadedView } from '../..';

const exampleURL = 'https://placekitten.com/g/200/300';

describe('CardPreview', () => {
  it('should render the no-image view when url is undefined', () => {
    const element = shallow(<PreviewView />);
    expect(element.find(NoImageView)).toHaveLength(1);
    expect(element.find(LoadingView)).toHaveLength(0);
    expect(element.find(LoadedView)).toHaveLength(0);
  });

  it('should render the loading view when url is an empty string', () => {
    const element = shallow(<PreviewView url="" />);
    expect(element.find(NoImageView)).toHaveLength(1);
    expect(element.find(LoadingView)).toHaveLength(0);
    expect(element.find(LoadedView)).toHaveLength(0);
  });

  it('should render the ImageLoader with all the views', () => {
    const element = shallow(<PreviewView url={exampleURL} />);
    const loader = element.find(ImageLoader);
    expect(loader.prop('loading')).toEqual(<LoadingView />);
    expect(loader.prop('loaded')).toEqual(<LoadedView url={exampleURL} />);
    expect(loader.prop('errored')).toEqual(<NoImageView />);
  });
});
