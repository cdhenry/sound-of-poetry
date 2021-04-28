var config = require("../db-config.js");
var mysql = require("mysql");
var express = require("express");
var router = express.Router();

config.connectionLimit = 10;
var connection = mysql.createPool(config);

router.get("/", function (req, res) {
  var queryTotal = "SELECT COUNT(id) AS total FROM poet";
  var limit = req.query.limit || null;
  var pageNumber = req.query.pageNumber;
  var offset = pageNumber * limit;
  connection.query(queryTotal, function (err, rows) {
    let totalCount;

    if (err) {
      return err;
    } else {
      totalCount = rows[0].total;
    }

    var query = limit
      ? `
      SELECT *
      FROM poet
      LIMIT ${limit}
      OFFSET ${offset};
    `
      : `
      SELECT *
      FROM poet;
    `;

    connection.query(query, function (err, rest) {
      if (err) {
        return err;
      } else {
        res.json({ total: totalCount, items: rest });
      }
    });
  });
});

router.get("/regions", function (req, res) {
  var query = `
    SELECT r.name AS region, count(p.id) AS result
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

router.get("/names", function (req, res) {
  var name = req.query.name;
  var query = `
      SELECT id as value, name as label
      FROM poet
      WHERE name LIKE '%${name}%'
    `;
  connection.query(query, function (err, rows) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get("/:poet", function (req, res) {
  var id = req.params.poet;
  var query = `
    SELECT *
    FROM poet
    WHERE id = ${id};
  `;
  connection.query(query, function (err, rows) {
    if (err) console.log(err);
    else {
      res.json(rows[0]);
    }
  });
});

module.exports = router;
