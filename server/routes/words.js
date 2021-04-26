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

// frequently used words to display on the page
router.get("/frequent", function (req, res) {
  var query = `
    SELECT w.lemma, pw.use_count
    FROM poem_wordnet pw
    INNER JOIN words w ON pw.word_id = w.wordid
    WHERE length(w.lemma) >4 and length(w.lemma) <20
    ORDER BY pw.use_count DESC 
    LIMIT 20
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json({ total: rows.length, items: rows });
    }
  });
});

// poem words with image  
router.get("/hasimage", function (req, res) {
  var query = `
    SELECT lemma, image_url
    FROM poem_wordnet p
    INNER JOIN wordsXsensesXsynsets w ON p.word_id=w.wordid
    INNER JOIN google_images_synsets g ON w.synsetid=g.synsetid
    INNER JOIN images_synsets i ON i.synsetid = g.synsetid
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

// poem words with youtube  
router.get("/hasyoutube", function (req, res) {
  var query = `
    SELECT lemma, ys.ytid, ys.start_seconds
    FROM poem_wordnet p 
    INNER JOIN wordsXsensesXsynsets w ON p.word_id=w.wordid
    INNER JOIN media_class_wordnet m ON m.word_id=p.word_id
    INNER JOIN ytid_mid y ON m.m_id=y.m_id
    INNER JOIN youtube_sound ys on ys.ytid=y.ytid
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

// poems with the lemma (from image or sound search)
router.get("/:lemma", function (req, res) {
  var lemma = req.params.word;
  var query = `
    SELECT p.title, p.poem_string
    FROM poem p
    JOIN poem_wordnet pw ON p.id=pw.poem_id
    INNER JOIN wordsXsensesXsynsets w ON pw.word_id=w.wordid
    WHERE lemma = ${lemma};
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
    SELECT *
    FROM words
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
