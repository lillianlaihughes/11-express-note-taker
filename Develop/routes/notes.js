const path = require('path');
// const api = require('./routes/index.js');
const noteList = require('../db/db.json');
const fs = require('fs');
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');

// GET Route for homepage
notes.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// POST route to update notes
notes.post('/api/notes', (req, res) => {
  noteList.push(req.body);
  console.log(uuidv4());
  fs.writeFile('./db/db.json', JSON.stringify(noteList), (err) => {
    if (err) console.log(err);
  });
});

// GET route to read notes
notes.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (err) => {
    if (err) console.log(err);
  });
  res.json(noteList);
});

// GET route to read 1 note (by id)
notes.get('/api/notes/:id', function (req, res) {
  if (req.params.id) {
    const noteId = req.params.id;
    for (let i = 0; i < noteList.length; i++) {
      const currentNote = noteList[i];
      if (noteList[i].id === noteId) {
        res.json(currentNote);
        return;
      }
    }
  }
});
// DELETE route to delete note by id
notes.delete('/api/notes/:id', function (req, res) {
  if (req.params.id) {
    const noteId = req.params.id;
    for (let i = 0; i < noteList.length; i++) {
      if (noteList[i].id === noteId) {
        console.log(noteList[i]);
        noteList.splice(i, 1);
      }
    }
  }
  fs.writeFile('./db/db.json', JSON.stringify(noteList), (err) => {
    console.log(err);
  });
  res.json(`Deleted note ${req.params.id}`);
});
