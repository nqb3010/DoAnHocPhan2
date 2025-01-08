
const db = require("../models/index");
require("dotenv").config();
const bcript = require("bcrypt");
const { cleanString, tachHoTen } = require("../utils/unidecodeUtils");
const { raw } = require("body-parser");
const { where } = require("sequelize");
const { stat } = require("fs");

const getStudents = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const students = await db.Sinh_vien.findAll({
        attributes: ["ma_sinhvien", "ho", "ten"],
        include: [
          {
            model: db.Lop_hoc,
            attributes: ["ten_lop"],
            as: "lop_hoc",
            include: [
              {
                model: db.Khoa,
                attributes: ["ten_khoa"],
                as: "khoa",
              },
            ],
          },
          {
            model: db.Giangvien_phutrach,
            as: "giangvien_phutrach",
            // Thêm required: false để sử dụng LEFT JOIN thay vì INNER JOIN
            required: false,
            // Thêm separate: true để tránh nhân bản dữ liệu
            separate: true,
            include: [
              {
                model: db.Giang_vien,
                attributes: ["ho", "ten"],
                as: "giang_vien",
              },
            ],
          },
          {
            model: db.Thuc_tap,
            as: "thuc_tap",
            // Thêm required: false để sử dụng LEFT JOIN
            required: false,
            // Thêm separate: true để tránh nhân bản dữ liệu
            separate: true,
            include: [
              {
                model: db.Dot_thuctap,
                attributes: ["ten_dot","loai"],
                as: "dot_thuc_tap",
              },
              {
                model: db.Cong_ty,
                attributes: ["ten_congty"],
                as: "cong_ty",
              },
            ],
          },
        ],
        raw: false,
        nest: true,
      });

      resolve(students);
    } catch (error) {
      reject(error);
    }
  });
};

const addStudent = async (resust) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkStudent = await db.Sinh_vien.findOne({
        where: {
          ma_sinhvien: resust.student_code,
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
        const newStudent = await db.Sinh_vien.create({
          ma_sinhvien: resust.student_code,
          ho: hoten.first_name,
          ten: hoten.last_name,
          id_lophoc: resust.class_id,
          trang_thai: 0,
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
      const checkStudent = await db.Sinh_vien.findOne({
        where: {
          ma_sinhvien: id,
        },
      });
      if (checkStudent) {
        if(!student.full_name || !student.class_id || !id) {
          resolve({
            status: 400,
            message: "Vui lòng nhập đầy đủ thông tin",
          });
        }
        const hoten = tachHoTen(student.full_name);
        const updateStudent = await db.Sinh_vien.update(
          {
            ma_sinhvien: student.student_code,
            ho: hoten.first_name,
            ten: hoten.last_name,
            id_lophoc: student.class_id,
          },
          {
            where: {
              ma_sinhvien: id,
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
      const checkStudent = await db.Sinh_vien.findOne({
        where: { ma_sinhvien: id },
      });
  
      if (!checkStudent) {
        resolve({
          status: 400,
          message: "Sinh viên không tồn tại",
        });
      }
  
      if (checkStudent.trang_thai === 1) {
        // Nếu sinh viên có liên kết với giảng viên
        const deleteInstructor = await db.Phan_cong_giangvien.destroy({
          where: { id_sinhvien: checkStudent.id },
        });
  
        if (!deleteInstructor) {
          resolve({
            status: 400,
            message: "Xóa giảng viên liên kết thất bại",
          });
        }
      }
  
      // Xóa sinh viên
      const deleteStudent = await db.Sinh_vien.destroy({
        where: { ma_sinhvien: id },
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

const getStudentsWithoutInternship = async (khoaId, dotThuctapId) => {
  try {
    const students = await db.Sinh_vien.findAll({
      attributes: [
        'id',
        'ma_sinhvien',
        'ho',
        'ten',
        'trang_thai'
      ],
      include: [
        {
          model: db.Lop_hoc,
          as: 'lop_hoc',
          attributes: ['ten_lop'],
          required: true,
          include: [
            {
              model: db.Khoa,
              as: 'khoa',
              attributes: ['ten_khoa'],
              where: {
                id: khoaId
              }
            }
          ]
        },
        {
          model: db.Giangvien_phutrach,
          as: 'giangvien_phutrach',
          attributes: ['id', 'id_sinhvien', 'id_giangvien'],
          required: false,
          include: [
            {
              model: db.Giang_vien,
              as: 'giang_vien',
              attributes: ['id', 'ho', 'ten']
            }
          ],
          // Add separate: true to get an array of supervisors instead of duplicating records
          separate: true
        }
      ],
      where: {
        [db.Sequelize.Op.and]: [
          // Not in current internship period
          db.Sequelize.literal(`
            sinh_vien.id NOT IN (
              SELECT DISTINCT id_sinhvien 
              FROM thuc_tap 
              WHERE id_dotthuctap = ${dotThuctapId}
            )
          `),
          // Not completed internship in other periods
          db.Sequelize.literal(`
            sinh_vien.id NOT IN (
              SELECT DISTINCT tt.id_sinhvien
              FROM thuc_tap tt
              INNER JOIN dot_thuctap dt ON tt.id_dotthuctap = dt.id
              WHERE dt.id != ${dotThuctapId}
              AND tt.trang_thai = 'Đang thực tập'
            )
          `)
        ]
      },
      // order: [['ma_sinhvien', 'ASC']],
      distinct: true,
      raw: false // Changed to false to allow separate loading of associations
    });

    // Transform the results to match the expected format
    const formattedStudents = students.map(student => {
      const plainStudent = student.get({ plain: true });
      return {
        ...plainStudent,
        giangvien_phutrach: plainStudent.giangvien_phutrach[0] || null // Take the first supervisor if exists
      };
    });

    return formattedStudents;
  } catch (error) {
    throw new Error(`Error getting students without internship: ${error.message}`);
  }
};

module.exports = {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentsWithoutInternship,
};
