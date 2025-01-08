'Use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Thuc_tap extends Model {
        static associate(models) {
            Thuc_tap.belongsTo(models.Sinh_vien, {
                foreignKey: 'id_sinhvien',
                targetKey: 'id',
                as: 'sinh_vien'
            });
            Thuc_tap.belongsTo(models.Cong_ty, {
                foreignKey: 'id_congty',
                targetKey: 'id',
                as: 'cong_ty'
            });
            Thuc_tap.belongsTo(models.Dot_thuctap, {
                foreignKey: 'id_dotthuctap',
                targetKey: 'id',
                as: 'dot_thuc_tap'
            });
        }
    }

    Thuc_tap.init(
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
            id_congty: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            id_dotthuctap: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            trang_thai: {
                type : DataTypes.ENUM('Đang thực tập','Đã hoàn thành'),
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: 'Thuc_tap',
            timestamps: false,
            tableName: 'Thuc_tap',
        }
    );
    return Thuc_tap;
}