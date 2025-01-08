const { raw } = require('body-parser');
const db = require('../models/index');

const assignLecturer = async (item) => {
    return new Promise(async(resolve, reject) => {
        try {
            let messages = [];
            let hasSuccess = false;

            await Promise.all(item.map(async (element) => {
                const sinhvien = await db.Sinh_vien.findOne({
                    where: {
                        ma_sinhvien: element.ma_sinhvien
                    }
                });

                if (!sinhvien) {
                    messages.push(`Không tìm thấy sinh viên với mã ${element.ma_sinhvien}`);
                    return;
                }

                // Check if student is currently in an internship for this period
                const currentInternship = await db.Thuc_tap.findOne({
                    where: {
                        id_sinhvien: sinhvien.id,
                        id_dotthuctap: element.id_dotthuctap
                    }
                });

                if (currentInternship) {
                    messages.push(`Sinh viên ${element.ma_sinhvien} đã đang thực tập trong đợt này`);
                    return;
                }

                // Check for unfinished internships from previous periods
                const unfinishedInternship = await db.Thuc_tap.findOne({
                    where: {
                        id_sinhvien: sinhvien.id,
                        trang_thai: {
                            [db.Sequelize.Op.ne]: "đã hoàn thành"
                        }
                    }
                });

                if (unfinishedInternship) {
                    messages.push(`Sinh viên ${element.ma_sinhvien} còn đợt thực tập chưa hoàn thành`);
                    return;
                }

                // If all checks pass, create new internship
                const thuctap = await db.Thuc_tap.create({
                    id_sinhvien: sinhvien.id,
                    id_dotthuctap: element.id_dotthuctap,
                    id_congty: element.id_congty,
                    trang_thai: "đang thực tập"
                });

                if (thuctap) {
                    const GVPT = await db.Giangvien_phutrach.create({
                        id_sinhvien: sinhvien.id,
                        id_giangvien: element.id_giangvien,
                        id_thuctap: thuctap.id
                    });
                    
                    await db.Danh_gia.create({
                        id_giangvien_phutrach: GVPT.id,
                    });
                    
                    hasSuccess = true;
                    messages.push(`Phân công giảng viên thành công cho sinh viên ${element.ma_sinhvien}`);
                }
            }));

            resolve({
                status: hasSuccess ? 200 : 400,
                message: messages
            });
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    assignLecturer
};