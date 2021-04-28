var config = require("../db-config.js");
var mysql = require("mysql");
var express = require("express");
var router = express.Router();

config.connectionLimit = 10;
var connection = mysql.createPool(config);

router.get("/", function (req, res) {
  var queryTotal =
    "SELECT COUNT(distinct w.wordid) AS total FROM poem_wordnet pw INNER JOIN words w ON w.wordid=pw.word_id INNER JOIN wordsXsensesXsynsets wx ON pw.word_id=wx.wordid";
  var limit = req.query.limit || 20;
  var pageNumber = req.query.pageNumber;
  var offset = pageNumber * limit;
  var orderByClause = "";
  var orderByAZ = "1";
  var orderByZA = "2";
  var orderByOccr = "3";
  var orderByUse = "4";
  var orderBy;

  if (req.query.orderBy) orderBy = req.query.orderBy;

  switch (orderBy) {
    case orderByAZ:
      orderByClause = "ORDER BY id ASC";
      break;
    case orderByZA:
      orderByClause = "ORDER BY id DESC";
      break;
    case orderByOccr:
      "ORDER BY occurrence DESC";
      break;
    case orderByUse:
      "ORDER BY num_poems DESC";
      break;
  }

  connection.query(queryTotal, function (err, rows) {
    let totalCount;

    if (err) {
      return err;
    } else {
      totalCount = rows[0].total;
    }

    var query = `
      SELECT w.wordid AS id, w.lemma AS lemma, wx.definition AS definition, sum(use_count) AS occurrence, count(poem_id) AS num_poems 
      FROM poem_wordnet pw 
      INNER JOIN words w ON w.wordid=pw.word_id
      INNER JOIN wordsXsensesXsynsets wx ON pw.word_id=wx.wordid
      GROUP BY w.wordid
      ${orderByClause}
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

router.get("/lemmas", function (req, res) {
  var lemma = req.query.lemma;
  var query = `
    SELECT wordid as value, lemma as label
    FROM words
    WHERE lemma LIKE '%${lemma}%'
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
    WHERE id = ${id};
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows[0]);
    }
  });
});

router.get("/:word/sounds", function (req, res) {
  var id = req.params.word;
  var query = `
      SELECT ym.ytid, mc.display_name
      FROM ytid_mid ym 
      JOIN media_class mc on ym.m_id = mc.m_id 
      JOIN media_class_wordnet mcw ON mcw.m_id = ym.m_id
      WHERE word_id = ${id}
      LIMIT 5
    `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get("/:word/images", function (req, res) {
  var id = req.params.word;
  var query = `
      SELECT w.lemma, iis.image_url, w.definition
      FROM wordsXsensesXsynsets w 
      JOIN images_synsets iis ON w.synsetid = iis.synsetid
      WHERE w.wordid = ${id}
      LIMIT 5
    `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get("/:word/synonyms", function (req, res) {
  var id = req.params.word;
  var query = `
      SELECT w.lemma
      FROM words w 
      LEFT JOIN senses s ON s.wordid = w.wordid
      LEFT JOIN senses s2 ON s2.synsetid = s.synsetid
      LEFT JOIN words w2 ON w2.wordid = s2.wordid
      WHERE w.wordid <> ${id} 
      AND w2.wordid = ${id}
      GROUP BY w.lemma
    `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get("/:word/dict", function (req, res) {
  var id = req.params.word;
  var query = `
      SELECT *
      FROM dict d
      WHERE d.wordid = ${id}       
    `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

module.exports = router;
