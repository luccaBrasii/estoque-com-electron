const express = require('express')
const { exec } = require('child_process');
const Routes = require('./api/routes')


const appExpress = express()

Routes(appExpress)

appExpress.use(express.static('public'))

appExpress.use(express.json());

appExpress.listen(3000, () => {
    console.log('Running meu-appExpress: http://localhost:3000/')
})

//exec('start http://localhost:3000/');
exec('electron .');