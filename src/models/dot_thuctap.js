'Use strict';
const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class Dot_thuctap extends Model {
    }
    Dot_thuctap.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            ten_dot: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            bat_dau: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            ket_thuc: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            hoc_ky: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mo_ta: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            trang_thai: {
                type: DataTypes.TINYINT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Dot_thuctap',
            timestamps: false,
            tableName: 'dot_thuctap',
        }
    );
    return Dot_thuctap;
}