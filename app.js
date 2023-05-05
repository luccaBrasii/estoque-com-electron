const express = require('express')
const { exec } = require('child_process');
const Routes = require('./api/routes')


const app = express()

Routes(app)

app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

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