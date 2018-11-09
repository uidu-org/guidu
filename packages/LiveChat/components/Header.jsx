import React, { PureComponent } from 'react';
import { X } from 'react-feather';

class Header extends PureComponent {
  render() {
    const { teamName, imageUrl, onClose, colors } = this.props;
    return (
      <div
        className="sc-header p-3"
        style={{
          backgroundColor: colors.launcher.background,
          color: colors.launcher.color,
        }}
      >
        <img
          className="rounded align-self-center d-flex"
          style={{ width: '2rem', height: '2rem' }}
          alt={teamName}
          src={imageUrl}
        />
        <div className="sc-header--team-name p-2 mx-2 d-flex flex-grow-1">
          {teamName}
        </div>
        <button
          type="button"
          className="sc-header--close-button btn d-flex align-items-center justify-content-center text-white border-0 p-2"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
    );
  }
}

export default Header;
