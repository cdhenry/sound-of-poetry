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
  var joinClause = "";
  var whereClause = "";
  var orderByClause = "";
  var orderByTitle = "1";
  var orderByAuthor = "2";
  var orderByMostSounds = "3";
  var orderByMostImages = "4";
  var poemId;
  var tags;
  var poets;
  var words;
  var audio;
  var video;
  var orderBy;

  if (req.query.poemId) poemId = req.query.poemId;
  if (req.query.tags) tags = req.query.tags;
  if (req.query.poets) poets = req.query.poets;
  if (req.query.words) words = req.query.words;
  if (req.query.hasAudio) audio = req.query.hasAudio === "true";
  if (req.query.hasVideo) video = req.query.hasVideo === "true";
  if (req.query.orderBy) orderBy = req.query.orderBy;

  if (poets) {
    whereClause += `WHERE pp.poet_id IN (${poets})`;
  }

  if (tags) {
    joinClause += `JOIN (SELECT pt.poem_id
                    FROM poem_tag pt
                    WHERE pt.tag_id IN (${tags})
                    GROUP BY pt.poem_id
                    HAVING COUNT(DISTINCT pt.tag_id) = ${tags.length})  
                    x ON x.poem_id = p.id`;
  }

  if (words) {
    joinClause += ` JOIN (SELECT pw.poem_id
                    FROM poem_wordnet pw
                    WHERE pw.word_id IN (${words})
                    GROUP BY pw.poem_id
                    HAVING COUNT(DISTINCT pw.word_id) = ${words.length})  
                    y ON y.poem_id = p.id`;
  }

  if (poemId) {
    if (whereClause) whereClause += ` AND p.id = (${poemId})`;
    else whereClause += `WHERE p.id = (${poemId})`;
  }

  if (audio) {
    if (whereClause) whereClause += ` AND p.audio_url IS NOT NULL`;
    else whereClause += `WHERE p.audio_url IS NOT NULL`;
  }

  if (video) {
    if (whereClause) whereClause += ` AND p.video_url IS NOT NULL`;
    else whereClause += `WHERE p.video_url IS NOT NULL`;
  }

  switch (orderBy) {
    case orderByTitle:
      orderByClause = "ORDER BY p.title";
      break;
    case orderByAuthor:
      orderByClause = "ORDER BY po.name";
      break;
    case orderByMostSounds:
      joinClause += " JOIN poem_media_count pmc ON pmc.poem_id = p.id";
      orderByClause = "ORDER BY pmc.sound_count DESC";
      break;
    case orderByMostImages:
      joinClause += " JOIN poem_media_count pmc ON pmc.poem_id = p.id";
      orderByClause = "ORDER BY pmc.image_count DESC";
      break;
  }

  var queryTotal = `
      SELECT COUNT(p.id) as total
      FROM poem p
      JOIN poet_poem pp ON p.id = pp.poem_id
      JOIN poet po ON pp.poet_id = po.id
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
      SELECT p.id, po.name as poet_name, p.title, p.audio_url, p.video_url
      FROM poem p
      JOIN poet_poem pp ON p.id = pp.poem_id
      JOIN poet po ON pp.poet_id = po.id
      ${joinClause}
      ${whereClause}
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

router.get("/regions", function (req, res) {
  var joinClause = "";
  var words;
  var tags;

  if (req.query.words) words = req.query.words;
  if (req.query.tags) tags = req.query.tags;

  if (tags) {
    joinClause += `JOIN (SELECT pg.poem_id
                    FROM poem_tag pg
                    WHERE pg.tag_id IN (${tags})
                    GROUP BY pg.poem_id
                    HAVING COUNT(DISTINCT pg.tag_id) = ${tags.length}) x
                    ON x.poem_id = pm.id `;
  }

  if (words) {
    joinClause += `JOIN (SELECT pw.poem_id
                    FROM poem_wordnet pw
                    WHERE pw.word_id IN (${words})
                    GROUP BY pw.poem_id
                    HAVING COUNT(DISTINCT pw.word_id) = ${words.length}) y
                    on y.poem_id = pm.id `;
  }

  let query = `SELECT r.name AS region, COUNT(DISTINCT pm.id) AS result 
      FROM poem pm JOIN poet_poem pp on pm.id = pp.poem_id 
      JOIN poet pt on pt.id = pp.poet_id 
      JOIN isfrom i ON pt.id = i.poet_id 
      JOIN region r ON i.region_id = r.id 
      ${joinClause} 
      GROUP BY 1;`;

  connection.query(query, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
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

  connection.query(query, function (err, rows) {
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
  connection.query(query, function (err, rows) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get("/:poem", function (req, res) {
  var id = req.params.poem;
  var query = `
    SELECT p.id, t.name as poet_name, p.poem_string, p.title, p.audio_url, p.video_url
    FROM poem p
    JOIN poet_poem pp on pp.poem_id = p.id
    JOIN poet t on pp.poet_id = t.id
    WHERE p.id = ${id};
  `;
  connection.query(query, function (err, rows) {
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
  connection.query(query, function (err, rows) {
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
  connection.query(query, function (err, rows) {
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
  connection.query(query, function (err, rows) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get("/:poem/stats", function (req, res) {
  var id = req.params.poem;
  var query = `
      SELECT w.wordid, w.lemma, pw.use_count, SUM(st.pos_score) - SUM(st.neg_score) as sentiment 
      FROM poem_wordnet pw 
      JOIN wordsXsensesXsynsets w on w.wordid = pw.word_id
      JOIN sentiment st on st.synsetid = w.synsetid
      WHERE pw.poem_id = ${id}
      GROUP BY w.lemma
      ORDER BY use_count DESC
    `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

module.exports = router;
