const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('quanlydotthuctap', 'admin', "I6hW3QgF]VyvpC5V", {
    host: '47.245.124.228',
    dialect: 'mysql',
    logging: false
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = connectDB;