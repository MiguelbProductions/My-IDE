import React, { useState, useEffect, useRef } from 'react';
import MenuBar from './MenuBar';
import SideBar from './SideBar';
import Editor from './Editor';
import OpenFilesBar from './OpenFilesBar';
import styled from 'styled-components';
import { saveFile } from '../utils/fileUtils';

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

const App = ({ toggleTheme, theme }) => {
  const [content, setContent] = useState('');
  const openFilesRef = useRef([]);
  const activeFileRef = useRef(null);
  const [autoSave, setAutoSave] = useState(false);
  const [, setRender] = useState({});

  const forceUpdate = () => setRender({});

  useEffect(() => {
    if (activeFileRef.current) {
      const file = openFilesRef.current.find(f => f.name === activeFileRef.current);
      if (file) {
        setContent(file.content);
      }
    }
  }, [activeFileRef.current, openFilesRef.current]);

  const addFileToOpenFiles = (fileName, fileContent, fileLanguage, filePath) => {
    const newFile = {
      name: fileName,
      content: fileContent,
      language: fileLanguage,
      path: filePath
    };

    openFilesRef.current = [...openFilesRef.current, newFile];
    activeFileRef.current = fileName;
    forceUpdate();
  };

  const updateFileContent = (fileName, fileContent, filePath = null) => {
    openFilesRef.current = openFilesRef.current.map(file =>
      file.name === fileName ? { ...file, content: fileContent, path: filePath || file.path } : file
    );
    if (autoSave) {
      const file = openFilesRef.current.find(f => f.name === fileName);
      if (file && file.path) {
        saveFile(file.path, fileContent);
      }
    }
    forceUpdate();
  };

  const handleTabClick = (fileName) => {
    activeFileRef.current = fileName;
    forceUpdate();
  };

  const handleEditorChange = (fileName, newContent) => {
    setContent(newContent);
    if (fileName) {
      updateFileContent(fileName, newContent);
    }
  };

  return (
    <AppContainer>
      <MenuBar
        setContent={setContent}
        toggleTheme={toggleTheme}
        theme={theme}
        addFileToOpenFiles={addFileToOpenFiles}
        files={openFilesRef.current}
        activeFile={activeFileRef.current}
        updateFileContent={updateFileContent}
        autoSave={autoSave}
        setAutoSave={setAutoSave}
      />
      <MainContent>
        <SideBar />
        <EditorSection>
          <OpenFilesBar openFiles={openFilesRef.current} activeFile={activeFileRef.current} setActiveFile={handleTabClick} />
          <Editor
            content={content}
            setContent={handleEditorChange}
            activeFile={activeFileRef.current}
            theme={theme}
            language={activeFileRef.current && openFilesRef.current.find(file => file.name === activeFileRef.current)?.language}
          />
        </EditorSection>
      </MainContent>
    </AppContainer>
  );
};

export default App;
