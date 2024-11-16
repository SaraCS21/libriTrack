module.exports = app => {
    const books = require("../controllers/book.controller.js");
    var upload = require("../multer/upload.js");
  
    var router = require("express").Router();
  
    // Create a new Book
    router.post("/", upload.single("cover"), books.create);
  
    // Retrieve all Books
    router.get("/:email", books.findAll);
  
    // Retrieve a single Book with id
    router.get("/:email/:id", books.findOne);
  
    // Update a Book with id
    router.put("/:id", books.update);
  
    // Delete a Book with id
    router.delete("/:id", books.delete);
  
    app.use('/api/books', router);
};