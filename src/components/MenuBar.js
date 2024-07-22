import React, { useState } from 'react';
import { openFile, readFile, saveFile, saveFileAs, openFolder } from '../utils/fileUtils';
import styled from 'styled-components';
import FloatMenu from './FloatMenu';
import { isElectron } from '../utils/environment';
import { FaSun, FaMoon } from 'react-icons/fa';

const MenuBarContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.menuBackground};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  font-family: Arial, sans-serif;
  border-bottom: 1px solid ${({ theme }) => theme.separeteBorder};
`;

const MenuItem = styled.div`
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ThemeToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  margin-left: auto;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
`;

const getFileLanguage = (fileName) => {
  const extension = fileName.split('.').pop();
  switch (extension) {
    case 'js':
      return 'javascript';
    case 'py':
      return 'python';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'json':
      return 'json';
    default:
      return 'plaintext';
  }
};

const MenuBar = ({ setContent, toggleTheme, theme, addFileToOpenFiles, files, activeFile, updateFileContent, setAutoSave, openFolder }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [autoSave, setLocalAutoSave] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleOptionSelect = async (option) => {
    console.log(`Option selected: ${option}`);
    switch (option) {
      case 'new-file':
        addFileToOpenFiles('Untitled-' + Date.now(), '', 'plaintext');
        break;
      case 'new-window':
        if (isElectron()) {
          window.electron.newWindow();
        } else {
          alert('Esta funcionalidade só está disponível no aplicativo Electron.');
        }
        break;
      case 'open-file':
        const file = await openFile();
        if (file) {
          const { path, content } = file; // Extraindo path e content corretamente
          const language = getFileLanguage(file.name);
          addFileToOpenFiles(file.name, content, language, path);
        }
        break;
      case 'open-folder':
        await openFolder();
        break;
      case 'save':
        if (activeFile) {
          const file = files.find(f => f.name === activeFile);
          if (file) {
            if (file.path) {
              await saveFile(file.path, file.content);
            } else {
              const filePath = await saveFileAs(file.name, file.content);
              if (filePath) {
                updateFileContent(activeFile, file.content, filePath);
              }
            }
          }
        }
        break;
      case 'save-as':
        if (activeFile) {
          const file = files.find(f => f.name === activeFile);
          if (file) {
            const filePath = await saveFileAs(file.name, file.content);
            if (filePath) {
              updateFileContent(activeFile, file.content, filePath);
            }
          }
        }
        break;
      case 'toggle-auto-save':
        setLocalAutoSave(!autoSave);
        setAutoSave();
        break;
      case 'exit':
        if (isElectron()) {
          window.electron.exitApp();
        } else {
          window.close();
        }
        break;
      default:
        break;
    }
  };

  return (
    <MenuBarContainer>
      <MenuItem onClick={handleMenuToggle}>File</MenuItem>
      {showMenu && <FloatMenu onClose={() => setShowMenu(false)} onOptionSelect={handleOptionSelect} autoSave={autoSave} />}
      <MenuItem>Edit</MenuItem>
      <MenuItem>Selection</MenuItem>
      <MenuItem>View</MenuItem>
      <MenuItem>Run</MenuItem>
      <MenuItem>Terminal</MenuItem>
      <MenuItem>Help</MenuItem>
      <ThemeToggleButton onClick={toggleTheme}>
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </ThemeToggleButton>
    </MenuBarContainer>
  );
};

export default MenuBar;
