const internService = require('../services/internService');

const handleGetInterns = async (req, res) => {
    try {
        const interns = await internService.getInterns();
        res.status(200).json(interns);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const handleGetInternById = async (req, res) => {
    try {
        const internId = req.params.id;
        const intern = await internService.getInternById(internId);
        res.status(200).json(intern);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const handleAddIntern = async (req, res) => {
    try {
        const intern = req.body;
        const newIntern = await internService.addIntern(intern);
        res.status(200).json(newIntern);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const handleUpdateIntern = async (req, res) => {
    try {
        const internId = req.params.id;
        const intern = req.body;
        const updatedIntern = await internService.updateIntern(internId, intern);
        res.status(200).json(updatedIntern);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const handleDeleteIntern = async (req, res) => {
    try {
        const internId = req.params.id;
        const deletedIntern = await internService.deleteIntern(internId);
        res.status(200).json(deletedIntern);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    handleGetInterns,
    handleGetInternById,
    handleAddIntern,
    handleUpdateIntern,
    handleDeleteIntern
};