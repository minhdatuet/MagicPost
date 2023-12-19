const db = require('../models/');
const bcrypt = require('bcryptjs');
const jwr = require('jsonwebtoken');
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

exports.createService = (body) => new Promise(async(resolve, reject) => {
  try {
        const response = await db.TransactionPoint.create({
            warehouseId: body.warehouseId,
            pointLeaderId: body.pointLeaderId,
            name: body.name,
            address: body.address
        })
        resolve({
            err: response? 0 : 2,
            msg: response? 'Create transaction point is successfully!' : 'Create transaction point is failed!',
        })
    } catch (error) {
        reject(error)
    }
})

exports.getAllService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.TransactionPoint.findAll({
            attributes: ['id','name', 'address'],
            include: [
                {
                model: db.Warehouse,
                attributes: ['id', 'name'],
                required: false,
                include: [{
                    model: db.Accounts,
                    as: 'warehouseLeader',
                    attributes: ['id', 'name', 'phone', 'address'],
                    required: false,
                }]
              },
              {
                model: db.Accounts,
                as: 'pointLeader',
                attributes: ['id', 'name', 'phone', 'address'],
                required: false,
              }
            ]
        })
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Get all transaction points is successfully' : 'Get all transaction points is unsuccessfully',
            response
        })
    } catch (error) {
        reject(error)
    }
})

exports.updateService = (id, updatedData) => new Promise(async (resolve, reject) => {
    try {
        const [rowsAffected] = await db.TransactionPoint.update(updatedData, {
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