import React from 'react';
import styled from 'styled-components';
import { readFile, getFileLanguage } from '../utils/fileUtils';

const SideBarContainer = styled.div`
  width: 200px;
  background-color: ${({ theme }) => theme.sidebarBackground};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  border-right: 1px solid ${({ theme }) => theme.separeteBorder};
`;

const FileItem = styled.div`
  cursor: pointer;
  padding: 5px 0;
  &:hover {
    background-color: ${({ theme }) => theme.hoverBackground};
  }
`;

const SideBar = ({ files, openFile, currentFolder }) => {
  const handleFileClick = async (file) => {
    const filePath = `${currentFolder}/${file}`;
    const fileContent = await readFile(filePath);
    openFile(file, fileContent || '', getFileLanguage(file), filePath);
  };

  return (
    <SideBarContainer>
      {files.map((file, index) => (
        <FileItem key={index} onClick={() => handleFileClick(file)}>
          {file}
        </FileItem>
      ))}
    </SideBarContainer>
  );
};

export default SideBar;
