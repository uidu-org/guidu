import React, { Children, cloneElement } from 'react';
import classNames from 'classnames';

export default function StepButton({ children }) {
  const renderChildren = () =>
    Children.map(children, child =>
      cloneElement(child, {
        className: classNames('btn-block', child.props.className),
      }),
    );

  return (
    <div className="row" style={{ flex: 1 }}>
      <div className="col-md-4 col-lg-3">{renderChildren()}</div>
    </div>
  );
}
