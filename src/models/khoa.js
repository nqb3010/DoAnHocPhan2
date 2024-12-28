'Use strict';
const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class Khoa extends Model {
        static associate(models) {
            Khoa.hasMany(models.Giang_vien, {
                foreignKey: 'id_khoa',
                sourceKey: 'id',
                as: 'giang_viens',
            });
            Khoa.hasMany(models.Lop_hoc, {
                foreignKey: 'id_khoa',
                sourceKey: 'id',
                as: 'lop_hocs',
            });
        }
    }
    Khoa.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            ten_khoa: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Khoa',
            timestamps: false,
            tableName: 'Khoa',
        }
    );
    return Khoa;
}