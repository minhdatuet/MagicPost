const db = require('../models/');
const bcrypt = require('bcryptjs');
const jwr = require('jsonwebtoken');
require('dotenv').config()
const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))
const { Sequelize, DataTypes, Op } = require('sequelize');

exports.registerService = (body) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Accounts.findOrCreate({
            where: {phone: body.phone},
            defaults: {
                name: body.name,
                phone: body.phone,
                password: hashPassword(body.password),
                accountType: body.accountType,
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


exports.updateLeader = (body) => new Promise(async(resolve, reject) => {
    const user = await db.Accounts.findAll({
        where: {
            phone: body.phone
        }
    })
    try {
        let responsePosition = null
        switch (body.accountType) {
            case 'WAREHOUSE_LEADER': {
                responsePosition = await db.Warehouse.update({leaderId: user[0].id}, {
                    where: {
                        id: body.positionId
                    }
                })
                break
            }
            case 'POINT_LEADER': {
                responsePosition = await db.TransactionPoint.update({pointLeaderId: user[0].id}, {
                    where: {
                        id: body.positionId
                    }
                })
                break
            }
            default: {
                responsePosition = null
            }
        }
        resolve({
            err: responsePosition? 0 : 2,
            msg: responsePosition ? 'Update leader is successfully!' : 'Update leader is unsuccessfully',
        })
    } catch (error) {
        reject(error)
    }
    
})

exports.updateEmployee = (body) => new Promise(async(resolve, reject) => {
    const user = await db.Accounts.findAll({
        where: {
            phone: body.phone
        }
    })
    try {
        let responsePosition = null
        switch (body.accountType) {
            case 'WAREHOUSE_STAFF': {
                responsePosition = await db.Employee.create({
                    accountId: user[0].id,
                    warehouseId: body.positionId,
                })
                break
            }
            case 'POINT_STAFF': {
                responsePosition = await db.Employee.create({
                    accountId: user[0].id,
                    transactionPointId: body.positionId
                })
                break
            }
            default: {
                responsePosition = null
            }
        }
        resolve({
            err: responsePosition? 0 : 2,
            msg: responsePosition ? 'Update employee is successfully!' : 'Update employee is unsuccessfully',
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

exports.getEmployees = (body) => new Promise(async(resolve, reject) => {
    try {
        let response = null
        switch (body.type) {
            case 'WAREHOUSE': {
                response = await db.Accounts.findAll({
                    where: {
                      '$Employee.warehouseId$': body.positionId,
                    },
                    include: [{
                      model: db.Employee,
                      attributes: [], // Không lấy thông tin từ bảng Employee
                      required: false,
                    }],
                  })
                break
            }
            case 'TRANSACTION_POINT': {
                response = await db.Accounts.findAll({
                    where: {
                      '$Employee.transactionPointId$': body.positionId,
                    },
                    include: [{
                      model: db.Employee,
                      attributes: [], // Không lấy thông tin từ bảng Employee
                      required: false,
                    }],
                  })
                break
            }
            default: {
                break
            }
        }
        resolve({
            err: response? 0: 2,
            msg: response? "Succesfully" : "Unsuccesfully",
            data: JSON.stringify(response)
        })
    } catch (error) {
        reject(error)
    }
})

exports.getUser = (body) => new Promise(async(resolve, reject) => {
    try {
        let response  = await db.Accounts.findAll({
            where: {
              phone: body.phone,
            },
            attributes: ['name', 'phone', 'address', 'accountType'],
            include: [
            {
                model: db.Warehouse,
                attributes: ['name', 'address'],
                required: false,
            },
            {
                model: db.TransactionPoint,
                attributes: ['name', 'address'],
                required: false,
            },
            {
                model: db.Employee,
                required: false,
                attributes: ['id'],
                include: [{
                    model: db.Warehouse,
                    attributes: ['name', 'address']
                }]
            }]

        })
        
        resolve({
            err: response? 0: 2,
            msg: response? "Succesfully" : "Unsuccesfully",
            data: JSON.stringify(response)
        })
    } catch (error) {
        reject(error)
    }
})