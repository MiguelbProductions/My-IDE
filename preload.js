const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (filePath, content) => ipcRenderer.invoke('dialog:saveFile', filePath, content),
  saveFileAs: (fileName, content) => ipcRenderer.invoke('dialog:saveFileAs', fileName, content),
  openFolder: () => ipcRenderer.invoke('dialog:openFolder'),
  readDir: (dirPath) => ipcRenderer.invoke('fs:readDir', dirPath),
  readFile: (filePath) => ipcRenderer.invoke('fs:readFile', filePath),
  newWindow: () => ipcRenderer.send('new-window'),
  exitApp: () => ipcRenderer.send('exit-app'),
});

console.log('Preload script loaded');
