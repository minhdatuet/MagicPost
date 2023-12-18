const packageService = require('../services/package.js');
exports.create = async (req, res) => {
    const {senderPhone, senderName, senderAddress, receiverPhone, receiverName, receiverAddress, transactionPointStartId, name, shippingCost} = req.body
    try{
        if(!senderPhone || !senderName || !senderAddress || !receiverPhone || !receiverName || !receiverAddress 
            || !transactionPointStartId || !name || !shippingCost) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!' 
        })
        const response = await packageService.createService(req.body)
        return res.status(200).json(response)    
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at package controller' + error
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        const response = await packageService.getAllService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at package controller' + error
        })
    }
}