// @flow

import React, { PureComponent, type ElementType, type Ref } from 'react';
import { css } from 'emotion';

import { styleReducerNoOp, withContentTheme } from '../../../theme';
import type { ItemPrimitiveProps } from './types';

const isString = x => typeof x === 'string';

type SwitchProps = {
  as: ElementType,
  draggableProps: {},
  innerRef: Ref<*>,
};
const ComponentSwitch = ({
  as,
  draggableProps,
  innerRef,
  ...rest
}: SwitchProps) => {
  const isElement = isString(as);
  const props = isElement ? rest : { innerRef, draggableProps, ...rest };
  // only pass the actual `ref` to an element, it's the responsibility of the
  // component author to use `innerRef` where applicable
  const ref = isElement ? innerRef : null;
  const ElementOrComponent = as;

  return <ElementOrComponent ref={ref} {...draggableProps} {...props} />;
};

const getItemComponentProps = (props: ItemPrimitiveProps) => {
  const {
    createAnalyticsEvent,
    isActive,
    isHover,
    isSelected,
    isFocused,
    isDragging,
    theme,
    ...componentProps
  } = props;

  return componentProps;
};

class ItemPrimitive extends PureComponent<ItemPrimitiveProps> {
  static defaultProps = {
    isActive: false,
    isDragging: false,
    isHover: false,
    isSelected: false,
    isFocused: false,
    spacing: 'default',
    styles: styleReducerNoOp,
    text: '',
  };

  render() {
    const {
      after: After,
      before: Before,
      component: CustomComponent,
      draggableProps,
      href,
      innerRef,
      isActive,
      isDragging,
      isHover,
      isSelected,
      onClick,
      isFocused,
      spacing,
      styles: styleReducer,
      subText,
      target,
      text,
      theme,
    } = this.props;
    const { mode, context } = theme;
    const presentationProps = {
      isActive,
      isDragging,
      isHover,
      isSelected,
      isFocused,
      spacing,
    };
    const defaultStyles = mode.item(presentationProps)[context];
    const styles = styleReducer(defaultStyles, presentationProps, theme);
    // base element switch

    let itemComponent = 'div';
    let itemProps = { draggableProps, innerRef };

    if (CustomComponent) {
      itemComponent = CustomComponent;
      itemProps = getItemComponentProps(this.props);
    } else if (href) {
      itemComponent = 'a';
      itemProps = { href, onClick, target, draggableProps, innerRef };
    } else if (onClick) {
      itemComponent = 'button';
      itemProps = { onClick, draggableProps, innerRef };
    }

    return (
      <ComponentSwitch
        as={itemComponent}
        className={css({ '&&': styles.itemBase })}
        {...itemProps}
      >
        {!!Before && (
          <div css={styles.beforeWrapper}>
            <Before {...presentationProps} />
          </div>
        )}
        <div css={styles.contentWrapper}>
          <div css={styles.textWrapper}>{text}</div>
          {!!subText && <div css={styles.subTextWrapper}>{subText}</div>}
        </div>
        {!!After && (
          <div css={styles.afterWrapper}>
            <After {...presentationProps} />
          </div>
        )}
      </ComponentSwitch>
    );
  }
}

export { ItemPrimitive as ItemPrimitiveBase };
export default withContentTheme(ItemPrimitive);
