import React from 'react';
import './SideBar.css';

const SideBar = ({ files, openFile }) => {
  return (
    <div className="side-bar">
      <h2>Workspace</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index} onClick={() => openFile(file)}>
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
