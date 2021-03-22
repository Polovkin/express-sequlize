module.exports = app => {
  const tutorials = require("../controllers/simple-tutorial.controller.js");

  const router = require("express").Router();

  // Create and Save a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials from the database.
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Find a single Tutorial with an id
  router.get("/:id", tutorials.findOne);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial by the id in the request
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with the specified id in the request
  router.delete("/:id", tutorials.delete);

  // Delete all Tutorials from the database.
  router.delete("/", tutorials.deleteAll);

  app.use('/api/tutorials', router);
};
