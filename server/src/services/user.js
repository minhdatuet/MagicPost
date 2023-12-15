const db = require('../models/');
const bcrypt = require('bcryptjs');
const jwr = require('jsonwebtoken');
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

exports.getUser = (phone) => new Promise(async(resolve, reject) => {
    try {
        let response  = await db.Accounts.findAll({
            where: {
              phone
            },
            raw: true,
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
            response
        })
    } catch (error) {
        reject(error)
    }
})