const userService = require("../services/userService");

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.login(email, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    handleLogin
};