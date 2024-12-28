"Use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Khoa_hoc extends Model {
        static associate(models) {
            Khoa_hoc.hasMany(models.Lop_hoc, {
                foreignKey: 'id_khoahoc',
                sourceKey: 'id',
                as: 'khoa_hoc',
            });
        }
    }

    Khoa_hoc.init(
        {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ten_khoahoc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        },
        {
        sequelize,
        modelName: "Khoa_hoc",
        timestamps: false,
        tableName: "Khoa_hoc",
        }
    );
    return Khoa_hoc;
    }