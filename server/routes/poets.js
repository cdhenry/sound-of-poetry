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
  var cte = "";
  var whereClause = "";
  var orderByClause = "";
  var groupByClause = "";
  var selectClause = "SELECT p.id, p.name, p.yob, p.yod, r.name as region, s.name as school";
  var joinClause = `      
      LEFT JOIN isfrom pf ON pf.poet_id = p.id 
      LEFT JOIN region r ON pf.region_id = r.id
      LEFT JOIN inschool ps ON ps.poet_id = p.id 
      LEFT JOIN school s ON ps.school_id = s.id
    `;
  var poets;
  var regions;
  var schools;
  var yob;
  var yod;
  var orderBy;
  var orderByAuthor = "1";
  var orderByRegion = "2";
  var orderBySchool = "3";
  var orderByMostVerbose = "4";
  var orderByMostTerse = "5";
  var orderByWidestVocabulary = "6";
  var orderBySmallestVocabulary = "7";

  if (req.query.poets) poets = req.query.poets;
  if (req.query.regions) regions = req.query.regions;
  if (req.query.schools) schools = req.query.schools;
  if (req.query.yob) yob = req.query.yob;
  if (req.query.yod) yod = req.query.yod;
  if (req.query.orderBy) orderBy = req.query.orderBy;

  if (poets) {
    whereClause = `WHERE p.id IN (${poets})`;
  }

  if (regions) {
    if (whereClause) whereClause += ` AND r.id IN (${regions})`;
    else whereClause += `WHERE r.id IN (${regions})`;
  }

  if (schools) {
    if (whereClause) whereClause += ` AND s.id IN (${schools})`;
    else whereClause += `WHERE s.id IN (${schools})`;
  }

  if (yob) {
    orderByClause += "ORDER BY p.yob";
    if (whereClause) whereClause += ` AND p.yob > ${parseInt(yob)}`;
    else whereClause += `WHERE p.yob > ${parseInt(yob)}`;
  }

  if (yod) {
    if (whereClause) whereClause += ` AND p.yod < ${parseInt(yod)}`;
    else whereClause += `WHERE p.yod < ${parseInt(yod)}`;
  }

  switch (orderBy) {
    case orderByAuthor:
      if (orderByClause) orderByClause += ",p.name";
      else orderByClause = "ORDER BY p.name";
      break;
    case orderByRegion:
      if (orderByClause) orderByClause += ",r.name";
      else orderByClause = "ORDER BY r.name";
      joinClause = `      
        JOIN isfrom pf ON pf.poet_id = p.id 
        JOIN region r ON pf.region_id = r.id
        LEFT JOIN inschool ps ON ps.poet_id = p.id 
        LEFT JOIN school s ON ps.school_id = s.id
      `;
      break;
    case orderBySchool:
      if (orderByClause) orderByClause += ",s.name";
      else orderByClause = "ORDER BY s.name";
      joinClause = `      
        LEFT JOIN isfrom pf ON pf.poet_id = p.id 
        LEFT JOIN region r ON pf.region_id = r.id
        JOIN inschool ps ON ps.poet_id = p.id 
        JOIN school s ON ps.school_id = s.id
      `;
      break;
    case orderByMostVerbose:
      selectClause += `, SUM(po.word_count) / COUNT(pp.poem_id) as words_per_poem`;
      joinClause += `
        JOIN poet_poem pp ON p.id = pp.poet_id
        JOIN poem po ON pp.poem_id = po.id
      `;
      groupByClause = `
        GROUP BY p.id, p.name, p.yob, p.yod, r.name, s.name
      `;
      if (orderByClause) orderByClause += ", words_per_poem";
      else orderByClause = "ORDER BY words_per_poem DESC";
      break;
    case orderByMostTerse:
      selectClause += `, SUM(po.word_count) / COUNT(pp.poem_id) as words_per_poem`;
      joinClause += `
        JOIN poet_poem pp ON p.id = pp.poet_id
        JOIN poem po ON pp.poem_id = po.id
      `;
      groupByClause = `
        GROUP BY p.id, p.name, p.yob, p.yod, r.name, s.name
      `;
      if (orderByClause) orderByClause += ", words_per_poem";
      else orderByClause = "ORDER BY words_per_poem";
      break;
    case orderByWidestVocabulary:
      cte = `WITH poet_all_words as (
        SELECT pp.poet_id, COUNT(DISTINCT pw.word_id) unique_word_count
        FROM poet_poem pp
        JOIN poem_wordnet pw ON pw.poem_id = pp.poem_id
        GROUP BY pp.poet_id
        UNION
        SELECT pp.poet_id, COUNT(DISTINCT pnw.word_id) unique_word_count
        FROM poet_poem pp
        JOIN poem_non_wordnet pnw ON pnw.poem_id = pp.poem_id
        GROUP BY pp.poet_id
      )`;
      selectClause += ", SUM(paw.unique_word_count) as unique_word_count";
      joinClause += " LEFT JOIN poet_all_words paw ON p.id = paw.poet_id";
      groupByClause = "GROUP BY p.id, p.name, p.yob, p.yod, r.name, s.name";
      if (orderByClause) orderByClause += ", unique_word_count DESC";
      else orderByClause = "ORDER BY unique_word_count DESC";
      break;
    case orderBySmallestVocabulary:
      cte = `WITH poet_all_words as (
        SELECT pp.poet_id, COUNT(DISTINCT pw.word_id) unique_word_count
        FROM poet_poem pp
        JOIN poem_wordnet pw ON pw.poem_id = pp.poem_id
        GROUP BY pp.poet_id
        UNION
        SELECT pp.poet_id, COUNT(DISTINCT pnw.word_id) unique_word_count
        FROM poet_poem pp
        JOIN poem_non_wordnet pnw ON pnw.poem_id = pp.poem_id
        GROUP BY pp.poet_id
      )`;
      selectClause += ", SUM(paw.unique_word_count) as unique_word_count";
      joinClause += " LEFT JOIN poet_all_words paw ON p.id = paw.poet_id";
      groupByClause = "GROUP BY p.id, p.name, p.yob, p.yod, r.name, s.name";
      if (orderByClause) orderByClause += ", unique_word_count";
      else orderByClause = "ORDER BY unique_word_count";
      break;
  }

  var queryTotal = `
      ${cte}
      SELECT COUNT(DISTINCT p.id) as total
      FROM poet p
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
      ${cte}
      ${selectClause}
      FROM poet p
      ${joinClause}
      ${whereClause}
      ${groupByClause}
      ${orderByClause}
      LIMIT ${limit}
      OFFSET ${offset}
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

router.get("/regions/dropdown", function (req, res) {
  var query = `
        SELECT r.id as value, r.name as label
        FROM region r
      `;

  connection.query(query, function (err, rows) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get("/schools/dropdown", function (req, res) {
  var query = `
      SELECT s.id as value, s.name as label
      FROM school s
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
