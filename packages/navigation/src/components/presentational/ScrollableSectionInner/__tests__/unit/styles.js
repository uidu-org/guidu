// @flow
import scrollableSectionInnerStyles from '../../styles';

const modeArgs = {
  product: {
    background: {
      default: '#0065FF',
      hint: '#0F63E0',
      static: '#0B4BAA',
      interact: '#104493',
    },
    text: { default: '#DEEBFF', subtle: '#5AAD91' },
  },
};

describe('Navigation Next: ScrollableSectionInner styles', () => {
  let styles;
  beforeEach(() => {
    styles = scrollableSectionInnerStyles(modeArgs)();
  });

  it('should add the static background color inside wrapper content for `&::before` pseudo-element', () => {
    expect(styles.product.wrapper['&::before'].backgroundColor).toEqual(
      '#0B4BAA',
    );
  });

  it('should add the default background color inside inner content for `&::before` pseudo-element', () => {
    expect(styles.product.inner['&::before'].backgroundColor).toEqual(
      '#0065FF',
    );
  });
});
