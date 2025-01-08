"Use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Danh_gia extends Model {
        static associate(models) {
        }
    }
    
    Danh_gia.init(
        {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_giangvien_phutrach: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        danhgiacuacongty: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        danhgiacuagiangvien: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        tongket: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        },
        {
        sequelize,
        modelName: "Danh_gia",
        timestamps: false,
        }
    );
    return Danh_gia;
    }