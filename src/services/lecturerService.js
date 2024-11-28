const { raw } = require("body-parser");
const db = require("../models/index");
require("dotenv").config();
const { cleanString, tachHoTen } = require("../utils/unidecodeUtils");
const bcript = require("bcrypt");

const getLecturers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const lecturers = await db.Lecturer.findAll({
        attributes: ["id", "first_name", "last_name"],
      });
      resolve(lecturers);
    } catch (error) {
      reject(error);
    }
  });
};

const getLecturerById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
        const lecturer = await db.Lecturer.findOne({
            where: {
            id: id,
            },
            include: [
            {
                model: db.User,
                as: "user",
                attributes: ["email", "role", "is_active"],
            },
            {
                model: db.Faculty,
                as: "faculty",
            },
            ],
            raw: true,
            nest: true,
        });
        delete lecturer.user_id;
        delete lecturer.faculty_id;
        resolve(lecturer);
        } catch (error) {
        reject(error);
        }
    });
};

const addLecturer = async (lecturer) => {
    return new Promise(async (resolve, reject) => {
        try {
            const mailDomain = process.env.MAIL_DOMAIN;
            const passwordDefault = process.env.PASSWORD_DEFAULT;
            const hashPassword = bcript.hashSync(passwordDefault, 10);
            const hoten = tachHoTen(lecturer.full_name);
            const checkLecturer = await db.Lecturer.findOne({
                where: {
                    email:`${cleanString(lecturer.full_name)}${mailDomain}`,
                },
            });
            if (checkLecturer) {
                resolve({
                    status: 400,
                    message: "Giảng viên đã tồn tại",
                });
            }
            const newUser = await db.User.create({
                email: `${cleanString(lecturer.full_name)}${mailDomain}`,
                password: hashPassword,
                role: "lecturer",
                is_active: 1,
            });
            const newLecturer = await db.Lecturer.create({
                first_name: hoten.first_name,
                last_name: hoten.last_name,
                phone: lecturer.phone,
                email: newUser.email,
                user_id: newUser.id,
                faculty_id: lecturer.faculty_id,
            });
            if (newLecturer && newUser !== null) {
            resolve({
                status: 200,
                message: "Thêm giảng viên thành công",
                user : {
                    email: newUser.email,
                    password: passwordDefault,
                },
                data: {
                    newLecturer,
                },
            });
            } else {
            resolve({
                status: 400,
                message: "Thêm giảng viên thất bại",
            });
            }
        } catch (error) {
        reject(error);
        }
    });
}

const updateLecturer = async (id, lecturer) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra giảng viên có tồn tại hay không
            const checkLecturer = await db.Lecturer.findOne({
                where: { lecturer_id: id },
            });

            if (!checkLecturer) {
                resolve({
                    status: 400,
                    message: "Không tìm thấy giảng viên",
                });
                return; // Kết thúc hàm nếu không tìm thấy
            }

            // Kiểm tra dữ liệu đầu vào
            if (
                !lecturer.first_name ||
                !lecturer.last_name ||
                !lecturer.department ||
                !lecturer.phone
            ) {
                resolve({
                    status: 400,
                    message: "Thông tin không hợp lệ. Vui lòng kiểm tra lại.",
                });
                return;
            }

            // Cập nhật thông tin giảng viên
            const [updatedRows] = await db.Lecturer.update(
                {
                    first_name: lecturer.first_name,
                    last_name: lecturer.last_name,
                    department: lecturer.department,
                    phone: lecturer.phone,
                },
                {
                    where: { lecturer_id: id },
                }
            );

            if (updatedRows > 0) {
                resolve({
                    status: 200,
                    message: "Cập nhật thông tin giảng viên thành công",
                });
            } else {
                resolve({
                    status: 400,
                    message: "Cập nhật thông tin giảng viên thất bại",
                });
            }
        } catch (error) {
            // Xử lý lỗi và trả về thông báo
            reject({
                status: 500,
                message: "Đã xảy ra lỗi khi cập nhật thông tin giảng viên",
                error: error.message,
            });
        }
    });
};

const deleteLecturer = async (id) => {
    try {
        // Kiểm tra giảng viên có tồn tại không
        const checkLecturer = await db.Lecturer.findOne({
            where: { lecturer_id: id },
        });

        if (!checkLecturer) {
            return {
                status: 400,
                message: "Không tìm thấy giảng viên",
            };
        }

        // Thực hiện xóa giảng viên
        const deletedLecturer = await db.Lecturer.destroy({
            where: { lecturer_id: id },
        });

        if (deletedLecturer > 0) {
            return {
                status: 200,
                message: "Xóa giảng viên thành công",
            };
        } else {
            return {
                status: 400,
                message: "Xóa giảng viên thất bại",
            };
        }

    } catch (error) {
        // Xử lý lỗi bất ngờ
        console.error("Lỗi khi xóa giảng viên:", error);
        throw {
            status: 500,
            message: "Đã xảy ra lỗi trong quá trình xử lý",
            error: error.message,
        };
    }
};

const getstudentsbyLecturerId = async (lecturerId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const checkLecturer = await db.Lecturer.findOne({
                where: { id: lecturerId },
            });
            if (!checkLecturer) {
                resolve({
                    status: 400,
                    message: "Không tìm thấy giảng viên",
                });
                return;
            }
            const students = await db.Instructor.findAll({
                where: { lecturer_id: lecturerId }, // Lọc theo giảng viên
                include: [
                  {
                    model: db.Student,
                    as: 'student',
                    attributes: ['student_code', 'first_name', 'last_name'], // Lấy thông tin sinh viên
                    include: [
                      {
                        model: db.Class,
                        as: 'class',
                        attributes: ['id','name'], // Lấy tên lớp
                      }
                    ]
                  }
                ],
                raw: true,
                nest: true,
              });
                resolve(students);
              
        } catch (error) {
            reject(error);
        }
    })
};


module.exports = {
    getLecturers,
    getLecturerById,
    addLecturer,
    updateLecturer,
    deleteLecturer,
    getstudentsbyLecturerId,
    };