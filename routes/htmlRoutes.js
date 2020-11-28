// Path package to get the correct file path for our html.
const path = require("path");

module.exports = app => {
    // GET requests in accordance with the user given path.
    app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "../develop/public/notes.html")));
    
    // if no matching route is found with the path entered by the user it default to home instead of a 404 error, for example.
    app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../develop/public/index.html")));
};