const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (filePath, content) => ipcRenderer.invoke('dialog:saveFile', filePath, content),
  saveFileAs: (content) => ipcRenderer.invoke('dialog:saveFileAs', content),
  newWindow: () => ipcRenderer.send('new-window'),
  exitApp: () => ipcRenderer.send('exit-app'),
});

console.log('Preload script loaded');
