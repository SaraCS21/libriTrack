module.exports = app => {
    const movies = require("../controllers/movies.controller.js");
    var upload = require("../multer/upload.js");
  
    var router = require("express").Router();
  
    // Create a new Movie
    router.post("/", upload.single("cover"), movies.create);
  
    // Retrieve all Movies
    router.get("/:email", movies.findAll);
  
    // Retrieve a single Movie with id
    router.get("/:email/:id", movies.findOne);
  
    // Update a Movie with id
    router.put("/:id", movies.update);
  
    // Delete a Movie with id
    router.delete("/:id", movies.delete);
  
    app.use('/api/movies', router);
};