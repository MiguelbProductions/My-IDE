import React, { useState } from 'react';
import styled from 'styled-components';

const OpenFilesBarContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.menuBackground};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.separeteBorder}
`;

const OpenFileTab = styled.div`
  padding: 5px 15px;
  background-color: ${({ theme }) => theme.openFileTabBackground};
  border-right: 1px solid ${({ theme }) => theme.separeteBorder} !important;
  ${({ theme, isActive }) => (isActive ? "border-bottom: 2px solid" + theme.selectedopenFileTab : "")  };
  cursor: pointer;
`;

const OpenFilesBar = ({ openFiles, activeFile, setActiveFile }) => {
  return (
    <OpenFilesBarContainer>
      {openFiles.map((file, index) => (
        <OpenFileTab key={index} isActive={activeFile === file} onClick={() => setActiveFile(file)}>
          {file}
        </OpenFileTab>
      ))}
    </OpenFilesBarContainer>
  );
};

export default OpenFilesBar;
