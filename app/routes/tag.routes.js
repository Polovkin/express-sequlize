module.exports = app => {
    const tutorials = require("../controllers/tag.controller");

    var router = require("express").Router();

    // Create and Save a new Tag
    router.post("/", tutorials.createTag);

    //Find all tags
    router.get("/", tutorials.findAll);

    // Find tag by id
    router.get("/:id", tutorials.findTagById);

    //Add a Tutorial to a Tag
    router.post("/tutorial", tutorials.addTutorial);
    app.use('/api/tag', router);
};
