"Use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Evaluation extends Model {
        static associate(models) {
            Evaluation.belongsTo(models.Instructor, {
                foreignKey: "instructor_id",
                targetKey: "id",
                as: "instructor",
            });
        }
    }
    
    Evaluation.init(
        {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        instructor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        heso1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        heso2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        heso3: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        final: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        },
        {
        sequelize,
        modelName: "Evaluation",
        timestamps: false,
        }
    );
    return Evaluation;
    }