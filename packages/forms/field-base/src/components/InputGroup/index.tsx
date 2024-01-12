import React, { Children, Fragment, ReactElement, ReactNode } from 'react';
import tw from 'twin.macro';
import { StyledAddonWrapper } from '../../styled';
import { InputGroupPosition, InputGroupPropsWithChildren } from './types';

/**
 * Wraps an input to implement a Bootstrap [Input Group](http://getbootstrap.com/components/#input-groups)
 */
function InputGroup({
  layout,
  children,
  addonsBefore,
  addonsAfter,
}: InputGroupPropsWithChildren): JSX.Element {
  const renderAddons = (
    addons: [ReactElement],
    position: InputGroupPosition,
  ): ReactNode => {
    if (!addons) {
      return null;
    }

    if (Children.toArray(addons).length === 0) {
      return null;
    }

    return (
      <StyledAddonWrapper position={position}>
        {addons.map((addon) => (
          <Fragment key={addon.key}>{addon}</Fragment>
        ))}
      </StyledAddonWrapper>
    );
  };

  return (
    <div css={[tw`relative w-full`, layout === 'vertical' ? tw`h-full` : tw``]}>
      {renderAddons(addonsBefore, 'before')}
      {children}
      {renderAddons(addonsAfter, 'after')}
    </div>
  );
}

export default InputGroup;
