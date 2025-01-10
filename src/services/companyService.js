const e = require("express");
const db = require("../models/index");
const bcript = require("bcrypt");
require("dotenv").config();

const getCompanies = async () => {
    return new Promise(async (resolve, reject) => {
        try {
        const companies = await db.Cong_ty.findAll({
        });
        resolve(companies);
        } catch (error) {
        reject(error);
        }
    });
    };

const addCompany = async (company) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newCompany = await db.Cong_ty.create({
            ten_congty: company.name,
            linh_vuc: company.industry,
            dia_chi: company.address,
            sdt: company.phone,
            email: company.email,
            mo_ta: company.description,
            });
            const passwordDefault = process.env.PASSWORD_DEFAULT;
            const hashPassword = bcript.hashSync(passwordDefault, 10);
            const newAccount = await db.Nguoi_dung.create({
                email: company.email,
                mat_khau: hashPassword,
                vai_tro: "cong_ty",
                id_congty: newCompany.id,
                trang_thai: 1,
            });
            if (newCompany != null) {
            resolve({
                status: 200,
                message: "Thêm công ty thành công",
                data: newCompany,
            });
            } else {
            resolve({
                status: 400,
                message: "Thêm công ty thất bại",
            });
            }
        } catch (error) {
        reject(error);
        }
    });
};

const updateCompany = async (id, company) => {
    return new Promise(async (resolve, reject) => {
        try {
        const checkCompany = await db.Cong_ty.findOne({
            where: {
            id: id,
            },
        });
        if (checkCompany) {
            const updateCompany = await db.Cong_ty.update(
            {
                ten_congty: company.name,
                linh_vuc: company.industry,
                dia_chi: company.address,
                sdt: company.phone,
                email: company.email,
                mo_ta: company.description,
            },
            {
                where: {
                    id: id,
                },
            }
            );
            if (updateCompany != 0) {
            resolve({
                status: 200,
                message: "Cập nhật thông tin công ty thành công",
            });
            } else {
            resolve({
                status: 400,
                message: "Cập nhật thông tin công ty thất bại",
            });
            }
        } else {
            resolve({
            status: 400,
            message: "Công ty không tồn tại",
            });
        }
        } catch (error) {
        reject(error);
        }
    });
};

const deleteCompany = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
        const checkCompany = await db.Cong_ty.findOne({
            where: {
            id: id,
            },
        });
        if (checkCompany) {
            checkPhanCong = await db.Phan_cong_giangvien.findOne({
            where: {
                id_congty: id,
            },
            });
            if (checkPhanCong) {
            resolve({
                status: 400,
                message: "Không thể xóa công ty đã được phân công",
            });
            }
            const deletedCompany = await db.Cong_ty.destroy({
            where: {
                id: id,
            },
            });
            if (deletedCompany) {
            resolve({
                status: 200,
                message: "Xóa công ty thành công",
            });
            } else {
            resolve({
                status: 400,
                message: "Xóa công ty thất bại",
            });
            }
        } else {
            resolve({
            status: 400,
            message: "Công ty không tồn tại",
            });
        }
        } catch (error) {
        reject(error);
        }
    });
};

module.exports = {
    getCompanies,
    addCompany,
    updateCompany,
    deleteCompany,
};