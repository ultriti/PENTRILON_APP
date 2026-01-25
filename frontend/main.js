const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config();

let mainWindow;
let pyProc;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  mainWindow.loadURL(`file://${path.join(__dirname, 'dist', 'index.html')}`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function startPythonExecutable() {
  // Use .exe in production, .py in development
  // const isDev = process.env.NODE_ENV === 'development';
  const isDev = false

  const exePath = isDev
    ? path.join(__dirname, 'backend', 'main.py') // dev mode
    : path.join(process.resourcesPath, 'main.exe'); // production

  console.log('exePath',exePath);
  

  pyProc = spawn(isDev ? 'python' : exePath, isDev ? [exePath] : []);

  pyProc.stdout.on('data', (data) => {
    console.log(`Python backend: ${data.toString()}`);
  });

  pyProc.stderr.on('data', (data) => {
    console.error(`Python error: ${data.toString()}`);
  });

  pyProc.on('close', (code) => {
    console.log(`Python backend exited with code ${code}`);
  });
}

app.whenReady().then(() => {
  startPythonExecutable();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (pyProc) {
      pyProc.kill();
      pyProc = null;
    }
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
