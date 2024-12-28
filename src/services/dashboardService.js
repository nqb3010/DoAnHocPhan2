const db = require("../models/index");

const getDashboard = async () => {
    return new Promise(async(resolve, reject) => {
        try {
            const CountStudents = await db.Sinh_vien.count();
            const CountLecturers = await db.Giang_vien.count();
            const CountCompanies = await db.Cong_ty.count();
            const CountInternships = await db.Dot_thuctap.count();

            resolve({
                CountStudents,
                CountLecturers,
                CountCompanies,
                CountInternships
            });
        } catch (error) {
            reject(error);            
        }
    })
};

module.exports = {
    getDashboard
};