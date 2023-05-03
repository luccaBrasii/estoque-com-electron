const database = require('../models')

class Controller {
    static async all(req, res) {
        try {
            const allDados = await database.produtos.findAll()
            return res.json(allDados)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async create(req, res) {
        const newProduct = req.body
        try {
            const newP = await database.produtos.create(newProduct)
            return res.json(newP)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async att(req, res) {
        const { cod } = req.params
        const atualizacao = req.body
        try {
            await database.produtos.update(atualizacao, { where: { codigo: Number(cod) } })
            const prodAtt = await database.produtos.findOne({ where: { codigo: Number(cod) } })
            return res.status(200).json(prodAtt)
        } catch (erro) {
            return res.status(500).json(erro)
        }
    }

    static async one(req, res) {
        const { cod } = req.params
        try {
            const produto = await database.produtos.findOne({ where: { codigo: cod } })
            return res.status(200).json(produto)
        } catch (erro) {
            return res.status(500).json(erro)
        }
    }
}

module.exports = Controller