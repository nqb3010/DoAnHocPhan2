const { where } = require('sequelize');
const db = require('../models/index');

const getInterns = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const interns = await db.Dot_thuctap.findAll(
                {
                    where: {
                        trang_thai: 1
                    },
                }
            );
            resolve(interns);
        } catch (error) {
            reject(error);
        }
    });
};

const addIntern = async (intern) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!intern.name || !intern.start_date || !intern.end_date || !intern.semester || !intern.loai){
                resolve({
                    status: 400,
                    message: "Vui Lòng Nhập Đầy Đủ Thông Tin",
                });
            }
            const newIntern = await db.Dot_thuctap.create({
                ten_dot: intern.name,
                bat_dau: intern.start_date,
                ket_thuc: intern.end_date,
                hoc_ky: intern.semester,
                loai: intern.loai,
                trang_thai: "Đang mở",
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
            const checkIntern = await db.Dot_thuctap.findOne(
                {
                    where: {
                        id: internId
                    }
                }
            );
            if(!checkIntern){
                resolve({
                    status: 400,
                    message: "Không Tìm Thấy Đợt Thực Tập",
                });
            }else{
                if(!intern.name || !intern.start_date || !intern.end_date || !intern.semester || !intern.description){
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
                        mo_ta: intern.description,
                    },
                    {
                        where: {
                            id: internId
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
            const checkIntern = await db.Dot_thuctap.findOne(
                {
                    where: {
                        id: internId
                    }
                }
            );
            if(!checkIntern){
                resolve({
                    status: 400,
                    message: "Không Tìm Thấy Đợt Thực Tập",
                });
            }else{
                checkPhancong = await db.Phan_cong_giangvien.findAll(
                    {
                        where: {
                            id_dotthuctap: internId
                        }
                    }
                );
                if(checkPhancong.length > 0){
                    resolve({
                        status: 400,
                        message: "Không Thể Xóa Đợt Thực Tập Đã Được Phân Công",
                    });
                }
                const deletedIntern = await db.Dot_thuctap.destroy(
                    {
                        where: {
                            id: internId
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
    addIntern,
    updateIntern,
    deleteIntern
};