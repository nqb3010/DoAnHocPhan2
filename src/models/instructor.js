"Use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Instructor extends Model {
        static associate(models) {
            Instructor.belongsTo(models.Student, {
                foreignKey: "student_id",
                targetKey: "id",
                as: "student",
            });
            Instructor.belongsTo(models.Lecturer, {
                foreignKey: "lecturer_id",
                targetKey: "id",
                as: "lecturer",
            });
            Instructor.belongsTo(models.Intern, {
                foreignKey: "intern_id",
                targetKey: "id",
                as: "intern",
            });
            Instructor.belongsTo(models.Company, {
                foreignKey: "company_id",
                targetKey: "id",
                as: "company",
            });
        }
    }

    Instructor.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            student_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            lecturer_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            intern_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            company_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('approved','rejected','completed'),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Instructor",
            timestamps: false,
        }
    );
    return Instructor;
}