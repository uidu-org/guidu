import * as React from 'react';
import { shallow } from 'enzyme';
import FileIcon from '@atlaskit/icon/glyph/file';

import { CardLoading } from '../..';
import { getDimensionsWithDefault } from '../../cardLoading';

describe('CardLoading', () => {
  it('should render the right icon based on the itemType', () => {
    const fileLoading = shallow(<CardLoading />);

    expect(fileLoading.find(FileIcon)).toHaveLength(1);
  });

  it('should render icon with the right size', () => {
    const smallLoadingCard = shallow(<CardLoading iconSize="small" />);
    const largeLoadingCard = shallow(<CardLoading iconSize="large" />);
    const defaultLoadingSize = shallow(<CardLoading />);

    expect(smallLoadingCard.find(FileIcon).props().size).toBe('small');
    expect(largeLoadingCard.find(FileIcon).props().size).toBe('large');
    expect(defaultLoadingSize.find(FileIcon).props().size).toBe('medium');
  });

  describe('getDimensionsWithDefault()', () => {
    it('should use default ones when no dimensions provided', () => {
      expect(getDimensionsWithDefault()).toEqual({
        width: '100%',
        height: '100%',
      });
    });
    it('should use pixel units for provided dimensions', () => {
      expect(getDimensionsWithDefault({ width: 50, height: 50 })).toEqual({
        width: '50px',
        height: '50px',
      });
    });
  });
});
