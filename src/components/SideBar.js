import React, { useState } from 'react';
import styled from 'styled-components';
import { readFile, readDir, getFileLanguage } from '../utils/fileUtils';
import { FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa';

const SideBarContainer = styled.div`
  width: 200px;
  background-color: ${({ theme }) => theme.sidebarBackground};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  border-right: 1px solid ${({ theme }) => theme.separeteBorder};
`;

const Item = styled.div`
  cursor: pointer;
  padding: 5px 0;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.hoverBackground};
  }
`;

const ItemIcon = styled.div`
  margin-right: 10px;
`;

const SideBar = ({ files, openFile, currentFolder }) => {
  const [expandedFolders, setExpandedFolders] = useState({});

  const handleFileClick = async (file) => {
    const filePath = `${currentFolder}/${file}`;
    const fileContent = await readFile(filePath);
    openFile(file, fileContent || '', getFileLanguage(file), filePath);
  };

  const handleFolderClick = async (folder) => {
    const folderPath = `${currentFolder}/${folder}`;
    if (expandedFolders[folderPath]) {
      setExpandedFolders({ ...expandedFolders, [folderPath]: false });
    } else {
      const folderFiles = await readDir(folderPath);
      setExpandedFolders({ ...expandedFolders, [folderPath]: folderFiles });
    }
  };

  const renderFilesAndFolders = (filesList, parentPath) => {
    return filesList.map((file, index) => {
      const fullPath = `${parentPath}/${file}`;
      const isFolder = Array.isArray(expandedFolders[parentPath]) && expandedFolders[parentPath].includes(file);

      if (isFolder) {
        return (
          <div key={index}>
            <Item onClick={() => handleFolderClick(file)}>
              <ItemIcon>
                {expandedFolders[fullPath] ? <FaFolderOpen /> : <FaFolder />}
              </ItemIcon>
              {file}
            </Item>
            {expandedFolders[fullPath] && (
              <div style={{ paddingLeft: '20px' }}>
                {renderFilesAndFolders(expandedFolders[fullPath], fullPath)}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <Item key={index} onClick={() => handleFileClick(file)}>
            <ItemIcon><FaFile /></ItemIcon>
            {file}
          </Item>
        );
      }
    });
  };

  return (
    <SideBarContainer>
      {renderFilesAndFolders(files, currentFolder)}
    </SideBarContainer>
  );
};

export default SideBar;
