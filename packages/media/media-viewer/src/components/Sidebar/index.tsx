import { ShellBody } from '@uidu/shell';
import React from 'react';
import Header from '../Header';
import StyledSidebar from './styled';

export default function Sidebar({ currentView, onClose }) {
  return (
    <StyledSidebar>
      <Header currentView={currentView} onClose={onClose} />
      <ShellBody>Lista commenti</ShellBody>
    </StyledSidebar>
  );
}
