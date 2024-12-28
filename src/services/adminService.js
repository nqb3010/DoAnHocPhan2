const { raw } = require('body-parser');
const db = require('../models/index');

const assignLecturer = async (facultyId, courseId, companyId, internId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const students = await db.Sinh_vien.findAll({
                include: [
                  {
                    model: db.Lop_hoc,
                    as: "lop_hoc",
                    required: true, // Đảm bảo INNER JOIN thay vì LEFT JOIN
                    where: {
                      id_khoahoc: courseId, // Lọc theo ID khóa học
                      id_khoa: facultyId     // Lọc theo ID khoa
                    }
                  }
                ],
                raw: true,
                nest: true,
              });
            const lecturers = await db.Giang_vien.findAll({
                where: {
                    id_khoa: facultyId,
                }
            });
            const lecturerIds = lecturers.map(lecturer => lecturer.id);  
            let index = 0;
            for (let student of students) {
                await db.Phan_cong_giangvien.create({
                    id_sinhvien: student.id,
                    id_giangvien: lecturerIds[index],
                    id_dotthuctap: internId,
                    id_congty: companyId,
                    trang_thai: "đã phê duyệt" 
                });
                await db.Sinh_vien.update({
                    trang_thai: 1
                }, {
                    where: {
                        id: student.id
                    }
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