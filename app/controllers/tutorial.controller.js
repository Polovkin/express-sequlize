const db = require("../models");
const Tutorial = db.tutorials;
const Tag = db.tag;

// Create and Save a new Tutorial
exports.createTutorial = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
    };

    try {
        const response = await Tutorial.create(tutorial)
        res.send(response);
    } catch (e) {
        res.status(500).send({
            message: e.message || "Some error occurred while creating the Tutorial."
        });
        throw e
    }

};

// Get the comments for a given tutorial
exports.findTutorialById = async (req, res) => {
    const id = req.params.id;

    try {
        // IMPORTANT - includes get data from linked table
        const response = await Tutorial.findByPk(id, {
            include: ["comments", {
                model: Tag,
                as: "tags",
                attributes: ["id", "name"],
                through: {
                    attributes: [],
                },
                // through: {
                //   attributes: ["tag_id", "tutorial_id"],
                // },
            },]
        })

        if (!response) {
            res.status(500).send({
                message: "no Tutorial with id=" + id
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

// Get all Tutorials include comments
exports.findAll = async (req, res) => {
    try {
        const response = await Tutorial.findAll({
            include: ["comments", {
                model: Tag,
                as: "tags",
                attributes: ["id", "name"],
                through: {
                    attributes: [],
                },
                // Atrivutes
                /*  attributes: ["id", "name"],
                  through: {
                      attributes: [],
                  }
                  through: {
                      attributes: ["tag_id", "tutorial_id"],
                  },*/
            },],
        })
        res.send(response);
    } catch (e) {
        res.status(500).send({
            message: e.message || "Some error occurred while retrieving tutorials."
        });
        throw e
    }
};
