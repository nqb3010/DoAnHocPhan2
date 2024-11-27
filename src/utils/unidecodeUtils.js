const unidecode = require("unidecode");
const cleanString = (str) => {
    // Loại bỏ dấu tiếng Việt và chuyển sang không dấu
    str = unidecode(str);
    // Loại bỏ khoảng trắng và ký tự đặc biệt, chỉ giữ chữ và số
    str = str.replace(/[^a-zA-Z0-9]/g, '');
    // Chuyển thành chữ thường
    return str.toLowerCase();
  };

module.exports = {
    cleanString,
    };