const db = require('../models/index');
const bcrypt = require('bcrypt');
const CommonUtils = require('../utils/CommonUtils');

const login = async (email, password) => {
   return new Promise(async (resolve, reject) => {
       try {
            if(!email || !password) {
                resolve({
                    status: 400,
                    message: 'Mã sinh viên  và mật khẩu không được để trống'
                })
            }
           const user = await db.Nguoi_dung.findOne({ where: { email } });
           if (!user) {
               resolve({
                   status: 404,
                   message: 'Tài khoản không tồn tại'
               });
           }
           const isMatch = await bcrypt.compare(password, user.mat_khau);
           if (!isMatch) {
               resolve({
                   status: 401,
                   message: 'Mật khẩu không chính xác'
               });
           }
           if(user.trang_thai === 0) {
                resolve({
                     status: 403,
                     message: 'Tài khoản chưa kích hoạt'
                });
              }
           delete user.mat_khau;
           delete user.trang_thai;
           console.log(user.email + ' ' + "login success");
           resolve({
                status: 200,
                message: 'Đăng nhập thành công',
                data: user,
                token: CommonUtils.encodeToken(user.email)
           });
       } catch (error) {
           reject(error);
       }
   });
};

module.exports = {
    login
    };