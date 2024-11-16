const verifyToken = require("../middlewares/verifyToken.js");

module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    const authBasic = require("../middlewares/authBasic.js"); 

    // Create a new User
    router.post("/", verifyToken, users.create);

    // Retrieve a single User with email
    router.get("/:email", verifyToken, users.findOne);

    // Update a User with email
    router.put("/:email", verifyToken, users.update);

    // Delete a User with email
    router.delete("/:email", verifyToken, users.delete);

    // Login a User
    router.post("/login", authBasic, users.login);

    app.use('/api/users', router);
};
