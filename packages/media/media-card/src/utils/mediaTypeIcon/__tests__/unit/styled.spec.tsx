import * as React from 'react';
import { shallow } from 'enzyme';
import { colors } from '@atlaskit/theme';
import { IconWrapper } from '../../styled';

describe('CardGenericViewSmall', () => {
  describe('MediaTypeIcon', () => {
    describe('IconWrapper', () => {
      it('should render the correct color when type="image"', () => {
        const element = shallow(<IconWrapper type="image" />);
        expect(element).toHaveStyleRule('color', colors.Y200);
      });

      it('should render the correct color when type="audio"', () => {
        const element = shallow(<IconWrapper type="audio" />);
        expect(element).toHaveStyleRule('color', colors.P200);
      });

      it('should render the correct color when type="video"', () => {
        const element = shallow(<IconWrapper type="video" />);
        expect(element).toHaveStyleRule('color', '#ff7143');
      });

      it('should render the correct color when type="doc"', () => {
        const element = shallow(<IconWrapper type="doc" />);
        expect(element).toHaveStyleRule('color', colors.B300);
      });

      it('should render the correct color when type="unknown"', () => {
        const element = shallow(<IconWrapper type="unknown" />);
        expect(element).toHaveStyleRule('color', '#3dc7dc');
      });

      it('should render the correct color when type is not valid', () => {
        const element = shallow(<IconWrapper type="foobar" />);
        expect(element).toHaveStyleRule('color', '#3dc7dc');
      });
    });
  });
});
