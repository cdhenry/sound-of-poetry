var config = require("../db-config.js");
var mysql = require("mysql");
var express = require("express");
var router = express.Router();

config.connectionLimit = 10;
var connection = mysql.createPool(config);

router.get("/", function (req, res) {
    var query = `
    SELECT title
    FROM poem;
  `;
    connection.query(query, function (err, rows, fields) {
        if (err) console.log(err);
        else {
            res.json(rows);
        }
    });
});

router.get("/:poem", function (req, res) {
    var id = req.params.poem;
    var query = `
    SELECT *
    FROM poem
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
