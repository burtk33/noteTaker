//Importing express and path
const express = require('express');
const path = require('path');

//assinging variables and PORT number
const app = express();
const PORT = 8080;

//arrays to hold JSON data
const notes = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../index.html')));

app.get('/notes', (req, res)=> res.sendFile(path.join(__dirname, '../../notes.html')));

app.get('/api/notes', (req, res) => res.json(notes));


//Post methods
app.post('/api/notes', (req, res)=>{

    const newNote=req.body;
    notes.push(newNote);
});


//server listening verification
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));