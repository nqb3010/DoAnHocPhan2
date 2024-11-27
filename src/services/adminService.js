const { raw } = require('body-parser');
const db = require('../models/index');

const assignLecturer = async (facultyId, courseId, companyId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const students = await db.Student.findAll({
                include: [
                  {
                    model: db.Class,
                    as: "class",
                    include: [
                      {
                        model: db.Course,
                        as: "course",
                        attributes: ["name"],
                        where: { id: courseId } // Lọc theo khóa học
                      },
                      {
                        model: db.Faculty,
                        as: "faculty",
                        attributes: ["name"],
                        where: { id: facultyId } // Lọc theo khoa
                      }
                    ]
                  }
                ],
                raw : true,
                nest: true,
              });
            const lecturers = await db.Lecturer.findAll({
                where: {
                    faculty_id: facultyId,
                }
            });
            const lecturerIds = lecturers.map(lecturer => lecturer.id);  
            let index = 0;
            for (let student of students) {
                await db.Instructor.create({
                    student_id: student.id,
                    lecturer_id: lecturerIds[index],
                    intern_id: 1,
                    company_id: companyId, 
                });
                index = (index + 1) % lecturerIds.length;
            }
            resolve({
                status: 200,
                message: "Phân công giảng viên thành công"
            });
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    assignLecturer
};