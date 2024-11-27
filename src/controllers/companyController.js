const companyService = require('../services/companyService');

const handleGetCompanies = async (req, res) => {
    try {
        const companies = await companyService.getCompanies();
        res.json(companies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const handleGetCompanyById = async (req, res) => {
    try {
        const company = await companyService.getCompanyById(req.params.id);
        res.json(company);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const handleAddCompany = async (req, res) => {
    try {
        const company = await companyService.addCompany(req.body);
        res.json(company);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const handleUpdateCompany = async (req, res) => {
    try {
        const company = await companyService.updateCompany(req.params.id, req.body);
        res.json(company);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const handleDeleteCompany = async (req, res) => {
    try {
        const company = await companyService.deleteCompany(req.params.id);
        res.json(company);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    handleGetCompanies,
    handleGetCompanyById,
    handleAddCompany,
    handleUpdateCompany,
    handleDeleteCompany,
};