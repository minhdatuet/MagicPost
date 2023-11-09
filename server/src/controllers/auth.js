const authService = require('../services/auth.js');
exports.login = async (req, res) => {
    const {phone, password} = req.body
    try{
        if(!phone || !password) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!' 
        })
        const response = await authService.loginService(req.body)
        return res.status(200).json(response)    
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller' + error
        })
    }
}

exports.register = async (req, res) => {
    const {name, phone, password, address} = req.body
    try{
        // return name
        if(!name || !phone || !password || !address) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!' 
        })
        const response = await authService.registerService(req.body)
        return res.status(200).json(response)    
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller' + error
        })
    }
}