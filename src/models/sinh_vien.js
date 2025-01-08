"Use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Sinh_vien extends Model {
    static associate(models) {
      Sinh_vien.belongsTo(models.Lop_hoc, {
        foreignKey: "id_lophoc",
        targetKey: "id",
        as: "lop_hoc",
      });
    }
  }

  Sinh_vien.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ma_sinhvien: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ho: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ten: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_lophoc: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      trang_thai: {
        type: DataTypes.TINYINT, // Lưu và hiển thị dưới dạng 0 hoặc 1
        allowNull: false,
        defaultValue: 0, // Giá trị mặc định là 0
      },
    },
    {
      sequelize,
      modelName: "Sinh_vien",
      timestamps: false,
      tableName: "Sinh_vien",
    }
  );
  return Sinh_vien;
};
