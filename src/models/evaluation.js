'Use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Evaluation extends Model {
    }

    Evaluation.init(
        {
            evaluation_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            registration_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            technical_score: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            soft_skills_score: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            attitude_score: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            final_score: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            comments: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            evaluated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Evaluation',
            timestamps: false,
        }
    );
    return Evaluation;
}