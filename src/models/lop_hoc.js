"Use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Lop_hoc extends Model {
        static associate(models) {
            Lop_hoc.belongsTo(models.Khoa_hoc, {
                foreignKey: 'id_khoahoc',
                targetKey: 'id',
                as: 'khoa_hoc'
            });
            Lop_hoc.belongsTo(models.Khoa, {
                foreignKey: 'id_khoa',
                targetKey: 'id',
                as: 'khoa'
            });
            Lop_hoc.hasMany(models.Sinh_vien, {
                foreignKey: 'id_lophoc',
                sourceKey: 'id',
                as: 'lop_hoc'
            });
        }
    }
    
    Lop_hoc.init(
        {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ten_lop: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_khoahoc: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_khoa: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        },
        {
        sequelize,
        modelName: "Lop_hoc",
        timestamps: false,
        tableName: "Lop_hoc",
        }
    );
    return Lop_hoc;
    }