var config = require("../db-config.js");
var mysql = require("mysql");
var express = require("express");
var router = express.Router();

config.connectionLimit = 10;
var connection = mysql.createPool(config);

router.get("/", function (req, res) {
  var queryTotal = "SELECT COUNT(id) AS total FROM poem";
  var limit = req.query.limit || 20;
  var page = req.query.page;
  var offset = (page - 1) * limit;
  connection.query(queryTotal, function (err, rows) {
    let totalCount;

    if (err) {
      return err;
    } else {
      totalCount = rows[0].total;
    }

    var query = `
      SELECT *
      FROM poem
      LIMIT ${limit}
      OFFSET ${offset};
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

router.get("/:poem", function (req, res) {
  var id = req.params.poem;
  var query = `
    SELECT *
    FROM poem
    WHERE id = ${id};
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows[0]);
    }
  });
});

router.get("/:poem/words", function (req, res) {
  var id = req.params.poem;
  var query = `
      SELECT pw.poem_id, pw.word_id, w.lemma, pw.use_count
      FROM poem_wordnet pw
      JOIN words w ON pw.word_id = w.wordid
      WHERE pw.poem_id = ${id};
    `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

module.exports = router;
