var config = require("../db-config.js");
var mysql = require("mysql");
var express = require("express");
var router = express.Router();

config.connectionLimit = 10;
var connection = mysql.createPool(config);

router.get("/", function (req, res) {
    var query = `
    SELECT word
    FROM word;
  `;
    connection.query(query, function (err, rows, fields) {
        if (err) console.log(err);
        else {
            res.json(rows);
        }
    });
});

router.get("/:word", function (req, res) {
    var id = req.params.word;
    var query = `
    SELECT word
    FROM word
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
