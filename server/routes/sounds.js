var config = require("../db-config.js");
var mysql = require("mysql");
var express = require("express");
var router = express.Router();

config.connectionLimit = 10;
var connection = mysql.createPool(config);

router.get("/", function (req, res) {
  var queryTotal = "SELECT COUNT(ytid) AS total FROM youtube_sound";
  var limit = req.query.limit || 20;
  var pageNumber = req.query.pageNumber;
  var offset = (pageNumber - 1) * limit;
  connection.query(queryTotal, function (err, rows) {
    let totalCount;

    if (err) {
      return err;
    } else {
      totalCount = rows[0].total;
    }

    var query = `
      SELECT *
      FROM youtube_sound ys
      JOIN ytid_mid ym ON ys.ytid = ym.ytid
      JOIN audio_classes ac ON ym.m_id = ac.m_id
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

router.get("/:sound", function (req, res) {
  var id = req.params.sound;
  var query = `
    SELECT *
    FROM youtube_sound
    WHERE ytid = ${id};
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows[0]);
    }
  });
});

module.exports = router;
