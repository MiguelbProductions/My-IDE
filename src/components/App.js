import React, { useState, useEffect, useRef } from 'react';
import MenuBar from './MenuBar';
import SideBar from './SideBar';
import Editor from './Editor';
import OpenFilesBar from './OpenFilesBar';
import styled from 'styled-components';
import { saveFile, openFolder, readDir, readFile, getFileLanguage } from '../utils/fileUtils';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
`;

const EditorSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Placeholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5em;
  color: ${({ theme }) => theme.text};
`;

const App = ({ toggleTheme, theme }) => {
  const [content, setContent] = useState('');
  const [openFiles, setOpenFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [autoSave, setAutoSave] = useState(false);
  const [folderFiles, setFolderFiles] = useState([]);
  const [currentFolder, setCurrentFolder] = useState('');

  useEffect(() => {
    if (activeFile) {
      const file = openFiles.find(f => f.name === activeFile);
      if (file) {
        setContent(file.content || '');
      }
    }
  }, [activeFile, openFiles]);

  const addFileToOpenFiles = (fileName, fileContent, fileLanguage, filePath) => {
    if (!openFiles.find(f => f.name === fileName)) {
      const newFile = {
        name: fileName,
        content: fileContent || '',
        language: fileLanguage,
        path: filePath
      };

      setOpenFiles(prevFiles => [...prevFiles, newFile]);
    }
    setActiveFile(fileName);
    setContent(fileContent || '');
  };

  const updateFileContent = (fileName, fileContent, filePath = null) => {
    setOpenFiles(prevFiles => 
      prevFiles.map(file =>
        file.name === fileName ? { ...file, content: fileContent || '', path: filePath || file.path } : file
      )
    );
    if (autoSave) {
      const file = openFiles.find(f => f.name === fileName);
      if (file && file.path) {
        saveFile(file.path, fileContent);
      }
    }
  };

  const handleTabClick = (fileName) => {
    setActiveFile(fileName);
  };

  const handleEditorChange = (fileName, newContent) => {
    setContent(newContent);
    if (fileName) {
      updateFileContent(fileName, newContent);
    }
  };

  const toggleAutoSave = () => {
    setAutoSave(prevAutoSave => !prevAutoSave);
  };

  const handleOpenFolder = async () => {
    const folder = await openFolder();
    if (folder) {
      setCurrentFolder(folder.dirPath);
      const files = await readDir(folder.dirPath);
      setFolderFiles(files);
    }
  };

  const handleCloseFile = (fileName) => {
    setOpenFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
    if (activeFile === fileName) {
      const remainingFiles = openFiles.filter(file => file.name !== fileName);
      if (remainingFiles.length > 0) {
        const nextActiveFile = remainingFiles[0].name;
        setActiveFile(nextActiveFile);
        const nextFile = remainingFiles.find(f => f.name === nextActiveFile);
        setContent(nextFile.content || '');
      } else {
        setActiveFile(null);
        setContent('');
      }
    }
  };

  return (
    <AppContainer>
      <MenuBar
        setContent={setContent}
        toggleTheme={toggleTheme}
        theme={theme}
        addFileToOpenFiles={addFileToOpenFiles}
        files={openFiles}
        activeFile={activeFile}
        updateFileContent={updateFileContent}
        autoSave={autoSave}
        setAutoSave={toggleAutoSave}
        openFolder={handleOpenFolder}
      />
      <MainContent>
        <SideBar files={folderFiles} openFile={addFileToOpenFiles} currentFolder={currentFolder} />
        <EditorSection>
          <OpenFilesBar openFiles={openFiles} activeFile={activeFile} setActiveFile={handleTabClick} closeFile={handleCloseFile} />
          {activeFile ? (
            <Editor
              content={content}
              setContent={newContent => handleEditorChange(activeFile, newContent)}
              activeFile={activeFile}
              theme={theme}
              language={activeFile && openFiles.find(file => file.name === activeFile)?.language}
            />
          ) : (
            <Placeholder>No file selected. Please open or create a new file to start editing.</Placeholder>
          )}
        </EditorSection>
      </MainContent>
    </AppContainer>
  );
};

export default App;
