import React, { Component } from 'react';
import CompanyDropdown from '../examples-utils/DropdownContents/CompanyDropdown';
import DevelopersDropdown from '../examples-utils/DropdownContents/DevelopersDropdown';
import ProductsDropdown from '../examples-utils/DropdownContents/ProductsDropdown';
import AnimatedMenu from '../src';

const navbarConfig = () => [
  { name: 'Products', path: '#p', dropdown: ProductsDropdown },
  { name: 'Developers', path: '#d', dropdown: DevelopersDropdown },
  { name: 'Company', path: '#c', dropdown: CompanyDropdown },
];

export default class Basic extends Component<any> {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <AnimatedMenu
          className="nav"
          navbarConfig={navbarConfig()}
          duration={300}
        />
      </nav>
    );
  }
}
