"Use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Course extends Model {
        static associate(models) {
            Course.hasMany(models.Class, {
                foreignKey: 'course_id',
                sourceKey: 'id',
                as: 'classes',
            });
        }
    }

    Course.init(
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
        modelName: "Course",
        timestamps: false,
        }
    );
    return Course;
    }