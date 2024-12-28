const adminService = require('../services/adminService');


const assignLecturer = async (req, res) => {
    try {
        const { facultyId, courseId, companyId, internId } = req.body;
        const result = await adminService.assignLecturer(facultyId, courseId, companyId, internId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    };

module.exports = {
    assignLecturer
};