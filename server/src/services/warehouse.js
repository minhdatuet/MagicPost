const db = require('../models/');
const bcrypt = require('bcryptjs');
const jwr = require('jsonwebtoken');
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

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