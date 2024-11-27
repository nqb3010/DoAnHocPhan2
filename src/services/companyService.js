const e = require("express");
const db = require("../models/index");

const getCompanies = async () => {
    return new Promise(async (resolve, reject) => {
        try {
        const companies = await db.Company.findAll({
            attributes: ["company_id", "name"],
        });
        resolve(companies);
        } catch (error) {
        reject(error);
        }
    });
    };

const getCompanyById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
        const company = await db.Company.findOne({
            where: {
            company_id: id,
            },
        });
        resolve(company);
        } catch (error) {
        reject(error);
        }
    });
};

const addCompany = async (company) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newCompany = await db.Company.create({
            name: company.name,
            industry: company.industry,
            address: company.address,
            phone: company.phone,
            email: company.email,
            description: company.description,
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
        const checkCompany = await db.Company.findOne({
            where: {
            company_id: id,
            },
        });
        if (checkCompany) {
            const updateCompany = await db.Company.update(
            {
                name: company.name,
                industry: company.industry,
                address: company.address,
                phone: company.phone,
                email: company.email,
                description: company.description,
            },
            {
                where: {
                    company_id: id,
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
        const checkCompany = await db.Company.findOne({
            where: {
            company_id: id,
            },
        });
        if (checkCompany) {
            const deletedCompany = await db.Company.destroy({
            where: {
                company_id: id,
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
    getCompanyById,
    addCompany,
    updateCompany,
    deleteCompany,
};