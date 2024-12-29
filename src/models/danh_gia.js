"Use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Danh_gia extends Model {
        static associate(models) {
            Danh_gia.belongsTo(models.Phan_cong_giangvien, {
                foreignKey: "id_phancong_giangvien",
                targetKey: "id",
                as: "phan_cong_giangvien",
            });
        }
    }
    
    Danh_gia.init(
        {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_phancong_giangvien: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        heso1: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        heso2: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        heso3: {
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