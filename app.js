const express = require('express')
const { exec } = require('child_process');
const Routes = require('./api/routes')


const app = express()

Routes(app)

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/estoque.html');
})

app.get('/transacoes', (req, res) => {
    res.sendFile(__dirname + '/public/transacoes.html');
})

app.get('/vendas', (req, res) => {
    res.sendFile(__dirname + '/public/vendas.html');
})


app.listen(3000, () => {
    console.log('Running meu-app: http://localhost:3000/')
})

//exec('start http://localhost:3000/');
exec('electron .');