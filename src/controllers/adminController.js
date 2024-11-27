const adminService = require('../services/adminService');


const assignLecturer = async (req, res) => {
    try {
        const { FacultyId, courseId, CompanyId } = req.body;
        const result = await adminService.assignLecturer(FacultyId, courseId, CompanyId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    };

module.exports = {
    assignLecturer
};