const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (filePath, content) => ipcRenderer.invoke('dialog:saveFile', filePath, content),
  saveFileAs: (content) => ipcRenderer.invoke('dialog:saveFileAs', content)
});

console.log('Preload script loaded'); // Adiciona log para depuração
