const { raw } = require('body-parser');
const db = require('../models/index');

const assignLecturer = async (facultyId, courseId, companyId, internId) => {
    return new Promise(async(resolve, reject) => {
        try {
            // Find all students in the specified course and faculty
            const students = await db.Sinh_vien.findAll({
                include: [{
                    model: db.Lop_hoc,
                    as: "lop_hoc",
                    required: true,
                    where: {
                        id_khoahoc: courseId,
                        id_khoa: facultyId
                    }
                }],
                raw: true,
                nest: true,
            });

            // Get all lecturers from the faculty
            const lecturers = await db.Giang_vien.findAll({
                where: {
                    id_khoa: facultyId,
                }
            });
            const lecturerIds = lecturers.map(lecturer => lecturer.id);

            let index = 0;
            for (let student of students) {
                // Check if student already has an assignment
                const existingAssignment = await db.Phan_cong_giangvien.findOne({
                    where: {
                        id_sinhvien: student.id,
                        id_dotthuctap: internId
                    }
                });

                // Skip if student already has an assignment
                if (existingAssignment) {
                    continue;
                }

                // Create new assignment if student doesn't exist
                const PcongGV = await db.Phan_cong_giangvien.create({
                    id_sinhvien: student.id,
                    id_giangvien: lecturerIds[index],
                    id_dotthuctap: internId,
                    id_congty: companyId,
                    trang_thai: "đã phê duyệt"
                });

                // Create evaluation record
                await db.Danh_gia.create({
                    id_phancong_giangvien: PcongGV.id,
                });

                // Update student status
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