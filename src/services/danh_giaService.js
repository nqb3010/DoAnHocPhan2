const { stat } = require("fs");
const db = require("../models/index");
const { raw } = require("body-parser");
const { where } = require("sequelize");

const danh_giaSinhVien = async (Danhgia) => {
    return new Promise(async(resolve, reject) => {
        try {
            let messages = [];
            let hasSuccess = false;
            await Promise.all(Danhgia.map(async (element) => {
                const sinhvien = await db.Sinh_vien.findOne({
                    where: {
                        ma_sinhvien: element.Msv
                    }
                });
                if(!sinhvien) {
                    messages.push(`Không tìm thấy sinh viên với mã ${element.Msv}`);
                    return;
                }
                const checkGVPT = await db.Giangvien_phutrach.findOne({
                    where: {
                        id_sinhvien: sinhvien.id
                    }
                });
                if(!checkGVPT) {
                    messages.push(`Sinh viên ${element.Msv} chưa được phân công giảng viên phụ trách`);
                    return;
                }
                const checkDanhGia = await db.Danh_gia.findOne({
                    where: {
                        id_giangvien_phutrach: checkGVPT.id
                    }
                });
                if(!checkDanhGia) {
                    messages.push(`Sinh viên ${element.Msv} không tồn tại`);
                    return;
                }
                diemtong = parseFloat(element.DiemCongTy)*0.65 + parseFloat(element.DiemGiangVien)*0.35;
                diemtongReal = diemtong.toFixed(1);
                const result = await db.Danh_gia.update({
                    danhgiacuacongty: element.DiemCongTy,
                    danhgiacuagiangvien: element.DiemGiangVien,
                    tongket:diemtongReal
                },
                {
                    where: {
                        id_giangvien_phutrach: checkGVPT.id
                    }
                });
                if(result) {
                    hasSuccess = true;
                }

        }))
        if(hasSuccess) {
            resolve({
                status: 200,
                message: "Đánh giá thành công"
            })
        } else {
            resolve({
                status: 400,
                message: messages
            })
        }

        } catch (error) {
            reject(error);
        }
    })
}

const getDanhGia = async (Gv) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!Gv) {
                resolve({
                    status: 400,
                    message: "Vui lòng nhập id giảng viên"
                })
                return;
            }
            const checkGv = await db.Giang_vien.findOne({
                where: {
                    id: Gv
                }
            });
            if(!checkGv) {
                resolve({
                    status: 400,
                    message: "Giảng viên không tồn tại"
                })
                return;
            }
            const result = await db.Danh_gia.findAll({
                include: [
                    {
                        model: db.Giangvien_phutrach,
                        as: 'giangvien_phutrach',
                        where: {
                            id_giangvien: Gv
                        },
                        attributes: ['id'],
                        include: [
                            {
                                model: db.Sinh_vien,
                                as: 'sinh_vien',
                                attributes: ['id','ma_sinhvien', 'ho', 'ten']
                            }
                        ]
                    }
                ],
                raw: true,
                nest: true,
            },
            );
            resolve({
                status: 200,
                data: result
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    danh_giaSinhVien,
    getDanhGia
}