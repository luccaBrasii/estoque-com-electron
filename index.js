const electron = require('electron')
const url = require('url')
const path = require('path')
const { app, BrowserWindow } = electron
const express = require('express')
const Routes = require('./api/routes')


const appExpress = express()

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


// server express
Routes(appExpress)

appExpress.use(express.static('public'))

appExpress.use(express.json());

appExpress.listen(3000, () => {
    console.log('Running meu-appExpress: http://localhost:3000/')
})
