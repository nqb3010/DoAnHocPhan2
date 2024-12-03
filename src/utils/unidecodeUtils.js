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
    if (!str || typeof str !== "string") {
      return { first_name: "", last_name: "" };
    }
  
    // Kiểm tra nếu là số
    const isNumber = !isNaN(Number(str.trim())); // Loại bỏ khoảng trắng rồi kiểm tra
    if (isNumber) {
      return { first_name: "", last_name: "" };
    }
  
    // Tách họ và tên
    const parts = str.trim().split(/\s+/); // Xóa khoảng trắng thừa và tách các từ
    if (parts.length < 2) {
      return { first_name: "", last_name: str }; // Nếu chỉ có một từ
    }
  
    const last_name = parts.pop(); // Lấy từ cuối làm tên
    const first_name = parts.join(" "); // Phần còn lại làm họ
  
    return { first_name, last_name };
  };

module.exports = {
    cleanString,
    tachHoTen
    };