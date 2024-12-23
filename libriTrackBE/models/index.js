const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.books = require("./book.model.js")(sequelize, Sequelize, db);
db.movies = require("./movie.model.js")(sequelize, Sequelize, db);
db.users = require("./user.model.js")(sequelize, Sequelize, db);

db.users.hasMany(db.books, {
    foreignKey: 'userEmail', 
    as: 'books',
});
db.users.hasMany(db.books, {
    foreignKey: 'userEmail', 
    as: 'movies',
});

db.books.belongsTo(db.users, {
    foreignKey: 'userEmail',
    as: 'user',
});

db.movies.belongsTo(db.users, {
    foreignKey: 'userEmail',
    as: 'user',
});

module.exports = db;