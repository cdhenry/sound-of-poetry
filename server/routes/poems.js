var config = require("../db-config.js");
var mysql = require("mysql");
var express = require("express");
var router = express.Router();

config.connectionLimit = 10;
var connection = mysql.createPool(config);

router.get("/", function (req, res) {
  var queryTotal = "SELECT COUNT(id) AS total FROM poem";
  var limit = req.query.limit || 20;
  var pageNumber = req.query.pageNumber;
  var offset = (pageNumber - 1) * limit;
  var poems;
  var tags;
  var poets;
  var words;

  if (req.query.titles) poems = req.query.titles;
  if (req.query.tags) tags = req.query.tags;
  if (req.query.poets) poets = req.query.poets;
  if (req.query.words) words = req.query.words;

  connection.query(queryTotal, function (err, rows) {
    let totalCount;

    if (err) {
      return err;
    } else {
      console.log(rows, rows[0]);
      totalCount = rows[0].total;
    }

    var joinClause = "";
    var whereClause = "";

    if (poets) {
      whereClause += `WHERE pp.poet_id IN (${poets})`;
    }
    if (tags) {
      joinClause += " JOIN poem_tag pt ON p.id = pt.poem_id";
      if (whereClause) whereClause += ` AND pt.tag_id IN (${tags})`;
      else whereClause += `WHERE pt.tag_id IN (${tags})`;
    }
    if (words) {
      joinClause += " JOIN poem_wordnet pw ON p.id = pw.poem_id";
      if (whereClause) whereClause += ` AND w.wordid IN (${words})`;
      else whereClause += `WHERE pw.word_id IN (${words})`;
    }
    if (poems) {
      if (whereClause) whereClause += ` AND p.id IN (${poems})`;
      else whereClause += `WHERE p.id IN (${poems})`;
    }

    var query = `
      SELECT DISTINCT p.id, po.name as poet_name, p.poem_string, p.title, p.audio_url, p.video_url
      FROM poem p
      JOIN poet_poem pp ON p.id = pp.poem_id JOIN poet po ON pp.poet_id = po.id${joinClause}
      ${whereClause}
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

router.get("/tags", function (req, res) {
  var poemIds;

  if (req.query.poemIds) poemIds = req.query.poemIds;

  var selectClause = "SELECT t.id as value, t.name as label";
  var joinClause = "";
  var whereClause = "";

  if (poemIds) {
    selectClause = "SELECT t.id, t.name, pt.poem_id";
    joinClause += "JOIN poem_tag pt ON t.id = pt.poem_id";
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

router.get("/titles", function (req, res) {
  var title = req.query.title;
  var query = `
      SELECT id as value, title as label
      FROM poem
      WHERE title LIKE '%${title}%'
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
    WHERE id = ${id};
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows[0]);
    }
  });
});

router.get("/:poem/words/wordnet", function (req, res) {
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

router.get("/:poem/words/nonwordnet", function (req, res) {
  var id = req.params.poem;
  var query = `
      SELECT pw.poem_id, pnw.word_id, nw.lemma, pnw.use_count
      FROM poem_non_wordnet pnw
      JOIN non_wordnet nw ON pnw.word_id = nw.wordid
      WHERE pnw.poem_id = ${id};
    `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get("/:poem/media", function (req, res) {
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
