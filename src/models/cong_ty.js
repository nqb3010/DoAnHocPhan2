'Use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Cong_ty extends Model {
    }

    Cong_ty.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            ten_congty: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            linh_vuc: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dia_chi: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sdt: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mo_ta: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Cong_ty',
            timestamps: false,
            tableName: 'cong_ty',
        }
    );
    return Cong_ty;
}