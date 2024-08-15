// with child_process


const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;

// Function to create the Electron window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Load the React app from the 'dist' folder
  mainWindow.loadFile(path.join(__dirname, 'my-app/dist/index.html'));

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// Function to start the Node.js map server
// Function to start the Node.js map server
function startMapServer() {
  const nodePath = path.join(process.resourcesPath, 'MapServer', 'node.exe'); // Use the local Node.js binary
  const serverPath = path.join(process.resourcesPath, 'MapServer', 'server.js');

  const serverProcess = spawn(nodePath, [serverPath]);

  serverProcess.stdout.on('data', (data) => {
    console.log(`Map Server: ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`Map Server Error: ${data}`);
  });

  serverProcess.on('close', (code) => {
    console.log(`Map Server exited with code ${code}`);
  });
}

app.whenReady().then(() => {
  startMapServer(); // Start the Node.js server
  createWindow();   // Create the Electron window for the React app
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
