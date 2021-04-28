var config = require("../db-config.js");
var mysql = require("mysql");
var express = require("express");
var router = express.Router();

config.connectionLimit = 10;
var connection = mysql.createPool(config);

router.get("/", function (req, res) {
  var queryTotal = "SELECT COUNT(wordid) AS total FROM dict";
  var limit = req.query.limit || 20;
  var pageNumber = req.query.pageNumber;
  var offset = pageNumber * limit;
  connection.query(queryTotal, function (err, rows) {
    let totalCount;

    if (err) {
      return err;
    } else {
      totalCount = rows[0].total;
    }

    var query = `
      SELECT *
      FROM dict
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
      SELECT ys.ytid, ys.start_seconds, mc.display_name
      FROM youtube_sound ys
      JOIN ytid_mid ym ON ys.ytid = ym.ytid
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
    SELECT DISTINCT gil.original_url, w.lemma, gil.title, gil.author
    FROM wordsXsensesXsynsets w
           JOIN imagenet_imageid_synset gis ON gis.synsetid = w.synsetid
           JOIN google_imageid_mid gmil ON gmil.m_id = gis.image_id
           JOIN google_images gil ON gil.image_id = gmil.image_id
      WHERE w.wordid = ${id}
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
