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
  var whereClause = "";
  var joinClause = "";
  var poets;

  if (req.query.poets) poets = req.query.poets;
  if (req.query.title) title = req.query.title;

  if (poets) {
    whereClause += `WHERE p.id IN (${poets})`;
  }

  var queryTotal = `
      SELECT COUNT(p.id) as total
      FROM poet p
      ${whereClause}
    `;

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
      FROM poet p
      ${joinClause}
      ${whereClause}
      LIMIT ${limit}
      OFFSET ${offset};
    `
      : `
      SELECT *
      FROM poet p;
      ${joinClause}
      ${whereClause}
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

router.get("/tags", function (req, res) {
  var poemIds;

  if (req.query.poemIds) poemIds = req.query.poemIds;

  var selectClause = "SELECT t.id as value, t.name as label";
  var joinClause = "";
  var whereClause = "";

  if (poemIds) {
    selectClause = "SELECT t.id, t.name, pt.poem_id";
    joinClause += "JOIN poem_tag pt ON t.id = pt.tag_id";
    whereClause += `WHERE pt.poem_id IN (${poemIds})`;
  }

  var query = `
      ${selectClause}
      FROM tag t
      ${joinClause}
      ${whereClause}
    `;

  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get("/regions", function (req, res) {
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

router.get("/names", function (req, res) {
  var name = req.query.name;
  var query = `
      SELECT id as value, name as label
      FROM poet
      WHERE name LIKE '%${name}%'
    `;
  connection.query(query, function (err, rows, fields) {
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
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows[0]);
    }
  });
});

module.exports = router;
