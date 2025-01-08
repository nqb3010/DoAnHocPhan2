const { raw } = require('body-parser');
const db = require('../models/index');

const assignLecturer = async (item) => {
    return new Promise(async(resolve, reject) => {
        try {
            console.log(item);
            item.forEach(async (element) => {
                const sinhvien = await db.Sinh_vien.findOne({
                    where: {
                        ma_sinhvien: element.ma_sinhvien
                    }
                });
                const thuctap = await db.Thuc_tap.create({
                    id_sinhvien: sinhvien.id,
                    id_dotthuctap: element.id_dotthuctap,
                    id_congty: element.id_congty,
                    trang_thai: "đang thực tập"
                });
                if(thuctap) {
                    await db.Giangvien_phutrach.create({
                        id_sinhvien: sinhvien.id,
                        id_giangvien: element.id_giangvien,
                        id_thuctap : thuctap.id
                    });
                    await db.Danh_gia.create({
                        id_giangvien_phutrach: thuctap.id,
                    });
                }
                
            });
            resolve({
                status: 200,
                message: "Phân công giảng viên thành công"
            });
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    assignLecturer
};