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
            const faculties = await db.Faculty.findAll();
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