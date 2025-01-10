const { stat } = require("fs");
const db = require("../models/index");
const { raw } = require("body-parser");
const { where } = require("sequelize");

const danh_giaSinhVien = async (input) => {
    // Convert single object to array if necessary
    const Danhgia = Array.isArray(input) ? input : [input];

    // Input validation
    if (!Danhgia.length) {
        throw new Error('Dữ liệu đánh giá không hợp lệ');
    }

    // Validate required fields
    const validateInput = (item) => {
        return item.Msv && item.DiemCongTy && item.DiemGiangVien;
    };

    // Validate if all items have required fields
    if (!Danhgia.every(validateInput)) {
        throw new Error('Dữ liệu thiếu thông tin. Yêu cầu: Msv, DiemCongTy, DiemGiangVien');
    }

    const validateScores = (score) => {
        const numScore = parseFloat(score);
        return !isNaN(numScore) && numScore >= 0 && numScore <= 10;
    };

    // Process each evaluation
    const processEvaluation = async (element) => {
        // Validate input scores
        if (!validateScores(element.DiemCongTy) || !validateScores(element.DiemGiangVien)) {
            return {
                success: false,
                message: `Điểm đánh giá không hợp lệ cho sinh viên ${element.Msv}. Điểm phải từ 0-10`
            };
        }

        // Find student
        const sinhvien = await db.Sinh_vien.findOne({
            where: { ma_sinhvien: element.Msv }
        });
        
        if (!sinhvien) {
            return {
                success: false,
                message: `Không tìm thấy sinh viên với mã ${element.Msv}`
            };
        }

        // Find supervising lecturer
        const giangvienPhutrach = await db.Giangvien_phutrach.findOne({
            where: { id_sinhvien: sinhvien.id }
        });

        if (!giangvienPhutrach) {
            return {
                success: false,
                message: `Sinh viên ${element.Msv} chưa được phân công giảng viên phụ trách`
            };
        }

        // Find existing evaluation
        const danhGia = await db.Danh_gia.findOne({
            where: { id_giangvien_phutrach: giangvienPhutrach.id }
        });

        if (!danhGia) {
            return {
                success: false,
                message: `Không tìm thấy bảng đánh giá cho sinh viên ${element.Msv}`
            };
        }

        // Calculate final score
        const COMPANY_WEIGHT = 0.65;
        const LECTURER_WEIGHT = 0.35;
        const diemtong = (parseFloat(element.DiemCongTy) * COMPANY_WEIGHT) + 
                        (parseFloat(element.DiemGiangVien) * LECTURER_WEIGHT);
        const diemtongReal = diemtong.toFixed(1);

        // Update evaluation
        const result = await db.Danh_gia.update({
            danhgiacuacongty: element.DiemCongTy,
            danhgiacuagiangvien: element.DiemGiangVien,
            tongket: diemtongReal
        }, {
            where: { id_giangvien_phutrach: giangvienPhutrach.id }
        });
        await db.Thuc_tap.update({
            trang_thai: "Đã hoàn thành"
        }, {
            where: { id_sinhvien: sinhvien.id }
        });
        return {
            success: !!result,
            message: result ? 'Cập nhật thành công' : 'Cập nhật thất bại'
        };
    };

    try {
        const results = await Promise.all(Danhgia.map(processEvaluation));
        
        // Check if any evaluation was successful
        const hasSuccess = results.some(result => result.success);
        const errorMessages = results
            .filter(result => !result.success)
            .map(result => result.message);

        if (hasSuccess) {
            return {
                status: 200,
                message: "Đánh giá thành công",
                details: errorMessages.length > 0 ? errorMessages : undefined
            };
        } else {
            return {
                status: 400,
                message: errorMessages
            };
        }
    } catch (error) {
        console.error('Lỗi trong quá trình đánh giá:', error);
        throw new Error('Đã xảy ra lỗi trong quá trình đánh giá sinh viên');
    }
};

const getDanhGia = async (Gv,id_dtt) => {
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
                            },
                            {
                                model: db.Thuc_tap,
                                as: 'thuc_tap',
                                where: {
                                    id_dotthuctap: id_dtt
                                },
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