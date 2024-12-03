"Use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsTo(models.Class, {
        foreignKey: "class_id",
        targetKey: "id",
        as: "Class",
      });
      Student.hasMany(models.Instructor, {
        foreignKey: "student_id",
        sourceKey: "id",
        as: "instructors",
      });
    }
  }

  Student.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      student_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT, // Lưu và hiển thị dưới dạng 0 hoặc 1
        allowNull: false,
        defaultValue: 0, // Giá trị mặc định là 0
      },
    },
    {
      sequelize,
      modelName: "Student",
      timestamps: false,
    }
  );
  return Student;
};
