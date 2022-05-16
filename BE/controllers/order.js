var db = require('../models/database');

let postOrder = (req, res) => {
    const { userID, cart } = req.body;
    let cartInsert = '';
    cart.forEach(order => {
        cartInsert += `("${userID}", ${order.productID}, ${order.quantityOrdered}, "pending"),`;
    });
    const cartInsertTemp = cartInsert.substring(0, cartInsert.length - 1);
    let sql = `INSERT INTO orders (userID , productID, quantityOrdered, status) VALUES${cartInsertTemp}`;
    db.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send({
                msg: 'Đặt hàng thành công',
                data: result,
            });
        }
    });
};

module.exports = { postOrder };