const db = require("../models/index");

const getDashboard = async () => {
    return new Promise(async(resolve, reject) => {
        try {
            const CountStudents = await db.Student.count();
            const CountLecturers = await db.Lecturer.count();
            const CountCompanies = await db.Company.count();
            const CountInternships = await db.Intern.count();

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