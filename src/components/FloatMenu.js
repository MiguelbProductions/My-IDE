import React from 'react';
import styled from 'styled-components';

const FloatMenuContainer = styled.div`
  position: absolute;
  top: 30px; /* Ajuste conforme necessário */
  left: 10px; /* Ajuste conforme necessário */
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 200px;
  padding: 10px;
`;

const MenuItem = styled.div`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.background};
  }
`;

const Separator = styled.hr`
  margin: 10px 0;
`;

const FloatMenu = ({ onClose, onOptionSelect }) => {
  const handleOptionClick = (option) => {
    onOptionSelect(option);
    onClose();
  };

  return (
    <FloatMenuContainer>
      <MenuItem onClick={() => handleOptionClick('new-file')}>New Text File</MenuItem>
      <MenuItem onClick={() => handleOptionClick('new-window')}>New Window</MenuItem>
      <Separator />
      <MenuItem onClick={() => handleOptionClick('open-file')}>Open File</MenuItem>
      <MenuItem onClick={() => handleOptionClick('open-folder')}>Open Folder</MenuItem>
      <Separator />
      <MenuItem onClick={() => handleOptionClick('save')}>Save</MenuItem>
      <MenuItem onClick={() => handleOptionClick('save-as')}>Save As</MenuItem>
      <MenuItem onClick={() => handleOptionClick('toggle-auto-save')}>Auto Save</MenuItem>
      <Separator />
      <MenuItem onClick={() => handleOptionClick('exit')}>Exit</MenuItem>
    </FloatMenuContainer>
  );
};

export default FloatMenu;
