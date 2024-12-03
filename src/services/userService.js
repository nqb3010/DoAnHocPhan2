const db = require('../models/index');
const bcrypt = require('bcrypt');
const CommonUtils = require('../utils/CommonUtils');

const login = async (email, password) => {
   return new Promise(async (resolve, reject) => {
       try {
            console.log(email + ' ' + "login");

            if(!email || !password) {
                resolve({
                    status: 400,
                    message: 'Mã sinh viên  và mật khẩu không được để trống'
                })
            }
           const user = await db.User.findOne({ where: { email } });
           if (!user) {
               resolve({
                   status: 404,
                   message: 'Tài khoản không tồn tại'
               });
           }
           const isMatch = await bcrypt.compare(password, user.password);
           if (!isMatch) {
               resolve({
                   status: 401,
                   message: 'Mật khẩu không chính xác'
               });
           }
           if(user.is_active === 0) {
                resolve({
                     status: 403,
                     message: 'Tài khoản chưa kích hoạt'
                });
              }
           delete user.password;
           delete user.created_at;
           delete user.is_active;
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