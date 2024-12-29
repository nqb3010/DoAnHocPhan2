const { raw } = require("body-parser");
const db = require("../models/index");
require("dotenv").config();
const { cleanString, tachHoTen } = require("../utils/unidecodeUtils");
const bcript = require("bcrypt");

const getLecturers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const lecturers = await db.Giang_vien.findAll({
        include: [
            {
                model: db.Khoa,
                as: "khoa",
            },
            ],
        raw: true,
        nest: true,
      });
      delete lecturers.id_nguoidung;
      resolve(lecturers);
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
            const checkLecturer = await db.Giang_vien.findOne({
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
            const newUser = await db.Nguoi_dung.create({
                email: `${cleanString(lecturer.full_name)}${mailDomain}`,
                mat_khau: hashPassword,
                vai_tro: "giang_vien",
                trang_thai: 1,
            });
            const newLecturer = await db.Giang_vien.create({
                ho: hoten.first_name,
                ten: hoten.last_name,
                sdt: lecturer.phone,
                email: newUser.email,
                id_nguoidung: newUser.id,
                id_khoa: lecturer.faculty_id,
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
            const checkLecturer = await db.Giang_vien.findOne({
                where: { id: id },
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
                !lecturer.full_name ||
                !lecturer.phone 
            ) {
                resolve({
                    status: 400,
                    message: "Thông tin không hợp lệ. Vui lòng kiểm tra lại.",
                });
                return;
            }

            // Tách họ và tên
            const hoten = tachHoTen(lecturer.full_name);
            mailDomain = process.env.MAIL_DOMAIN;
            // Cập nhật thông tin giảng viên
            const [updatedRows] = await db.Giang_vien.update(
                {
                    ho: hoten.first_name,
                    ten: hoten.last_name,
                    email : `${cleanString(lecturer.full_name)}${mailDomain}`,
                    sdt: lecturer.phone,
                },
                {
                    where: { id: id },
                }
            );

            if (updatedRows > 0) {

                const [updatedUser] = await db.Nguoi_dung.update(
                    {
                        email: `${cleanString(lecturer.full_name)}${mailDomain}`,
                    },
                    {
                        where: { id: checkLecturer.id_nguoidung },
                    }
                );
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
        const checkLecturer = await db.Giang_vien.findOne({
            where: { id: id },
        });

        if (!checkLecturer) {
            return {
                status: 400,
                message: "Không tìm thấy giảng viên",
            };
        }
        const checkPhanCong = await db.Phan_cong_giangvien.findOne({
            where: { id_giangvien: id },
        });
        if (checkPhanCong) {
            return {
                status: 400,
                message: "Giảng viên đã được phân công không thể xóa",
            };
        }
        // Thực hiện xóa giảng viên
        const deletedLecturer = await db.Giang_vien.destroy({
            where: { id: id },
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
            const checkLecturer = await db.Giang_vien.findOne({
                where: { id: lecturerId },
            });
            if (!checkLecturer) {
                resolve({
                    status: 400,
                    message: "Không tìm thấy giảng viên",
                });
                return;
            }
            const students = await db.Phan_cong_giangvien.findAll({
                where: { id_giangvien: lecturerId }, // Lọc theo giảng viên
                attributes: ['id'], // Lấy id sinh viên, id đợt thực tập, id công ty
                include: [
                  {
                    model: db.Sinh_vien,
                    as: 'sinh_vien',
                    attributes: ['ma_sinhvien', 'ho', 'ten'], // Lấy thông tin sinh viên
                    include: [
                      {
                        model: db.Lop_hoc,
                        as: 'lop_hoc',
                        attributes: ['id','ten_lop'], // Lấy tên lớp
                      }
                    ]
                  },
                  {
                    model: db.Dot_thuctap,
                    as: 'dot_thuc_tap',
                    attributes: ['id','ten_dot'], // Lấy tên đợt thực tập

                  },
                  {
                    model: db.Cong_ty,
                    as: 'cong_ty',
                    attributes: ['id','ten_congty'], // Lấy tên công ty
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
    addLecturer,
    updateLecturer,
    deleteLecturer,
    getstudentsbyLecturerId,
    };