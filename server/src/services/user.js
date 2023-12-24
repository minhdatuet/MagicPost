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
            // raw: true,
            attributes: ['id','name', 'phone', 'address', 'accountType'],
            include: [
            {
                model: db.Warehouse,
                attributes: ['id','name', 'address'],
                required: false,
            },
            {
                model: db.TransactionPoint,
                attributes: ['id','name', 'address'],
                required: false,
            },
            {
                model: db.Employee,
                required: false,
                attributes: ['id'],
                include: [{
                    model: db.Warehouse,
                    attributes: ['id','name', 'address']
                },
                {
                    model: db.TransactionPoint,
                    attributes: ['id','name', 'address'],
                    include: [{
                        model: db.Warehouse,
                        attributes: ['id','name', 'address']
                    }]
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

exports.getAllService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Accounts.findAll({
            // raw: true,
            attributes: ['id','name', 'phone', 'address', 'accountType'],
            include: [
            {
                model: db.Warehouse,
                attributes: ['id','name', 'address'],
                required: false,
            },
            {
                model: db.TransactionPoint,
                attributes: ['id','name', 'address'],
                required: false,
            },
            {
                model: db.Employee,
                required: false,
                attributes: ['id'],
                include: [{
                    model: db.Warehouse,
                    attributes: ['id','name', 'address']
                },
                {
                    model: db.TransactionPoint,
                    attributes: ['id','name', 'address'],
                    include: [{
                        model: db.Warehouse,
                        attributes: ['id','name', 'address']
                    }]
                }]
            }]
        })
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Get all users is successfully' : 'Get all users is unsuccessfully',
            response
        })
    } catch (error) {
        reject(error)
    }
})
  
  exports.updateService = (id, updatedData) => new Promise(async (resolve, reject) => {
    try {
        const [rowsAffected] = await db.Accounts.update(updatedData, {
            where: { id }
        });
        const successMessage = 'Update is successful';
        const errorMessage = 'Update is failed';
        const response = {
            err: rowsAffected> 0 ? 0 : 2,
            msg: rowsAffected> 0 ? successMessage : errorMessage,
        };
  
        resolve(response);
    } catch (error) {
        reject(error);
    }
  });