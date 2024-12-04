const classService = require('../services/classService');

const handlegetAllClasses = async (req, res) => {
    try {
        const classes = await classService.getAllClasses();
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    handlegetAllClasses
};