const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const isDev = true;

let mainWindow; // Declare mainWindow com let para permitir reatribuição

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, 'dist/index.html')}`;

  console.log(`Loading URL: ${startURL}`); // Adiciona log para depuração

  mainWindow.loadURL(startURL);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.maximize()

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
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

// IPC Handlers
ipcMain.handle('dialog:openFile', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile']
  });
  if (result.canceled) return null;
  const file = result.filePaths[0];
  const content = fs.readFileSync(file, 'utf8');
  return { content, path: file };
});

ipcMain.handle('dialog:saveFile', async (event, filePath, content) => {
  fs.writeFileSync(filePath, content, 'utf8');
});

ipcMain.handle('dialog:saveFileAs', async (event, content) => {
  const result = await dialog.showSaveDialog({
    properties: ['createDirectory']
  });
  if (result.canceled) return null;
  const filePath = result.filePath;
  fs.writeFileSync(filePath, content, 'utf8');
  return filePath;
});
