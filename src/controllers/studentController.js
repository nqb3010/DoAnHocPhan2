const studentService = require('../services/studentService');

const handleGetStudents = async (req, res) => {
    try {
        const students = await studentService.getStudents();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleGetStudentById = async (req, res) => {
    try {
        const student = await studentService.getStudentById(req.params.id);
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleAddStudent = async (req, res) => {
    try {
        const student = await studentService.addStudent(req.body);
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleUpdateStudent = async (req, res) => {
    try {
        const student = await studentService.updateStudent(req.params.id, req.body);
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleDeleteStudent = async (req, res) => {
    try {
        const student = await studentService.deleteStudent(req.params.id);
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleFilterStudents = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const students = await studentService.filterStudents(keyword);
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleGetStudentsWithoutInternship = async (req, res) => {
    try {
        const {khoaId, dotThuctapId} = req.body;
        const students = await studentService.getStudentsWithoutInternship(khoaId, dotThuctapId);
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    handleGetStudents,
    handleGetStudentById,
    handleAddStudent,
    handleUpdateStudent,
    handleDeleteStudent,
    handleFilterStudents,
    handleGetStudentsWithoutInternship
};