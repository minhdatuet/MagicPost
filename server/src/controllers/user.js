const userService = require('../services/user.js');
exports.getUser = async (req, res) => {
    const {phone} = req.user
    try {
        if(!phone) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!' + (!phone ? "phone " : " ")
        })
        const response = await userService.getUser(phone)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller' + error
        })
    }
}