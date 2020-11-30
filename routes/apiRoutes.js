// Imports all modules that are going to be used in this app.
const fs = require("fs");
const path = require("path");

// UUID package to create unique ids.
const { v4: uuidv4 } = require("uuid");

// Path to json file where notes are going to be saved.
const dbPath = path.join(__dirname, "../develop/db/db.json");

// Empty array to push the objects to be saved in the json file.
let arrayNotes = [];

// Module to export to the server.
module.exports = app => {
    // GET route
    app.get("/api/notes", (req, res) => {
        // Read db.json file
        fs.readFile(dbPath, "utf8", (err, data) => {
            if (err){
                console.log(err);
            }else{
                // Parse the json file and make it to be the arrayNotes.
                arrayNotes = JSON.parse(data);
                // Send the arrayNotes to the front end.
                res.json(arrayNotes);
            }
        })
        
    });

    // POST route.
    app.post("/api/notes", (req, res) => {
        // Save the note posted by the user.
        const newNote = req.body;
        // Create a unique id.
        const id = uuidv4();
        // Add the id to the object.
        newNote.id = id;        
        // Read db.json file
        fs.readFile(dbPath, "utf8", (err, data) => {
            if (err) {
                console.log(err)
            }else{
                // Parse the json file and make it to be the arrayNotes.
                arrayNotes = JSON.parse(data);
                // Push the new note to the the arrayNotes.
                arrayNotes.push(newNote);
                // Stringify the arrayNotes.
                const newNoteObj = JSON.stringify(arrayNotes);
                // Write a new db.json file with the updated stringify arrayNotes.
                fs.writeFile(dbPath, newNoteObj, err => err ? console.log(err) : console.log("Notes updated"));
            }            
        })
        // Send the user note back with an id on it to the front end.
        res.json(newNote);        
    });

    // DELETE route.
    app.delete("/api/notes/:id", (req, res) => {
        // Grab the note id to be deleted from the front end.
        const id = req.params.id;
        // Read the db.json file.
        fs.readFile(dbPath, "utf8", (error, data) =>{
            if (error){
                console.log(error);
            }
            else {
                // Parse the json file and make it to be the arrayNotes.
                arrayNotes = JSON.parse(data);
                // Filter the arrayNotes to excluded the object with the match id to be deleted.
                const updateNotes = arrayNotes.filter(notes => notes.id !== id);
                // Stringify the updateNotes array.
                const updateNotesObj = JSON.stringify(updateNotes);
                // Write db.json file with the stringify updateNotes.
                fs.writeFile(dbPath, updateNotesObj, err => err ? console.log(error) : console.log("Updated db.json"));
                return res.json(true);
            }
        })
    })
}