// Imports express module that are going to be used in this app.
const express = require("express");

// Sets an initial port.
const PORT = process.env.PORT || 8080;

// Tells node that we are creating an "express" server.
const app = express();

// Sets up the Express app to handle data parsing.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serving static files in express.
app.use(express.static(__dirname + "/develop/public"));

// Route files that give our server a map of how to responde user requests.
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Code that starts our server.
app.listen(PORT, () => console.log(`App listening on PORT http://localhost:${PORT}`));