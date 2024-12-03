const dashboardService = require('../services/dashboardService');

const handleGetDashboard = async (req, res) => {
    try {
        const dashboard = await dashboardService.getDashboard();
        res.json(dashboard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    handleGetDashboard
};