import React from 'react';
import { openFile, readFile } from '../utils/fileUtils';
import './MenuBar.css';

const MenuBar = ({ setContent }) => {
  const handleOpenFile = async () => {
    const filePath = await openFile();
    if (filePath) {
      const content = await readFile(filePath);
      setContent(content);
    }
  };

  return (
    <div className="menu-bar">
      <div className="menu-item" onClick={handleOpenFile}>File</div>
      <div className="menu-item">Edit</div>
      <div className="menu-item">Selection</div>
      <div className="menu-item">View</div>
      <div className="menu-item">Run</div>
      <div className="menu-item">Terminal</div>
      <div className="menu-item">Help</div>
    </div>
  );
};

export default MenuBar;
