const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, 'dist/index.html')}`
  );
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('open-file', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'All Files', extensions: ['*'] }]
  });
  if (result.canceled) {
    return null;
  } else {
    return result.filePaths[0];
  }
});

ipcMain.handle('read-file', async (event, filePath) => {
  return fs.promises.readFile(filePath, 'utf8');
});

ipcMain.handle('save-file', async (event, { filePath, content }) => {
  return fs.promises.writeFile(filePath, content, 'utf8');
});
