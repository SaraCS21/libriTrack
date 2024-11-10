const db = require("../models");
const Book = db.books;
const Op = db.Sequelize.Op;

const User = db.users;

// Create and Save a new Book
exports.create = (req, res) => {
    User.findOne({
        where: { email: req.body.userEmail }
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({
                message: `User with email=${req.body.userEmail} not found.`
            });
        }

        // Crear el libro
        const book = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            review: req.body.review,
            cover: req.file ? req.file.filename : "",
            numberPages: req.body.numberPages,
            readPages: req.body.readPages,
            score: req.body.score,
            favorite: req.body.favorite,
            read: req.body.read,
            userEmail: user.email 
        };

        // Guardar el libro en la base de datos
        Book.create(book)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Book."
                });
            });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving User with email=" + req.body.userEmail
        });
    });
};

// Retrieve all Books from the database.
exports.findAll = (req, res) => {
    const userEmail = req.body.userEmail;

    User.findOne({
        where: { email: userEmail }
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({
                message: `User with email=${userEmail} not found.`
            });
        }

        Book.findAll({
            where: { userEmail: user.email }
        })
        .then(books => {
            res.send(books);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books."
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving User with email=" + userEmail
        });
    });
};

// Find a single Book with an id
exports.findOne = (req, res) => {
    const email = req.body.userEmail; 
    const bookId = req.params.id;   

    User.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: `User with email=${email} not found.`
                });
            }

            Book.findOne({
                where: { id: bookId, userEmail: user.email }
            })
                .then(book => {
                    if (!book) {
                        return res.status(404).send({
                            message: `Book with id=${bookId} not found for user with email=${email}.`
                        });
                    }
                    res.send(book); 
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error retrieving Book with id=" + bookId
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with email=" + email
            });
        });
};

// Update a Book by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    User.findOne({
        where: { email: req.body.userEmail }
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({
                message: `User with email=${req.body.userEmail} not found.`
            });
        }

        // Actualizar el libro
        Book.update(req.body, { where: { id: id } })
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
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving User with email=" + req.body.userEmail
        });
    });
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Book.findByPk(id)
        .then(book => {
            if (!book) {
                return res.status(404).send({
                    message: `Book with id=${id} not found.`
                });
            }

            book.update({ userId: null }) 
                .then(() => {
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
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error disassociating book from user"
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Book with id=" + id
            });
        });
};