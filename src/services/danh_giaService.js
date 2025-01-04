const { stat } = require("fs");
const db = require("../models/index");
const { raw } = require("body-parser");

const danh_giaSinhVien = async (id_phancong, heso1, heso2, heso3) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!heso1 || !heso2 || !heso3) {
                resolve({
                    status: 400,
                    message: "Vui lòng nhập đầy đủ hệ số"
                })
                return;
            }
            if(heso1 < 0 || heso1 > 10 || heso2 < 0 || heso2 > 10 || heso3 < 0 || heso3 > 10) {
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
            const checkPhanCong = await db.Phan_cong_giangvien.findOne({
                where: {
                    id: id_phancong
                }
            });
            if(!checkPhanCong) {
                resolve({
                    status: 400,
                    message: "Sinh viên chưa đi thực tập"
                })
                return;
            }
            // const checkDanhGia = await db.Danh_gia.findOne({
            //     where: {
            //         id_phancong_giangvien: id_phancong
            //     },
            //     attributes: ['id', 'id_phancong_giangvien', 'heso1', 'heso2', 'heso3', 'tongket']
            // });
            // if(checkDanhGia) {
            //     resolve({
            //         status: 400,
            //         message: "Sinh viên đã được đánh giá"
            //     })
            //     return;
            // }
            let tongdiem = (heso1 + (heso2 * 2) + (heso3 * 3)) / 6;
            let tongdiemRound = parseFloat(tongdiem.toFixed(1));
            const result = await db.Danh_gia.create({
                id_phancong_giangvien: id_phancong,
                heso1: heso1,
                heso2: heso2,
                heso3: heso3,
                tongket: tongdiemRound
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
                data: result
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
                        model: db.Phan_cong_giangvien,
                        as: 'phan_cong_giangvien',
                        where: {
                            id_giangvien: Gv
                        },
                        attributes: ['id'],
                        include: [
                            {
                                model: db.Sinh_vien,
                                as: 'sinh_vien',
                                attributes: ['id', 'ho', 'ten']
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