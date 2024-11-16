const db = require("../models");
const Movie = db.movies;

const User = db.users;

// Create and Save a new Movie
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

        // Create movie
        const movie = {
            title: req.body.title,
            director: req.body.director,
            genre: req.body.genre,
            review: req.body.review,
            cover: req.file ? req.file.filename : "",
            score: req.body.score,
            favorite: req.body.favorite,
            seen: req.body.seen,
            userEmail: user.email 
        };

        // Save Movie in the database
        Movie.create(movie)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Movie."
                });
            });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving User with email=" + req.body.userEmail
        });
    });
};

// Retrieve all Movies from the database.
exports.findAll = (req, res) => {
    const userEmail = req.params.email;

    User.findOne({
        where: { email: userEmail }
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({
                message: `User with email=${userEmail} not found.`
            });
        }

        Movie.findAll({
            where: { userEmail: user.email }
        })
        .then(movies => {
            res.send(movies);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving movies."
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving User with email=" + userEmail
        });
    });
};

// Find a single Movie with an id
exports.findOne = (req, res) => {
    const email = req.params.email; 
    const movieId = req.params.id;   

    User.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: `User with email=${email} not found.`
                });
            }

            Movie.findOne({
                where: { id: movieId, userEmail: user.email }
            })
                .then(movie => {
                    if (!movie) {
                        return res.status(404).send({
                            message: `Movie with id=${movieId} not found for user with email=${email}.`
                        });
                    }
                    res.send(movie); 
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error retrieving Movie with id=" + movieId
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with email=" + email
            });
        });
};

// Update a Movie by the id in the request
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

        // Update movie
        Movie.update(req.body, { where: { id: id } })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Movie was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Movie with id=${id}. Maybe Movie was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Movie with id=" + id
                });
            });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving User with email=" + req.body.userEmail
        });
    });
};

// Delete a Movie with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Movie.findByPk(id)
        .then(movie => {
            if (!movie) {
                return res.status(404).send({
                    message: `Movie with id=${id} not found.`
                });
            }

            movie.update({ userId: null }) 
                .then(() => {
                    Movie.destroy({
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({
                                    message: "Movie was deleted successfully!"
                                });
                            } else {
                                res.send({
                                    message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Could not delete Movie with id=" + id
                            });
                        });
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error disassociating movie from user"
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Movie with id=" + id
            });
        });
};