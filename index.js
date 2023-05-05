const electron = require('electron')
const url = require('url')
const path = require('path')
const { app, BrowserWindow } = electron

let mainWindow;

app.on('ready', async () => {

    mainWindow = new BrowserWindow({ width: 1250, height: 1250 });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'public', 'estoque.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
