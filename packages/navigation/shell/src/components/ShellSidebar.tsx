import React from 'react';
import { Sidebar } from '../styled';

export default function ShellSidebar({ ...rest }) {
  return <Sidebar {...rest} className="d-none d-lg-flex" />;
}
