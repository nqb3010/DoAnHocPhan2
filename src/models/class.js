"Use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Class extends Model {
        static associate(models) {
            Class.belongsTo(models.Course, {
                foreignKey: 'course_id',
                targetKey: 'id',
                as: 'course'
            });
            Class.belongsTo(models.Faculty, {
                foreignKey: 'faculty_id',
                targetKey: 'id',
                as: 'faculty'
            });
            Class.hasMany(models.Student, {
                foreignKey: 'class_id',
                sourceKey: 'id',
                as: 'students'
            });
        }
    }
    
    Class.init(
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
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        faculty_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        },
        {
        sequelize,
        modelName: "Class",
        timestamps: false,
        }
    );
    return Class;
    }