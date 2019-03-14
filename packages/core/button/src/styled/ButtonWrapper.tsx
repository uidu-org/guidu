import * as React from 'react';

export type Props = {
  onClick?: React.MouseEventHandler;
  fit: boolean;
};

const ButtonWrapper: React.StatelessComponent<Props> = props => {
  const style: React.CSSProperties = {
    alignSelf: 'center',
    display: 'inline-flex',
    flexWrap: 'nowrap',
    maxWidth: '100%',
    position: 'relative',
  };
  if (props.fit) {
    style.width = '100%';
    style.justifyContent = 'center';
  }

  const optionalProps: Pick<Props, 'onClick'> = {};
  if (props.onClick) {
    optionalProps.onClick = props.onClick;
  }
  return (
    <span style={style} {...optionalProps}>
      {props.children}
    </span>
  );
};

export default ButtonWrapper;
