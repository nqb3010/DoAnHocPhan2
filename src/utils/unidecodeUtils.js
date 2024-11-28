const unidecode = require("unidecode");
const cleanString = (str) => {
    // Loại bỏ dấu tiếng Việt và chuyển sang không dấu
    str = unidecode(str);
    // Loại bỏ khoảng trắng và ký tự đặc biệt, chỉ giữ chữ và số
    str = str.replace(/[^a-zA-Z0-9]/g, '');
    // Chuyển thành chữ thường
    return str.toLowerCase();
  };

const tachHoTen = (str) => {
    // Tách họ và tên
    const parts = str.split(" ");
    if(parts.length < 2) return { first_name: str, last_name: "" };
    const last_name = parts.pop();
    const first_name = parts.join(" ");
    return { first_name, last_name };
  }

module.exports = {
    cleanString,
    tachHoTen
    };