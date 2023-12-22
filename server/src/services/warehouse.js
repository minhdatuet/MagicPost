const db = require('../models/');
const bcrypt = require('bcryptjs');
const jwr = require('jsonwebtoken');
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const { Op } = require('sequelize');

exports.createService = (body) => new Promise(async(resolve, reject) => {
  try {
        const response = await db.Warehouse.create({
            name: body.name,
            address: body.address,
            leaderId: body.leaderId
        })
        resolve({
            err: response? 0 : 2,
            msg: response? 'Create warehouse is successfully!' : 'Create warehouse is failed!',
        })
    } catch (error) {
        reject(error)
    }
})

exports.getAllService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Warehouse.findAll({
            attributes: ['id','name', 'address'],
            include: [
              {
                model: db.Accounts,
                as: 'warehouseLeader',
                attributes: ['id', 'name', 'phone', 'address'],
                required: false,
              }
            ]
        })
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Get all warehouses is successfully' : 'Get all warehouses is unsuccessfully',
            response
        })
    } catch (error) {
        reject(error)
    }
})

exports.deleteService = (id) => new Promise(async(resolve, reject) => {
    try {

    const points = await db.TransactionPoint.findAll({
        where: {warehouseId: id}
      })
      for (let i = 0; i < points.length; i++) {
        const responsePointStaff = await db.Employee.destroy({
            where: {transactionPointId: points[i].id }
          })
          const responseStatus = await db.Status.destroy({
            where: {packageId: id}
          })

            
            const responseSender = await db.Customer.destroy({
              where: {id: package.senderId}
            })
            const responseReceiver = await db.Customer.destroy({
              where: {id: package.receiverId}
            })
          const responsePackage = await db.Package.destroy({
            where: {
                [Op.or]: [
                    {
                      transactionPointStartId: points[i].id,
                    },
                    {
                        transactionPointEndId: points[i].id,
                    }
                ],
                 }
          })
      }
    const responseEmployee = await db.Employee.destroy({
        where: {warehouseId: id}
      })
      const responsePoint = await db.TransactionPoint.destroy({
        where: {warehouseId: id}
      })
        const responseWarehouse = await db.Warehouse.destroy({
          where: {id}
        })
    
        resolve({
          err: responsePoint && responseWarehouse && responseEmployee ? 0 : 2,
          msg: responsePoint && responseWarehouse && responseEmployee ? 'Delete is successfully' : `Can't find this id`,
        })
  
      } catch (error) {
        reject(error)
    }
  })
  
  exports.updateService = (id, updatedData) => new Promise(async (resolve, reject) => {
    try {
        const [rowsAffected] = await db.Warehouse.update(updatedData, {
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