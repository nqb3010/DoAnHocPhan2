const lecturerService = require('../services/lecturerService');

const handleGetLecturers = async (req, res) => {
    try {
        const lecturers = await lecturerService.getLecturers();
        res.status(200).json(lecturers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const handleGetLecturerById = async (req, res) => {
    try {
        const LecturerId = req.params.id;
        const lecturer = await lecturerService.getLecturerById(LecturerId);
        res.status(200).json(lecturer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const handleAddLecturer = async (req, res) => {
    try {
        const lecturer = await lecturerService.addLecturer(req.body);
        res.status(201).json(lecturer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const handleUpdateLecturer = async (req, res) => {
    try {
        const lecturer = await lecturerService.updateLecturer(req.params.id, req.body);
        res.status(200).json(lecturer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const handleDeleteLecturer = async (req, res) => {
    try {
        const lecturer = await lecturerService.deleteLecturer(req.params.id);
        res.status(200).json(lecturer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const handleGetStudentsByLecturer = async (req, res) => {
    try {
        const lecturerId = req.params.id;
        const students = await lecturerService.getstudentsbyLecturerId(lecturerId);
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const handleFilterLecturers = async (req, res) => {
    try {
        const lecturers = await lecturerService.filterLecturers(req.query);
        res.json(lecturers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    handleGetLecturers,
    handleGetLecturerById,
    handleAddLecturer,
    handleUpdateLecturer,
    handleDeleteLecturer,
    handleGetStudentsByLecturer,
    handleFilterLecturers
};