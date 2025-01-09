const { stat } = require("fs");
const db = require("../models/index");
const { raw } = require("body-parser");
const { where } = require("sequelize");

const danh_giaSinhVien = async (id_phancong, heso1, heso2) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!heso1 || !heso2) {
                resolve({
                    status: 400,
                    message: "Vui lòng nhập đầy đủ hệ số"
                })
                return;
            }
            if(heso1 < 0 || heso1 > 10 || heso2 < 0 || heso2 > 10) {
                resolve({
                    status: 400,
                    message: "Hệ số không hợp lệ"
                })
                return;
            }
            if(!id_phancong) {
                resolve({
                    status: 400,
                    message: "Vui lòng nhập id phân công"
                })
                return;
            }
            // tính tổng điểm hệ số 1 lấy 65% hệ số 2 lấy 35%
            let tongdiem = heso1 * 0.65 + heso2 * 0.35;
            console.log(tongdiem);
            let tongdiemRound = parseFloat(tongdiem.toFixed(1));
            console.log(tongdiemRound);
            const result = await db.Danh_gia.update({
                id_giangvien_phutrach: id_phancong,
                danhgiacuacongty: heso1,
                danhgiacuagiangvien: heso2,
                tongket: tongdiemRound
            },
            {
                where: {
                    id_giangvien_phutrach: id_phancong
                }
            });

            if(result) {
                await db.Phan_cong_giangvien.update({
                    trang_thai: "đã hoàn thành"
                }, {
                    where: {
                        id: id_phancong
                    }
                });
            }
            resolve({
                status: 200,
                message: "Đánh giá thành công",
                data: {
                    id_phancong_giangvien: id_phancong,
                    heso1: heso1,
                    heso2: heso2,
                    heso3: heso3,
                    tongket: tongdiemRound
                }
            })
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