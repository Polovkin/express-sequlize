module.exports = app => {
    const tutorials = require("../controllers/comment.controller");

    var router = require("express").Router();

    // Create and Save a new Tutorial
    router.post("/", tutorials.createComment);

    // Get the comments for a given tutorial
    router.get("/:id", tutorials.findCommentById );

    app.use('/api/comments', router);
};
