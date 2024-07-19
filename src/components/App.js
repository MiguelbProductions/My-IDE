import React, { useState } from 'react';
import MenuBar from './MenuBar';
import SideBar from './SideBar';
import Editor from './Editor';
import './App.css';

const App = () => {
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);

  const openFile = (filePath) => {
    const fileName = filePath.split('\\').pop();
    setFiles((prevFiles) => [...new Set([...prevFiles, fileName])]);
    setContent(filePath);
  };

  return (
    <div className="app-container">
      <MenuBar setContent={setContent} />
      <div className="main-content">
        <SideBar files={files} openFile={openFile} />
        <Editor content={content} setContent={setContent} />
      </div>
    </div>
  );
};

export default App;
