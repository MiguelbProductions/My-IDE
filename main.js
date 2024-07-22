const { app, BrowserWindow, ipcMain, dialog, session } = require('electron');
const path = require('path');
const fs = require('fs');
const isDev = true;

let mainWindow;

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

  console.log(`Loading URL: ${startURL}`);

  mainWindow.loadURL(startURL);
  mainWindow.maximize();

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    let csp = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'";
    
    if (isDev) {
      csp = "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'";
    }

    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [csp]
      }
    });
  });
});

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
  try {
    console.log('Saving file in Electron main process:', filePath);
    console.log('Content to save:', content);

    fs.writeFileSync(filePath, content, 'utf8');

    const verifyContent = fs.readFileSync(filePath, 'utf8');
    console.log('Verified file content after saving:', verifyContent);

    if (verifyContent !== content) {
      throw new Error('Content mismatch after saving');
    }

  } catch (error) {
    console.error('Error saving file in Electron main process:', error);
  }
});

ipcMain.handle('dialog:saveFileAs', async (event, fileName, content) => {
  const result = await dialog.showSaveDialog({
    defaultPath: fileName,
    properties: ['createDirectory']
  });
  if (result.canceled) return null;
  const filePath = result.filePath;
  try {
    console.log('Saving file as in Electron main process:', filePath);
    console.log('Content to save:', content);

    fs.writeFileSync(filePath, content, 'utf8');

    const verifyContent = fs.readFileSync(filePath, 'utf8');
    console.log('Verified file content after saving as:', verifyContent);

    if (verifyContent !== content) {
      throw new Error('Content mismatch after saving as');
    }

    return filePath;
  } catch (error) {
    console.error('Error saving file as in Electron main process:', error);
    return null;
  }
});

ipcMain.handle('dialog:openFolder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  if (result.canceled) return null;
  const dirPath = result.filePaths[0];
  const files = fs.readdirSync(dirPath);
  return { dirPath, files };
});

ipcMain.handle('fs:readDir', async (event, dirPath) => {
  const files = fs.readdirSync(dirPath);
  return files;
});

ipcMain.handle('fs:readFile', async (event, filePath) => {
  console.log('Reading file path:', filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  return content;
});

ipcMain.on('new-window', () => {
  createWindow();
});

ipcMain.on('exit-app', () => {
  app.quit();
});
