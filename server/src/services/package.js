const db = require('../models/');
const bcrypt = require('bcryptjs');
const jwr = require('jsonwebtoken');
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

exports.createService = (body) => new Promise(async(resolve, reject) => {
  try {
        const sender = await db.Customer.create({
                name: body.senderName,
                phone: body.senderPhone,
                address: body.senderAddress
        })
      const receiver = await db.Customer.create({
              name: body.receiverName,
              phone: body.receiverPhone,
              address: body.receiverAddress
        })
        const responsePacket = await db.Package.create({
            senderId: sender.id,
            receiverId: receiver.id,
            transactionPointStartId: body.transactionPointStartId,
            name: body.name,
            shippingCost: body.shippingCost
        
        })
        const responseStatus = await db.Status.create({
            packageId: responsePacket.id,
            nameOfStatus: 'DELIVERING',
            dateSendPackage: new Date()
        })
        resolve({
            err: responsePacket && responseStatus ? 0 : 2,
            msg: responsePacket && responseStatus ? 'Create package is successfully!' : 'Create package is failed!',
        })
    } catch (error) {
        reject(error)
    }
})

exports.getAllService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Package.findAll({
            attributes: ['id','name', 'shippingCost'],
            include: [
                {
                model: db.Customer,
                as: 'sender',
                attributes: ['id', 'name', 'phone', 'address'],
                required: false,
              },
              {
                model: db.Customer,
                as: 'receiver',
                attributes: ['id', 'name', 'phone', 'address'],
                required: false,
              },
              {
                model: db.TransactionPoint,
                as: 'transactionPointStart',
                attributes: ['id', 'name'],
                required: false,
              },
              {
                model: db.TransactionPoint,
                as: 'transactionPointEnd',
                attributes: ['id', 'name'],
                required: false,
              },
              {
                model: db.Warehouse,
                as: 'warehouseStart',
                attributes: ['id', 'name'],
                required: false,
              },
              {
                model: db.Warehouse,
                as: 'warehouseEnd',
                attributes: ['id', 'name'],
                required: false,
              },
              {
                model: db.Status,
                attributes: ['nameOfStatus', 'dateSendPackage',
                'dateSendToWarehouseStart',
                'dateWarehouseStartReceived',
                'dateSendToWarehouseEnd',
                'dateWarehouseEndReceived',
                'dateSendToPointEnd',
                'datePointEndReceived',
                'dateSendToReceiver',
                'dateReceiverReturn', 'receivedDate'],
                required: false
              }
            ]
        })
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Get all packages is successfully' : 'Get all packages is unsuccessfully',
            response
        })
    } catch (error) {
        reject(error)
    }
})