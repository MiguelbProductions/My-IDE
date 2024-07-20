import React from 'react';
import styled from 'styled-components';

const OpenFilesBarContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.menuBackground};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.separeteBorder};
`;

const OpenFileTab = styled.div`
  padding: 5px 15px;
  background-color: ${({ theme }) => theme.openFileTabBackground};
  border-right: 1px solid ${({ theme }) => theme.separeteBorder} !important;
  ${({ theme, isActive }) => (isActive ? "border-bottom: 2px solid" + theme.selectedopenFileTab : "")};
  cursor: pointer;
`;

const OpenFilesBar = ({ openFiles, activeFile, setActiveFile }) => {
  return (
    <OpenFilesBarContainer>
      {openFiles.map((file) => (
        <OpenFileTab key={file.name} isActive={activeFile === file.name} onClick={() => setActiveFile(file.name)}>
          {file.name}
        </OpenFileTab>
      ))}
    </OpenFilesBarContainer>
  );
};

export default OpenFilesBar;
