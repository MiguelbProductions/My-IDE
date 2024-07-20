import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#FFFFFF',
  text: '#000000',
  background: '#F3F3F3',
  openFileTabBackground: '#F3F3F3',
  sidebarBackground: '#F3F3F3',
  editorBackground: '#FFFFFF',
  menuBackground: '#F3F3F3',
  toggleBorder: '#6B8096',
  separeteBorder: '#6B8096',
  selectedopenFileTab: '#6B8096',
};

export const darkTheme = {
  body: '#1E1E1E',
  text: '#D4D4D4',
  background: '#252526',
  openFileTabBackground: '#333333',
  sidebarBackground: '#333333',
  editorBackground: '#1E1E1E',
  menuBackground: '#333333',
  toggleBorder: '#302f2f',
  separeteBorder: '#101010',
  selectedopenFileTab: '#2e586e',
};

export const GlobalStyles = createGlobalStyle`
  html, body {
      overflow: hidden;
  }
      
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    transition: all 0.50s linear;
    margin: 0 !important
  }

  .app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .main-content {
    display: flex;
    flex-grow: 1;
  }

  .menu-bar {
    display: flex;
    background-color: ${({ theme }) => theme.menuBackground};
    color: ${({ theme }) => theme.text};
    padding: 10px;
    font-family: Arial, sans-serif;
  }

  .menu-item {
    margin-right: 20px;
    cursor: pointer;
  }

  .menu-item:hover {
    text-decoration: underline;
  }

  .theme-toggle-button {
    margin-left: auto;
    padding: 5px 10px;
    cursor: pointer;
    border: none;
    background-color: ${({ theme }) => theme.toggleBorder};
    color: ${({ theme }) => theme.text};
  }

  .float-menu {
    position: absolute;
    top: 30px;
    left: 10px;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border: 1px solid #ccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    width: 200px;
    padding: 10px;
  }

  .float-menu .menu-item {
    padding: 8px;
    cursor: pointer;
  }

  .float-menu .menu-item:hover {
    background-color: ${({ theme }) => theme.background};
  }

  .float-menu hr {
    margin: 10px 0;
  }

  .sidebar {
    width: 200px;
    background-color: ${({ theme }) => theme.sidebarBackground};
    color: ${({ theme }) => theme.text};
    padding: 10px;
  }

  .editor {
    flex-grow: 1;
    background-color: ${({ theme }) => theme.editorBackground};
    color: ${({ theme }) => theme.text};
    padding: 10px;
  }

  .open-files-bar {
    display: flex;
    background-color: ${({ theme }) => theme.menuBackground};
    padding: 5px;
  }

  .open-file-tab {
    margin-right: 10px;
    padding: 5px 10px;
    background-color: ${({ theme }) => theme.background};
    border: 1px solid ${({ theme }) => theme.toggleBorder};
    border-radius: 3px;
    cursor: pointer;
  }
`;
