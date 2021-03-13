//Importing express, path and fs
const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid= require('uniqid');

//assinging variables and PORT number
const app = express();
const PORT = process.env.PORT || 8080;


//express static route
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//read file function fro db.json
fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw (err);
    let notes = JSON.parse(data);

    //Get methods
    app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

    app.get('/api/notes', (req, res) => res.send(notes));

    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

    app.get("/api/notes/:id", function (req, res) {
        res.json(notes[req.params.id]);
    });

    app.delete("/api/notes/:id", function (req, res) {
        notes.splice(req.params.id, 1);
        res.json(notes);
        updateDb();
    });


    //Post methods
    app.post('/api/notes', (req, res) => {

        let newNote = req.body;
        newNote.id = uniqid();
        notes.push(newNote);
        res.json(notes);
        updateDb();
    });

    function updateDb() {
        fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
            if (err) throw err;
            return true;
        });
    }
});

//server listening verification
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

