const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const controller = require("./app/controllers/tutorial.controller");
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./app/models");

//db.sequelize.sync();
// drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
    console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
    res.render('index', {title: 'Express'});
});


require("./app/routes/tutorial.routes")(app);
require("./app/routes/comments.routes")(app);
require("./app/routes/tag.routes")(app);
const run = async () => {

};
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    run();
});

