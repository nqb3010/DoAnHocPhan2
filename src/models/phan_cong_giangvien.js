"Use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Phan_cong_giangvien extends Model {
        static associate(models) {
            Phan_cong_giangvien.belongsTo(models.Sinh_vien, {
                foreignKey: "id_sinhvien",
                targetKey: "id",
                as: "sinh_vien",
            });
            Phan_cong_giangvien.belongsTo(models.Giang_vien, {
                foreignKey: "id_giangvien",
                targetKey: "id",
                as: "giang_vien",
            });
            Phan_cong_giangvien.belongsTo(models.Dot_thuctap, {
                foreignKey: "id_dotthuctap",
                targetKey: "id",
                as: "dot_thuc_tap",
            });
            Phan_cong_giangvien.belongsTo(models.Cong_ty, {
                foreignKey: "id_congty",
                targetKey: "id",
                as: "cong_ty",
            });
            Phan_cong_giangvien.hasMany(models.Danh_gia, {
                foreignKey: "id_phancong",
                sourceKey: "id",
                as: "danh_gia",
            });
        }
    }

    Phan_cong_giangvien.init(
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
            id_dotthuctap: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            id_congty: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            trang_thai: {
                type: DataTypes.ENUM('đã phê duyệt','bị từ chối','đã hoàn thành'),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Phan_cong_giangvien",
            timestamps: false,
            tableName: "Phan_cong_giangvien",
        }
    );
    return Phan_cong_giangvien;
}