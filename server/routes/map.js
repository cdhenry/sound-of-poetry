var config = require("../db-config.js");
var mysql = require("mysql");
var express = require("express");
var router = express.Router();

config.connectionLimit = 10;
var connection = mysql.createPool(config);


router.get("/", function (req, res) {
  var query = `
    SELECT r.name AS region, count(p.id) AS count_poet
    FROM poet p
    JOIN isfrom i ON p.id = i.poet_id
    JOIN region r ON i.region_id = r.id
    GROUP BY 1;
  `;
  connection.query(query, function (err, rows) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

module.exports = router;
