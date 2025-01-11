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
                    as: 'khoa' ,
                    attributes: ['ten_khoa'],
                  }, 
                  { 
                    model: db.Khoa_hoc,  // Note: Capitalize 'Course'
                    as: 'khoa_hoc', 
                    attributes: ['ten_khoahoc'],
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

const getCourses = async () => {
    return new Promise(async(resolve, reject) => {
        try {
            const courses = await db.Khoa_hoc.findAll();
            resolve(courses);
        } catch (error) {
            reject(error);
        }
    })
};

const getCompany = async () => {
    return new Promise(async(resolve, reject) => {
        try {
            const companies = await db.Cong_ty.findAll();
            resolve(companies);
        } catch (error) {
            reject(error);
        }
    })
};

const getInternship = async () => {
    return new Promise(async(resolve, reject) => {
        try {
            const internships = await db.Dot_thuctap.findAll();
            resolve(internships);
        } catch (error) {
            reject(error);
        }
    })
}

const getLecturersbyFaculty = async (faculty) => {
    return new Promise(async(resolve, reject) => {
        try {
            const lecturers = await db.Giang_vien.findAll({
                where: { id_khoa: faculty },
                attributes: ['id', 'ho', 'ten'],
                raw: true,
                nest: true,
            });
            resolve(lecturers);
        } catch (error) {
            reject(error);
        }
    })
}

const getClassbyFacultyandCourses = async (faculty, courses) => {
    return new Promise(async(resolve, reject) => {
        try {
            const classes = await db.Lop_hoc.findAll({
                where: { id_khoa: faculty, id_khoahoc: courses },
                attributes: ['id', 'ten_lop'],
                raw: true,
                nest: true,
            });
            resolve(classes);
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    getAllClasses,
    getAllFaculties,
    getCourses,
    getCompany,
    getInternship,
    getLecturersbyFaculty,
    getClassbyFacultyandCourses
};