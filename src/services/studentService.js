
const db = require("../models/index");
require("dotenv").config();
const bcript = require("bcrypt");
const { cleanString } = require("../utils/unidecodeUtils");
const faculty = require("../models/faculty");
const { raw } = require("body-parser");

const getStudents = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const students = await db.Student.findAll({
        attributes: ["student_code", "first_name", "last_name"],
      });
      resolve(students);
    } catch (error) {
      reject(error);
    }
  });
};

const getStudentById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const student = await db.Student.findOne({
        where: {
          student_code: id,
        },
        include: [
          {
            model: db.Class,
            attributes: ["name"],
            as: "class",
            include: [
              {
                model: db.Faculty,
                attributes: ["name"],
                as: "faculty",
              },
            ],
          },
        ],
        raw: true,
        nest: true,
      });        
      if (student === null) {
        resolve({
          status: 400,
          message: "Sinh viên không tồn tại",
        });
      }
      resolve(student);
    } catch (error) {
      reject(error);
    }
  });
};

const addStudent = async (resust) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkStudent = await db.Student.findOne({
        where: {
          student_code: resust.student_code,
        },
      });
      if (checkStudent) {
        resolve({
          status: 400,
          message: "Sinh viên đã tồn tại",
        });
      } else {
        const newStudent = await db.Student.create({
          student_code: resust.student_code,
          first_name: resust.first_name,
          last_name: resust.last_name,
          class_id: resust.class_id,
          status: 0,
        });
        if (newStudent !== null) {
          resolve({
            status: 200,
            message: "Thêm sinh viên thành công",
            data: newStudent,
          });
        } else {
          resolve({
            status: 400,
            message: "Thêm sinh viên thất bại",
            data: newStudent,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateStudent = async (id, student) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkStudent = await db.Student.findOne({
        where: {
          student_code: id,
        },
      });
      if (checkStudent) {
        const updateStudent = await db.Student.update(
          {
            student_code: student.student_code,
            first_name: student.first_name,
            last_name: student.last_name,
            class_id: student.class_id,
          },
          {
            where: {
              student_code: id,
            },
          }
        );
        if (updateStudent != 0) {
          resolve({
            status: 200,
            message: "Cập nhật thông tin sinh viên thành công",
          });
        } else {
          resolve({
            status: 400,
            message: "Cập nhật thông tin sinh viên thất bại",
          });
        }
      } else {
        resolve({
          status: 400,
          message: "Sinh viên không tồn tại",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteStudent = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkStudent = await db.Student.findOne({
        where: {
          student_code: id,
        },
      });
      if (checkStudent) {
        const deleteStudent = await db.Student.destroy({
          where: {
            student_code: id,
          },
        });
        if (deleteStudent) {
          resolve({
            status: 200,
            message: "Xóa sinh viên thành công",
            data: deleteStudent
          });
        } else {
          resolve({
            status: 400,
            message: "Xóa sinh viên thất bại",
            data: deleteStudent
          });
        }
      } else {
        resolve({
          status: 400,
          message: "Sinh viên không tồn tại",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
};
