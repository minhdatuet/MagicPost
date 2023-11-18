const db = require('../models/');
const bcrypt = require('bcryptjs');
const jwr = require('jsonwebtoken');
require('dotenv').config();
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

