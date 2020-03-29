import React, { PureComponent } from 'react';

export default class Image extends PureComponent<any> {
  render() {
    const { getStyles, innerProps, data } = this.props;

    return (
      <div
        style={getStyles('view', this.props)}
        // className={className('view', { isFullscreen, isModal })}
      >
        <img
          {...innerProps}
          // className={className('view-image', { isFullscreen, isModal })}
          alt={data.alt}
          src={data.src}
          style={{
            height: 'auto',
            maxHeight: '100&',
            maxWidth: '100%',
            userSelect: 'none',
          }}
        />
      </div>
    );
  }
}
