var db = require('../models/database');

let login = (req, res) => {
    let sql = `SELECT userID, name, email, password FROM users`;
    db.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            const { email, password } = req.body;
            const user = result.find(
                data => data.email === email && data.password === password
            );
            if (user) {
                res.send({
                    msg: 'Đăng nhập thành công',
                    data: user,
                });
            } else {
                res.send({
                    msg: 'Email hoặc mật khẩu không đúng',
                });
            }
        }
    });
};

let register = (req, res) => {
    const { userID, email, password, name, phone, address } = req.body;
    let sql = `SELECT email FROM users`;
    db.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            const user = result.find(data => data.email === email);
            if (user) {
                res.send({
                    msg: 'Email đã tồn tại',
                });
            } else {
                let sql = `INSERT INTO users (userID, email,password, name, phone, address)
                            VALUES ("${userID}", "${email}", "${password}", "${name}", "${phone}", "${address}")`;
                db.query(sql, function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send({
                            msg: 'Tạo tài khoản thành công. Vui lòng đăng nhập để mua hàng',
                            data: result,
                        });
                    }
                });
            }
        }
    });
};

module.exports = { login, register };