const db = require("../models");
const Tutorial = db.tutorials;
const Tag = db.tag;

// Create and Save a new Tag
exports.createTag = async (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const tag = {
        name: req.body.name,
    };

    try {
        const response = await Tag.create(tag)
        res.send(response);
    } catch (e) {
        res.status(500).send({
            message: e.message || "Some error occurred while creating the Tutorial."
        });
        throw e
    }
};

//Find all tags
exports.findAll = async (req, res) => {
    try {
        const response = await Tag.findAll({
            include: [
                {
                    model: Tutorial,
                    as: "tutorials",
                    attributes: ["id", "title", "description"],
                    through: {
                        attributes: [],
                    }
                },
            ],
        })
        res.send(response);
    } catch (e) {
        res.status(500).send({
            message: e.message || "Some error occurred while retrieving tutorials."
        });
        throw e
    }
};

// Find tag by id
exports.findTagById = async (req, res) => {
    const id = req.params.id;

    try {
        // IMPORTANT - includes get data from linked table
        const response = await Tag.findByPk(id, {
            include: [
                {
                    model: Tutorial,
                    as: "tutorials",
                    attributes: ["id", "title", "description"],
                    through: {
                        attributes: [],
                    }
                },
            ],
        })

        if (!response) {
            res.status(500).send({
                message: "no Tag with id=" + id
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

//Add a Tutorial to a Tag
exports.addTutorial = async (req, res) => {
    const tagId = req.body.tag;
    const tutorialId = req.body.tutorial;

    try {
        const tag = await Tag.findByPk(tagId)
        if (!tag) {
            res.status(500).send({message: "no Tag with id=" + tagId});
            return null
        }
        const tutorial = await Tutorial.findByPk(tutorialId)
        if (!tutorial) {
            res.status(500).send({message: "no Tutorial with id=" + tutorialId});
            return null
        }
        tag.addTutorial(tutorial);
        res.send({message: 'Done'});
    } catch (e) {
        res.status(500).send({
            message: `Error add Tutorial with id=${tutorialId} to tag ${tagId}`
        });
        throw e
    }
};
