const adminService = require('../services/adminService');


const assignLecturer = async (req, res) => {
    try {
        const result = await adminService.assignLecturer(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    };

module.exports = {
    assignLecturer
};