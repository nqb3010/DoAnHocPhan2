const { Model } = require('sequelize');
const db = require('../models/index');
const { raw } = require('body-parser');

const getAllClasses = async () => {
    return new Promise(async(resolve, reject) => {
        try {
            const classes = await db.Class.findAll({ 
                include: [
                  { 
                    model: db.Faculty, 
                    as: 'faculty' 
                  }, 
                  { 
                    model: db.Course,  // Note: Capitalize 'Course'
                    as: 'course' 
                  }
                ], 
                raw: true, 
                nest: true, 
                logging: console.log 
              });       
            resolve(classes);
        } catch (error) {
            reject(error);    
        }
    })
};

module.exports = {
    getAllClasses
};