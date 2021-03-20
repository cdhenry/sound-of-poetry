var config = require("../db-config.js");
var mysql = require("mysql");
var express = require("express");
var router = express.Router();

config.connectionLimit = 10;
var connection = mysql.createPool(config);

router.get("/", function (req, res) {
    var query = `
    SELECT image
    FROM image;
  `;
    connection.query(query, function (err, rows, fields) {
        if (err) console.log(err);
        else {
            res.json(rows);
        }
    });
});

router.get("/:image", function (req, res) {
    var id = req.params.image;
    var query = `
    SELECT image
    FROM image
    WHERE id === ${id};
  `;
    connection.query(query, function (err, rows, fields) {
        if (err) console.log(err);
        else {
            res.json(rows);
        }
    });
});

module.exports = router;
