var db = require('../models/database');

let getAllProducts = (req, res) => {
    let sql = `SELECT * FROM products`;
    db.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                res.send({
                    msg: 'Get data successfully',
                    data: result,
                });
            } else {
                res.send({
                    msg: `Không có sản phẩm nào.`,
                });
            }
        }
    });
};

let getSingleProducts = (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM products where productId = ${id}`;
    db.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                res.send({
                    msg: 'Get data successfully',
                    data: result,
                });
            } else {
                res.send({
                    msg: 'Data not found',
                    data: result,
                });
            }
        }
    });
};

let searchProduct = (req, res) => {
    const { product } = req.query;
    let sql = `SELECT * FROM products where productName LIKE "%${product}%"`;
    console.log(sql);
    db.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                res.send({
                    msg: 'Get data successfully',
                    data: result,
                });
            } else {
                res.send({
                    msg: 'Data not found',
                    data: result,
                });
            }
        }
    });
};

module.exports = {
    getAllProducts,
    getSingleProducts,
    searchProduct,
};