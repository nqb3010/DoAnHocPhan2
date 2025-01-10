'Use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Nguoi_dung extends Model {
        static associate(models) {
            Nguoi_dung.hasOne(models.Giang_vien, {
                foreignKey: 'id_nguoidung',
                as: 'giang_vien',
            });
        }
    }
    Nguoi_dung.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            mat_khau: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            vai_tro: {
                type: DataTypes.ENUM('Admin', 'giang_vien', 'cong_ty'),
                allowNull: false,
            },
            id_congty: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            trang_thai: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        {
            sequelize,
            modelName: 'Nguoi_dung',
            timestamps: false,
            tableName: 'nguoi_dung',
        }
    );
    return Nguoi_dung;
};