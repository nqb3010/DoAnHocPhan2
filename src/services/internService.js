const { where } = require("sequelize");
const db = require("../models/index");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const getInterns = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const interns = await db.Dot_thuctap.findAll({
        where: {
          trang_thai: 1,
        },
      });

      // Format dates in the result
      const formattedInterns = interns.map((intern) => {
        // Create a function to format date
        const formatDate = (dateString) => {
          const date = new Date(dateString);
          const day = date.getDate().toString().padStart(2, "0");
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const year = date.getFullYear();
          return `${day}-${month}-${year}`;
        };

        return {
          ...intern,
          bat_dau: formatDate(intern.bat_dau),
          ket_thuc: formatDate(intern.ket_thuc),
        };
      });

      resolve(formattedInterns);
    } catch (error) {
      reject(error);
    }
  });
};

const addIntern = async (intern) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra dữ liệu đầu vào
      if (
        !intern.name ||
        !intern.start_date ||
        !intern.end_date ||
        !intern.semester ||
        !intern.loai
      ) {
        resolve({
          status: 400,
          message: "Vui Lòng Nhập Đầy Đủ Thông Tin",
        });
        return;
      }
      console.log(intern);
      // Chuyển đổi ngày từ dd-mm-yyyy sang yyyy-mm-dd
      const startDate = dayjs(intern.start_date, "DD-MM-YYYY", true).format(
        "YYYY-MM-DD"
      );
      console.log("Start date:", startDate);

      const endDate = dayjs(intern.end_date, "DD-MM-YYYY", true).format(
        "YYYY-MM-DD"
      );
      console.log("End date:", endDate);
      // Thêm dữ liệu vào cơ sở dữ liệu
      const newIntern = await db.Dot_thuctap.create({
        ten_dot: intern.name,
        bat_dau: startDate,
        ket_thuc: endDate,
        hoc_ky: intern.semester,
        loai: intern.loai,
        trang_thai: "Đang mở",
      });

      // Kiểm tra kết quả và trả về phản hồi
      if (newIntern != null) {
        resolve({
          status: 200,
          message: "Thêm Đợt Thực Tập Thành Công",
          data: newIntern,
        });
      } else {
        resolve({
          status: 400,
          message: "Thêm Đợt Thực Tập Thất Bại",
          data: newIntern,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateIntern = async (internId, intern) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkIntern = await db.Dot_thuctap.findOne({
        where: {
          id: internId,
        },
      });
      if (!checkIntern) {
        resolve({
          status: 400,
          message: "Không Tìm Thấy Đợt Thực Tập",
        });
      } else {
        if (
          !intern.name ||
          !intern.start_date ||
          !intern.end_date ||
          !intern.semester ||
          !intern.loai
        ) {
          resolve({
            status: 400,
            message: "Vui Lòng Nhập Đầy Đủ Thông Tin",
          });
        }
        const updatedIntern = await db.Dot_thuctap.update(
          {
            ten_dot: intern.name,
            bat_dau: intern.start_date,
            ket_thuc: intern.end_date,
            hoc_ky: intern.semester,
            loai: intern.loai,
          },
          {
            where: {
              id: internId,
            },
          }
        );
        if (updatedIntern == 1) {
          resolve({
            status: 200,
            message: "Cập Nhật Đợt Thực Tập Thành Công",
          });
        } else {
          resolve({
            status: 400,
            message: "Cập Nhật Đợt Thực Tập Thất Bại",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteIntern = async (internId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkIntern = await db.Dot_thuctap.findOne({
        where: {
          id: internId,
        },
      });
      if (!checkIntern) {
        resolve({
          status: 400,
          message: "Không Tìm Thấy Đợt Thực Tập",
        });
      } else {
        checkPhancong = await db.Thuc_tap.findAll({
          where: {
            id_dotthuctap: internId,
          },
        });
        if (checkPhancong.length > 0) {
          resolve({
            status: 400,
            message: "Không Thể Xóa Đợt Thực Tập Đã Được Phân Công",
          });
        }
        const deletedIntern = await db.Dot_thuctap.destroy({
          where: {
            id: internId,
          },
        });
        if (deletedIntern == 1) {
          resolve({
            status: 200,
            message: "Xóa Đợt Thực Tập Thành Công",
          });
        } else {
          resolve({
            status: 400,
            message: "Xóa Đợt Thực Tập Thất Bại",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getInterns,
  addIntern,
  updateIntern,
  deleteIntern,
};
