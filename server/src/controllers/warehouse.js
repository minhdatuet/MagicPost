const warehouseService = require('../services/warehouse.js');
exports.create = async (req, res) => {
    const {name, address, leaderId} = req.body
    try{
        if(!name || !address || !leaderId) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!' 
        })
        const response = await warehouseService.createService(req.body)
        return res.status(200).json(response)    
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at warehouse controller' + error
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        const response = await warehouseService.getAllService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at warehouse controller' + error
        })
    }
}