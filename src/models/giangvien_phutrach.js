"Use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Giangvien_phutrach extends Model {
        static associate(models) {
            Giangvien_phutrach.belongsTo(models.Sinh_vien, {
                foreignKey: "id_sinhvien",
                targetKey: "id",
                as: "sinh_vien",
            });
            Giangvien_phutrach.belongsTo(models.Giang_vien, {
                foreignKey: "id_giangvien",
                targetKey: "id",
                as: "giang_vien",
            });
            Giangvien_phutrach.belongsTo(models.Thuc_tap, {
                foreignKey: "id_thuctap",
                targetKey: "id",
                as: "thuc_tap",
            });
            Giangvien_phutrach.hasMany(models.Danh_gia, {
                foreignKey: "id_giangvien_phutrach",
                sourceKey: "id",
                as: "danh_gia",
            });
        }
    }

    Giangvien_phutrach.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_sinhvien: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            id_giangvien: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            id_thuctap: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Giangvien_phutrach",
            timestamps: false,
            tableName: "Giangvien_phutrach",
        }
    );
    return Giangvien_phutrach;
}