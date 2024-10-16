const db = require("../models");
const Book = db.books;
const Op = db.Sequelize.Op;

// Create and Save a new Book
exports.create = (req, res) => {

    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Book
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        review: req.body.review,
        cover: req.body.cover,
        numberPages: req.body.numberPages,
        readPages: req.body.readPages,
        score: req.body.score,
        favorite: req.body.favorite,
        read: req.body.read
    };

    // Save Book in the database
    Book.create(book)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Book."
            });
        });
};

// Retrieve all Books from the database.
exports.findAll = (req, res) => {

    Book.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving books."
            });
        });
};

// Find a single Book with an id
exports.findOne = (req, res) => {

    const id = req.params.id;

    Book.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Book with id=" + id
            });
        });
};

// Update a Book by the id in the request
exports.update = (req, res) => {

    const id = req.params.id;

    Book.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Book was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Book with id=" + id
            });
        });
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    Book.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Book was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Book with id=" + id
            });
        });
};