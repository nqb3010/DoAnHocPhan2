'Use strict';
const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class Lecturer extends Model {
        static associate(models) {
            Lecturer.belongsTo(models.User, {
                foreignKey: 'user_id',
                targetKey: 'id',
                as: 'user'
            });
            Lecturer.belongsTo(models.Faculty, {
                foreignKey: 'faculty_id',
                targetKey: 'id',
                as: 'faculty'
            });
        }
    }
    Lecturer.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        faculty_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Lecturer',
        timestamps: false
    });
    return Lecturer;
}