const { where } = require('sequelize');
const db = require('../models/index');

const getInterns = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const interns = await db.internshipPeriod.findAll(
                {
                    where: {
                        is_active: 1
                    },
                    attributes: ['period_id', 'name'],
                }
            );
            resolve(interns);
        } catch (error) {
            reject(error);
        }
    });
};

const getInternById = async (internId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const intern = await db.internshipPeriod.findOne(
                {
                    where: {
                        period_id: internId
                    },
                }
            );
            delete intern.is_active;
            resolve(intern);
        } catch (error) {
            reject(error);
        }
    });
}

const addIntern = async (intern) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!intern.name || !intern.start_date || !intern.end_date || !intern.semester || !intern.academic_year || !intern.description){
                resolve({
                    status: 400,
                    message: "Vui Lòng Nhập Đầy Đủ Thông Tin",
                });
            }
            const newIntern = await db.internshipPeriod.create({
                name: intern.name,
                start_date: intern.start_date,
                end_date: intern.end_date,
                semester: intern.semester,
                academic_year: intern.academic_year,
                description: intern.description,
                is_active: 1
            });
            if(newIntern != null){
                resolve({
                    status: 200,
                    message: "Thêm Đợt Thực Tập Thành Công",
                    data : newIntern
                });
            }
            else{
                resolve({
                    status: 400,
                    message: "Thêm Đợt Thực Tập Thất Bại",
                    data : newIntern
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

const updateIntern = async (internId, intern) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkIntern = await db.internshipPeriod.findOne(
                {
                    where: {
                        period_id: internId
                    }
                }
            );
            if(!checkIntern){
                resolve({
                    status: 400,
                    message: "Không Tìm Thấy Đợt Thực Tập",
                });
            }else{
                if(!intern.name || !intern.start_date || !intern.end_date || !intern.semester || !intern.academic_year || !intern.description){
                    resolve({
                        status: 400,
                        message: "Vui Lòng Nhập Đầy Đủ Thông Tin",
                    });
                }
                const updatedIntern = await db.internshipPeriod.update(
                    {
                        name: intern.name,
                        start_date: intern.start_date,
                        end_date: intern.end_date,
                        semester: intern.semester,
                        academic_year: intern.academic_year,
                        description: intern.description,
                    },
                    {
                        where: {
                            period_id: internId
                        }
                    }
                );
                if(updatedIntern == 1){
                    resolve({
                        status: 200,
                        message: "Cập Nhật Đợt Thực Tập Thành Công",
                    });
                }
                else{
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
}

const deleteIntern = async (internId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkIntern = await db.internshipPeriod.findOne(
                {
                    where: {
                        period_id: internId
                    }
                }
            );
            if(!checkIntern){
                resolve({
                    status: 400,
                    message: "Không Tìm Thấy Đợt Thực Tập",
                });
            }else{
                const deletedIntern = await db.internshipPeriod.destroy(
                    {
                        where: {
                            period_id: internId
                        }
                    }
                );
                if(deletedIntern == 1){
                    resolve({
                        status: 200,
                        message: "Xóa Đợt Thực Tập Thành Công",
                    });
                }
                else{
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
}

module.exports = {
    getInterns,
    getInternById,
    addIntern,
    updateIntern,
    deleteIntern
};