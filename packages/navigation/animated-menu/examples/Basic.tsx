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
      <nav tw="flex flex-row bg-gray-50 flex-1 p-3 items-center">
        <a tw="text-lg font-bold" href="#">
          Navbar
        </a>
        <AnimatedMenu
          navbarConfig={navbarConfig()}
          duration={300}
          tw="flex space-x-6 ml-8"
        />
      </nav>
    );
  }
}
