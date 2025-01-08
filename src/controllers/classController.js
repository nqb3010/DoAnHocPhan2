const classService = require('../services/classService');

const handlegetAllClasses = async (req, res) => {
    try {
        const classes = await classService.getAllClasses();
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const handlegetAllFaculties = async (req, res) => {
    try {
        const faculties = await classService.getAllFaculties();
        res.status(200).json(faculties);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const handlegetCourses = async (req, res) => {
    try {
        const courses = await classService.getCourses();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const handlegetCompany = async (req, res) => {
    try {
        const company = await classService.getCompany();
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const handlegetInternship = async (req, res) => {
    try {
        const internship = await classService.getInternship();
        res.status(200).json(internship);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const handlegetLecturersbyFaculty = async (req, res) => {
    try {
        const lecturers = await classService.getLecturersbyFaculty(req.params.faculty);
        res.status(200).json(lecturers);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
module.exports = {
    handlegetAllClasses,
    handlegetAllFaculties,
    handlegetCourses,
    handlegetCompany,
    handlegetInternship,
    handlegetLecturersbyFaculty
};