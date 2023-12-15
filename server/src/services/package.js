const db = require('../models/');
const bcrypt = require('bcryptjs');
const jwr = require('jsonwebtoken');
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
exports.createService = (body) => new Promise(async(resolve, reject) => {
    try {
        const responsePacket = await db.Package.create({
            senderId: body.senderId,
            receiverId: body.receiverId,
            transactionPointStartId: body.transactionPointStartId,
            name: body.name,
            shippingCost: body.shippingCost
        
        })
        const responseStatus = await db.Status.create({
            packageId: responsePacket.id,
            nameOfStatus: 'DELIVERING',
            dateTransactionPointStart: new Date()
        })
        resolve({
            err: responsePacket && responseStatus ? 0 : 2,
            msg: responsePacket && responseStatus ? 'Create package is successfully!' : 'Create package is failed!',
        })
    } catch (error) {
        reject(error)
    }
})

exports.getAllPackages = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Package.findAll({
            attributes: ['name', 'shippingCost'],
            include: [
                {
                model: db.Accounts,
                as: 'sender',
                attributes: ['name', 'phone', 'address'],
                required: false,
              },
              {
                model: db.Accounts,
                as: 'receiver',
                attributes: ['name', 'phone', 'address'],
                required: false,
              },
              {
                model: db.TransactionPoint,
                as: 'transactionPointStart',
                attributes: ['name'],
                required: false,
              },
              {
                model: db.TransactionPoint,
                as: 'transactionPointEnd',
                attributes: ['name'],
                required: false,
              },
              {
                model: db.Warehouse,
                as: 'warehouseStart',
                attributes: ['name'],
                required: false,
              },
              {
                model: db.Warehouse,
                as: 'warehouseEnd',
                attributes: ['name'],
                required: false,
              },
              {
                model: db.Status,
                attributes: ['nameOfStatus', 'dateTransactionPointStart', 'dateWarehouseStart', 'dateWarehouseEnd', 'dateTransactionPointEnd', 'receiveDate'],
                required: false
              }
            ]
        })
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Get all packages is successfully' : 'Get all packages is unsuccessfully',
            data: JSON.stringify(response)
        })
    } catch (error) {
        reject(error)
    }
})