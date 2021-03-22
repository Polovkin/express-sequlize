const db = require("../models");
const Tutorial = db.tutorials;
const Comment = db.comments;


// Create and Save a new Comment to Tutorial
exports.createComment = async (req, res) => {
    if (!req.body.text) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const comment = {
        name: req.body.name,
        text: req.body.text,
        tutorialId: req.body.tutorialId,
    };

    try {
        const response = await Comment.create(comment)
        res.send(response);
    } catch (e) {
        res.status(500).send({
            message: e.message || "Some error occurred while creating the Tutorial."
        });
        throw e
    }
}

// Get the comments for a given tutorial
exports.findCommentById   = async (req, res) => {
    const id = req.params.id;

    try {
        // IMPORTANT - includes get data from linked table
        const response = await Comment.findByPk(id, { include: ["tutorial"] })

        if (!response) {
            res.status(500).send({
                message: "no Comment with id=" + id
            });
            return response
        }
        res.send(response);
    } catch (e) {
        res.status(500).send({
            message: "Error retrieving Tutorial with id=" + id
        });
        throw e
    }
};
