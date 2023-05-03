const database = require('../models')

class TransacaoController {
    static async all(req, res) {
        try {
            const allDados = await database.Transacao.findAll()
            return res.json(allDados)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async create(req, res) {
        const newProduct = req.body
        try {
            const newP = await database.Transacao.create(newProduct)
            return res.json(newP)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = TransacaoController