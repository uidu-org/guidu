import React, { Component } from 'react';
import { ChevronDown } from 'react-feather';

export default class AddToList extends Component<any, any> {
  static defaultProps = {
    isDefaultOpen: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { fields, list, onClick, label, isDefaultOpen } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <div
          className={`list-group-item px-3 px-xl-4 text-muted ${
            isDefaultOpen ? '' : 'list-group-item-action'
          }`}
          onClick={() => this.setState({ isOpen: true })}
        >
          {label} <ChevronDown size={16} />
        </div>
        {(isDefaultOpen || isOpen) &&
          fields
            .filter(f => list.map(s => s.colId.colId).indexOf(f.colId) < 0)
            .map(field => (
              <a
                href="#"
                className="list-group-item list-group-item-action px-3 px-xl-4"
                key={field.colId}
                onClick={e => {
                  e.preventDefault();
                  this.setState({ isOpen: false }, () => onClick(field));
                }}
              >
                {field.headerComponentParams && (
                  <span
                    style={{ width: 22, display: 'inline-block' }}
                    className="mr-2"
                  >
                    {field.headerComponentParams.menuIcon}
                  </span>
                )}
                {field.headerName}
              </a>
            ))}
      </>
    );
  }
}
