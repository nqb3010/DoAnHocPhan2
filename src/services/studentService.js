
const db = require("../models/index");
require("dotenv").config();
const bcript = require("bcrypt");
const { cleanString, tachHoTen } = require("../utils/unidecodeUtils");
const faculty = require("../models/faculty");
const { raw } = require("body-parser");
const { where } = require("sequelize");
const { stat } = require("fs");

const getStudents = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const students = await db.Student.findAll({
        attributes: ["student_code", "first_name", "last_name"],
        include: [
          {  
            model: db.Class,
            attributes: ["name"],
            as: "Class",
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
        const hoten = tachHoTen(resust.full_name);
        console.log(hoten);
        const newStudent = await db.Student.create({
          student_code: resust.student_code,
          first_name: hoten.first_name,
          last_name: hoten.last_name,
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
        if(!student.full_name || !student.class_id) {
          resolve({
            status: 400,
            message: "Vui lòng nhập đầy đủ thông tin",
          });
        }
        const hoten = tachHoTen(student.full_name);
        const updateStudent = await db.Student.update(
          {
            student_code: student.student_code,
            first_name: hoten.first_name,
            last_name: hoten.last_name,
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
      // Tìm sinh viên
      const checkStudent = await db.Student.findOne({
        where: { student_code: id },
      });
  
      if (!checkStudent) {
        resolve({
          status: 400,
          message: "Sinh viên không tồn tại",
        });
      }
  
      if (checkStudent.status === 1) {
        // Nếu sinh viên có liên kết với giảng viên
        const deleteInstructor = await db.Instructor.destroy({
          where: { student_id: checkStudent.id },
        });
  
        if (!deleteInstructor) {
          resolve({
            status: 400,
            message: "Xóa giảng viên liên kết thất bại",
          });
        }
      }
  
      // Xóa sinh viên
      const deleteStudent = await db.Student.destroy({
        where: { student_code: id },
      });
  
      if (deleteStudent) {
        resolve({
          status: 200,
          message: "Xóa sinh viên thành công",
        });
      } else {
        resolve({
          status: 400,
          message: "Xóa sinh viên thất bại",
        });
      }
    } catch (error) {
      // Bắt lỗi
      reject(error);
    }
  });
};

const filterStudents = async (keyword) => {
  return new Promise(async(resolve, reject) => {
    try {
      const studentCode = parseInt(keyword);
      if(!isNaN(studentCode)) {
        const students = await db.Student.findAll({
          where: {
            student_code: studentCode,
          },
          logging: console.log
        });
        if (students.length > 0) {
          resolve(students);
        }
        resolve({
          status: 400,
          message: "Không tìm thấy sinh viên",
        });
      }
      else {
        const hoten = tachHoTen(keyword);
        const students = await db.Student.findAll({
          where: {
            first_name: { [db.Sequelize.Op.like]: `%${hoten.first_name}%` } , 
            last_name: { [db.Sequelize.Op.like]: `%${hoten.last_name}%` } ,
          },
        });
        if (students.length > 0) {
          resolve(students);
        }
        resolve({
          status: 400,
          message: "Không tìm thấy sinh viên",
        });
      }
    } catch (error) {
      reject(error);
    }
  })
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
  filterStudents,
};
