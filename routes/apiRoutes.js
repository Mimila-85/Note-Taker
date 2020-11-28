const fs = require("fs");
const path = require("path");

// UUID package to create unique ids.
const { v4: uuidv4 } = require("uuid");

const dbPath = path.join("./develop/db/db.json");

let arrayNotes = [];

module.exports = app => {
    app.get("/api/notes", (req, res) => {
        fs.readFile(dbPath, "utf8", (err, data) => {
            if (err){
                console.log(err);
            }else{
                arrayNotes = JSON.parse(data);
                res.json(arrayNotes);
            }
        })
        
    });

    app.post("/api/notes", (req, res) => {
        const newNote = req.body;
        const id = uuidv4();
        newNote.id = id;        

        fs.readFile(dbPath, "utf8", (err, data) => {
            if (err) {
                console.log(err)
            }else{
                arrayNotes = JSON.parse(data);
                arrayNotes.push(newNote);
                const newNoteObj = JSON.stringify(arrayNotes);
                fs.writeFile(dbPath, newNoteObj, err => err ? console.log(err) : console.log("Notes updated"));
            }            
        })
        res.json(newNote);        
    });

    app.delete("/api/notes:id", (req, res) => {
        const id = req.params.id;

        fs.readFile(dbPath, "utf8", (error, data) =>{
            if (error){
                console.log(error);
            }
            else {
                arrayNotes = JSON.parse(data);
                const updateNotes = arrayNotes.filter(notes => notes.id !== id);
                const updateNotesObj = JSON.stringify(updateNotes);
                fs.writeFile(dbPath, updateNotesObj, err => err ? console.log(error) : console.log("Updated db.json"));
                return res.json(true);
            }
        })
    })
}