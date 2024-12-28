const { Model } = require('sequelize');
const db = require('../models/index');
const { raw } = require('body-parser');

const getAllClasses = async () => {
    return new Promise(async(resolve, reject) => {
        try {
            const classes = await db.Lop_hoc.findAll({ 
                attributes: ['id', 'ten_lop'],
                include: [
                  { 
                    model: db.Khoa, 
                    as: 'khoa' 
                  }, 
                  { 
                    model: db.Khoa_hoc,  // Note: Capitalize 'Course'
                    as: 'khoa_hoc', 
                  }
                ], 
                raw: true, 
                nest: true, 
              });       
            resolve(classes);
        } catch (error) {
            reject(error);    
        }
    })
};

const getAllFaculties = async () => {
    return new Promise(async(resolve, reject) => {
        try {
            const faculties = await db.Khoa.findAll();
            resolve(faculties);
        } catch (error) {
            reject(error);
        }
    })
};

module.exports = {
    getAllClasses,
    getAllFaculties,
};