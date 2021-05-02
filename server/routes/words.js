var config = require("../db-config.js");
var mysql = require("mysql");
var express = require("express");
var router = express.Router();

config.connectionLimit = 10;
var connection = mysql.createPool(config);

router.get("/", function (req, res) {
  var limit = req.query.limit || 20;
  var pageNumber = req.query.pageNumber;
  var offset = pageNumber * limit;
  var orderByAZ = "1";
  var orderByZA = "2";
  var orderByOccur = "3";
  var orderByUse = "4";
  var orderByMostSounds = "5";
  var orderByMostImages = "6";
  var orderBy;
  var words;
  var poemIds;
  var poets;
  var tags;
  var regions;
  var schools;
  var joinClause = "";
  var whereClause = "";
  var orderByClause = "ORDER BY wc.occurrence DESC";

  if (req.query.orderBy) orderBy = req.query.orderBy;
  if (req.query.words) words = req.query.words;
  if (req.query.poemIds) poemIds = req.query.poemIds;
  if (req.query.tags) tags = req.query.tags;
  if (req.query.poets) poets = req.query.poets;
  if (req.query.regions) regions = req.query.regions;
  if (req.query.schools) schools = req.query.schools;

  if (poemIds || tags || poets || regions || schools) joinClause = "JOIN poem_wordnet pw ON wc.word_id = pw.word_id";

  if (poets || regions || schools)
    joinClause += `
      JOIN poet_poem pp ON pp.poem_id = pw.poem_id
    `;

  if (words) {
    whereClause = `WHERE wc.word_id IN (${words})`;
  }

  if (poemIds) {
    if (whereClause) whereClause += ` AND pw.poem_id IN (${poemIds})`;
    else whereClause = `WHERE pw.poem_id IN (${poemIds})`;
  }

  if (poets) {
    if (whereClause) whereClause += ` AND pp.poet_id IN (${poets})`;
    else whereClause = `WHERE pp.poet_id IN (${poets})`;
  }

  if (tags) {
    joinClause += `
      JOIN (SELECT pt.poem_id
      FROM poem_tag pt
      WHERE pt.tag_id IN (${tags})
      GROUP BY pt.poem_id
      HAVING COUNT(DISTINCT pt.tag_id) = ${tags.length})  
      x ON x.poem_id = pw.poem_id
    `;
  }

  if (regions) {
    joinClause += `
        JOIN isfrom pf ON pf.poet_id = pp.poet_id
        JOIN region r ON pf.region_id = r.id
      `;
    if (whereClause) whereClause += ` AND r.id IN (${regions})`;
    else whereClause += `WHERE r.id IN (${regions})`;
  }

  if (schools) {
    joinClause += `
        JOIN inschool ps ON ps.poet_id = pp.poet_id
        JOIN school s ON ps.school_id = s.id
      `;
    if (whereClause) whereClause += ` AND s.id IN (${schools})`;
    else whereClause += `WHERE s.id IN (${schools})`;
  }

  switch (orderBy) {
    case orderByAZ:
      orderByClause = "ORDER BY wc.lemma ASC";
      break;
    case orderByZA:
      orderByClause = "ORDER BY wc.lemma DESC";
      break;
    case orderByOccur:
      orderBYClause = "ORDER BY wc.occurrence DESC";
      break;
    case orderByUse:
      orderByClause = "ORDER BY wc.num_poems DESC";
      break;
    case orderByMostSounds:
      orderByClause = "ORDER BY wc.sound_count DESC";
      break;
    case orderByMostImages:
      orderByClause = "ORDER BY wc.image_count DESC";
      break;
  }

  var queryTotal = `
    SELECT COUNT(wc.word_id) as total
    FROM word_counts wc
    ${joinClause}
    ${whereClause}
  `;

  connection.query(queryTotal, function (err, rows) {
    let totalCount;

    if (err) {
      return err;
    } else {
      totalCount = rows[0].total;
    }

    var query = `
      SELECT wc.word_id as id, wc.lemma, wc.occurrence, wc.num_poems, wc.sound_count, wc.image_count
      FROM word_counts wc
      ${joinClause}
      ${whereClause}
      GROUP BY wc.word_id
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
    WHERE lemma LIKE "${lemma}%"
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

router.get("/:word/sounds", function (req, res) {
  var id = req.params.word;
  var limit = req.query.limit || 20;
  var pageNumber = req.query.pageNumber;
  var offset = pageNumber * limit;
  var query = `
      SELECT ys.ytid, ys.start_seconds, mc.display_name
      FROM youtube_sound ys
      JOIN ytid_mid ym ON ys.ytid = ym.ytid
      JOIN media_class mc on ym.m_id = mc.m_id 
      JOIN media_class_wordnet mcw ON mcw.m_id = ym.m_id
      WHERE word_id = ${id}
      LIMIT ${limit}
      OFFSET ${offset};
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
  var limit = req.query.limit || 20;
  var pageNumber = req.query.pageNumber;
  var offset = pageNumber * limit;
  var query = `
      SELECT DISTINCT gi.original_url, w.lemma, gi.title, gi.author
      FROM wordsXsensesXsynsets w 
      JOIN mid_synset ms ON ms.synsetid = w.synsetid
      JOIN google_imageid_mid gim ON gim.m_id = ms.m_id
      JOIN google_images gi ON gi.image_id = gim.image_id
      WHERE w.wordid = ${id}
      LIMIT ${limit}
      OFFSET ${offset};
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
