'Use strict';
const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class Faculty extends Model {
        static associate(models) {
            Faculty.hasMany(models.Lecturer, {
                foreignKey: 'faculty_id',
                sourceKey: 'id',
                as: 'lecturers',
            });
            Faculty.hasMany(models.Class, {
                foreignKey: 'faculty_id',
                sourceKey: 'id',
                as: 'classes',
            });
        }
    }
    Faculty.init(
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
        },
        {
            sequelize,
            modelName: 'Faculty',
            timestamps: false,
        }
    );
    return Faculty;
}