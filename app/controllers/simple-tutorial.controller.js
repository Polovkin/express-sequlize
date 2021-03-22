const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = async (req, res) => {

    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
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

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    const title = req.query.title;
    const condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    try {
        const response = await Tutorial.findAll({where: condition})
        res.send(response);
    } catch (e) {
        res.status(500).send({
            message: e.message || "Some error occurred while retrieving tutorials."
        });
        throw e
    }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const response = await Tutorial.findByPk(id)

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

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Tutorial.update(req.body, {
            where: {id: id}
        })

        res.send({
            message: response == 1 ?
                    "Tutorial was updated successfully." :
                    `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
    } catch (e) {
        res.status(500).send({
            message: "Error updating Tutorial with id=" + id
        });
        throw e
    }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Tutorial.destroy({
            where: {id: id}
        })
        res.send({
            message: response == 1 ?
                    "Tutorial was deleted successfully!" :
                    `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });

    } catch (e) {
        res.status(500).send({
            message: "Could not delete Tutorial with id=" + id
        });
        throw e
    }

};

// Delete all Tutorials from the database.
exports.deleteAll = async (req, res) => {
    try {
        const response = await Tutorial.destroy({
            where: {},
            truncate: false
        })
        console.log(response);
        res.send({
            message: `${response} Tutorials were deleted successfully!`
        });
    } catch (e) {
        res.status(500).send({
            message: e.message || "Some error occurred while removing all tutorials."
        });
        throw e
    }
};

// find all published Tutorial
exports.findAllPublished = async (req, res) => {
     try {
         const response = await  Tutorial.findAll({where: {published: true}})

         res.send(response);
     } catch (e) {
         res.status(500).send({
             message:
                     e.message || "Some error occurred while retrieving tutorials."
         });
         throw e
     }

};
