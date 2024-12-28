'Use strict';
const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class Giang_vien extends Model {
        static associate(models) {
            Giang_vien.belongsTo(models.Nguoi_dung, {
                foreignKey: 'id_nguoidung',
                targetKey: 'id',
                as: 'nguoi_dung'
            });
            Giang_vien.belongsTo(models.Khoa, {
                foreignKey: 'id_khoa',
                targetKey: 'id',
                as: 'khoa'
            });
        }
    }
    Giang_vien.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        ho: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ten: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sdt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_nguoidung: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_khoa: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Giang_vien',
        timestamps: false,
        tableName: 'Giang_vien',
    });
    return Giang_vien;
}