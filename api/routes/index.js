const bodyParser = require('body-parser')
const pedidos = require('./controllerRoute')

module.exports = app => {
    app.use(bodyParser.json(),
        pedidos)
}
