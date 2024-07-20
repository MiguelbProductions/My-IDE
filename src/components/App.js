import React, { useState, useEffect } from 'react';
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

const PlaceholderMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-size: 24px;
  color: ${({ theme }) => theme.text};
`;

const App = ({ toggleTheme, theme }) => {
  const [files, setFiles] = useState({});
  const [openFiles, setOpenFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [autoSave, setAutoSave] = useState(false);

  useEffect(() => {
    console.log("App mounted"); // Adiciona log para depuração
    let interval;
    if (autoSave && activeFile && files[activeFile]) {
      interval = setInterval(() => {
        const file = files[activeFile];
        if (file.path) {
          saveFile(file.path, file.content);
        }
      }, 5000); // Salvar a cada 5 segundos
    }
    return () => clearInterval(interval);
  }, [autoSave, activeFile, files]);

  const addFileToOpenFiles = (fileName, content, language, path = null) => {
    if (!openFiles.includes(fileName)) {
      setOpenFiles([...openFiles, fileName]);
    }
    setFiles({ ...files, [fileName]: { content, language, path } });
    setActiveFile(fileName);
    console.log("File added:", fileName); // Adiciona log para depuração
  };

  const updateFileContent = (fileName, content) => {
    setFiles({ ...files, [fileName]: { ...files[fileName], content } });
    console.log("File content updated:", fileName); // Adiciona log para depuração
  };

  return (
    <AppContainer>
      <MenuBar
        setContent={(content) => updateFileContent(activeFile, content)}
        toggleTheme={toggleTheme}
        theme={theme}
        addFileToOpenFiles={addFileToOpenFiles}
        files={files}
        activeFile={activeFile}
      />
      <MainContent>
        <SideBar />
        <EditorSection>
          <OpenFilesBar
            openFiles={openFiles}
            activeFile={activeFile}
            setActiveFile={setActiveFile}
          />
          {activeFile ? (
            <Editor
              content={files[activeFile]?.content || ''}
              setContent={(content) => updateFileContent(activeFile, content)}
              theme={theme}
              language={files[activeFile]?.language || 'plaintext'}
            />
          ) : (
            <PlaceholderMessage>Open a file to start editing</PlaceholderMessage>
          )}
        </EditorSection>
      </MainContent>
    </AppContainer>
  );
};

export default App;
