const { Router } = require('express')
const Controller = require('../controller/Controller')
const TransacaoController = require('../controller/Transacoes')
const router = Router()

//CONTROLLER
router.get('/api', Controller.all)
router.get('/api/:cod', Controller.one)
router.post('/api', Controller.create)
router.put('/api/:cod', Controller.att)

//TRANSACOES
router.get('/apiTrans', TransacaoController.all)
router.post('/apiTrans', TransacaoController.create)

module.exports = router