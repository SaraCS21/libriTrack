const db = require("../models");
const User = db.users;  // Asegúrate de que la ruta esté correcta
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Name, email and password are required!"
        });
        return;
    }

    // Create a User
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, 
    };

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Find a single User with an email 
exports.findOne = (req, res) => {
    const email  = req.params.email ;

    User.findOne({
        where: { email: email }
    })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `User with email=${email} not found.`
            });
        } else {
            res.send(data);
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving User with email=" + email
        });
    });
};

// Update a User by the email in the request
exports.update = (req, res) => {
    const email = req.params.email;

    // Validate if the request body contains something to update
    if (!req.body.name && !req.body.password) {
        res.status(400).send({
            message: "At least one field (name, email, password) must be provided to update."
        });
        return;
    }

    // Update User
    User.update(req.body, {
        where: { email: email }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with email=${email}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with email=" + email
            });
        });
};

// Delete a User with the specified email in the request
exports.delete = (req, res) => {
    const email = req.params.email;

    User.destroy({
        where: { email: email }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with email=${email}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with email=" + email
            });
        });
};
