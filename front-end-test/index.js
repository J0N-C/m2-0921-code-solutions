const express = require('express');
const app = express();

app.use(express.static('front-end'));

const pg = require('pg');
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false
  }
});
app.use(express.json());

app.get('/api/grades/:gradeId', (req, res, next) => {
  const gradeId = Number(req.params.gradeId);
  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    return res.status(400).json({ error: 'gradeId must be a positive integer' });
  }
  const sql = `
    select "gradeId",
            "name",
            "course",
            "score",
            "createdAt"
      from "grades"
      where "gradeId" = $1
      `;
  const params = [gradeId];
  db.query(sql, params)
    .then(result => {
      const grade = result.rows[0];
      if (!grade) {
        res.status(404).json({ error: `Cannot find grade with gradeId ${gradeId}` });
      } else {
        res.json(grade);
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});

app.get('/api/grades', (req, res, next) => {
  const sql = `
    select "gradeId",
            "name",
            "course",
            "score",
            "createdAt"
      from "grades"
      `;
  db.query(sql)
    .then(result => {
      const grade = result.rows;
      res.status(200).json(grade);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});

app.post('/api/grades', (req, res, next) => {
  const newEntry = req.body;
  if (newEntry.name === undefined || newEntry.name.length === 0) {
    return res.status(400).json({ error: 'name is a required field.' });
  }
  if (newEntry.course === undefined || newEntry.course.length === 0) {
    return res.status(400).json({ error: 'course is a required field.' });
  }
  if ((typeof newEntry.score === 'string' && newEntry.score.length === 0) || newEntry.score === undefined) {
    return res.status(400).json({ error: 'score is a required field.' });
  }
  newEntry.score = Number(newEntry.score);
  if (!Number.isInteger(newEntry.score) || newEntry.score > 100 || newEntry.score < 0) {
    return res.status(400).json({ error: 'score must be an integer between 0 - 100' });
  }
  const sql = `
    insert into "grades" ("name", "course", "score")
    values ($1, $2, $3)
    returning *
      `;
  const params = [newEntry.name, newEntry.course, newEntry.score];
  db.query(sql, params)
    .then(result => {
      const newGrade = result.rows;
      res.status(201).json(newGrade);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});

app.put('/api/grades/:gradeId', (req, res, next) => {
  const gradeId = Number(req.params.gradeId);
  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    return res.status(400).json({ error: 'gradeId must be a positive integer' });
  }
  const newEntry = req.body;
  if (newEntry.name === undefined || newEntry.name.length === 0) {
    return res.status(400).json({ error: 'name is a required field.' });
  }
  if (newEntry.course === undefined || newEntry.course.length === 0) {
    return res.status(400).json({ error: 'course is a required field.' });
  }
  if ((typeof newEntry.score === 'string' && newEntry.score.length === 0) || newEntry.score === undefined) {
    return res.status(400).json({ error: 'score is a required field.' });
  }
  newEntry.score = Number(newEntry.score);
  if (!Number.isInteger(newEntry.score) || newEntry.score > 100 || newEntry.score < 0) {
    return res.status(400).json({ error: 'score must be an integer between 0 - 100' });
  }
  const sql = `
    update "grades"
        set "name" = $2,
            "course" = $3,
            "score" = $4
    where "gradeId" = $1
    returning *
      `;
  const params = [gradeId, newEntry.name, newEntry.course, newEntry.score];
  db.query(sql, params)
    .then(result => {
      const grade = result.rows[0];
      if (!grade) {
        res.status(404).json({ error: `Cannot find grade with gradeId ${gradeId}` });
      } else {
        res.status(200).json(grade);
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});

app.delete('/api/grades/:gradeId', (req, res, next) => {
  const gradeId = Number(req.params.gradeId);
  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    return res.status(400).json({ error: 'gradeId must be a positive integer' });
  }
  const sql = `
    delete from "grades"
    where "gradeId" = $1
    returning *
      `;
  const params = [gradeId];
  db.query(sql, params)
    .then(result => {
      const grade = result.rows[0];
      if (!grade) {
        res.status(404).json({ error: `Cannot find grade with gradeId ${gradeId}` });
      } else {
        res.sendStatus(204);
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});

app.listen(3000, () => {

});
