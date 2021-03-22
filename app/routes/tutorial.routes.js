module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller");

    var router = require("express").Router();

    // Create and Save a new Tutorial
    router.post("/", tutorials.createTutorial);

    // Get the comments for a given tutorial
    router.get("/:id", tutorials.findTutorialById );

    // Get all Tutorials include comments
    router.get("/", tutorials.findAll );

    app.use('/api/tutorials', router);
};
