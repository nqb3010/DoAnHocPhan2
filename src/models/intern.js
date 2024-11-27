'Use strict';
const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class Intern extends Model {
    }
    Intern.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            start_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            end_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },semester: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            academic_year: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            is_active: {
                type: DataTypes.TINYINT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Intern',
            timestamps: false,
        }
    );
    return Intern;
}