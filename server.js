const express = require('express');
const path = require('path');
const api = require('./routes/index');
const noteList = require('./db/db.json');
const fs = require('fs');

const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.use(bodyParser.json({ extended: false }));

// MOVED OVER TO NOTES.JS IN ROUTES FOLDER
// // GET Route for homepage
// app.get('/notes', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/notes.html'))
// );

// // POST route to update notes
// app.post('/api/notes', (req, res) => {
//   noteList.push(req.body);
//   console.log(uuidv4());
//   fs.writeFile('./db/db.json', JSON.stringify(noteList), (err) => {
//     if (err) console.log(err);
//   });
// });

// // GET route to read notes
// app.get('/api/notes', (req, res) => {
//   fs.readFile('./db/db.json', 'utf-8', (err) => {
//     if (err) console.log(err);
//   });
//   res.json(noteList);
// });

// // GET route to read 1 note (by id)
// app.get('/api/notes/:id', function (req, res) {
//   if (req.params.id) {
//     const noteId = req.params.id;
//     for (let i = 0; i < noteList.length; i++) {
//       const currentNote = noteList[i];
//       if (noteList[i].id === noteId) {
//         res.json(currentNote);
//         return;
//       }
//     }
//   }
// });
// // DELETE route to delete note by id
// app.delete('/api/notes/:id', function (req, res) {
//   if (req.params.id) {
//     const noteId = req.params.id;
//     for (let i = 0; i < noteList.length; i++) {
//       if (noteList[i].id === noteId) {
//         console.log(noteList[i]);
//         noteList.splice(i, 1);
//       }
//     }
//   }
//   fs.writeFile('./db/db.json', JSON.stringify(noteList), (err) => {
//     console.log(err);
//   });
//   res.json(`Deleted note ${req.params.id}`);
// });

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/404.html'))
);

// listen() method shows that app is connected
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
