import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const OpenFilesBarContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.menuBackground};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.separeteBorder};
`;

const FileTab = styled.div`
  padding: 5px 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.openFileTabBackground};
  border-right: 1px solid ${({ theme }) => theme.separeteBorder} !important;
  ${({ theme, isActive }) => (isActive ? `border-bottom: 2px solid ${theme.selectedopenFileTab}` : '')};
`;

const CloseIcon = styled(FaTimes)`
  margin-left: 5px;
  cursor: pointer;
`;

const OpenFilesBar = ({ openFiles, activeFile, setActiveFile, closeFile }) => {
  return (
    <OpenFilesBarContainer>
      {openFiles.map((file) => (
        <FileTab
          key={file.name}
          isActive={file.name === activeFile}
          onClick={() => setActiveFile(file.name)}
        >
          {file.name}
          <CloseIcon onClick={(e) => {
            e.stopPropagation();
            closeFile(file.name);
          }} />
        </FileTab>
      ))}
    </OpenFilesBarContainer>
  );
};

export default OpenFilesBar;
