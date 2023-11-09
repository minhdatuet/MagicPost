const db = require('../models/');
const bcrypt = require('bcryptjs');
const jwr = require('jsonwebtoken');
require('dotenv').config()
const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

exports.registerService = (body) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Accounts.findOrCreate({
            where: {phone: body.phone},
            defaults: {
                name: body.name,
                phone: body.phone,
                password: hashPassword(body.password),
                accountType: 'CUSTOMER',
                address: body.address
            }
        })
        const token = response[1] && jwr.sign({phone: response[0].phone}, process.env.SECRET_KEY, {expiresIn: '2d'})
        resolve({
            err: token? 0 : 2,
            msg: token ? 'Register is successfully!' : 'Phone number has already exist!',
            token: token || null
        })
    } catch (error) {
        reject(error)
    }
})

exports.loginService = (body) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Accounts.findOne({
            where: {phone: body.phone},
            raw: true
        })
        const isCorrectPassword = response && bcrypt.compareSync(body.password, response.password)
        const token = isCorrectPassword && jwr.sign({phone: response.phone}, process.env.SECRET_KEY, {expiresIn: '2d'})
        resolve({
            err: token? 0 : 2,
            msg: token ? 'Login is succesfully!' : response ? 'Password is incorrect' : `Phone number hasn't been registed`,
            token: token || null
        })
    } catch (error) {
        reject(error)
    }
})