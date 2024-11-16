module.exports = (sequelize, Sequelize, db) => {
    const Movie = sequelize.define("movie", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        director: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        genre: {
            type: Sequelize.ENUM,
            values: ['Romance', 'Ciencia ficción', 'Histórica', 'Aventura', 'Terror', 'Infantil', 'Fantasía'],
            allowNull: false,
        },
        review: {
            type: Sequelize.STRING
        },
        cover: {
            type: Sequelize.STRING
        },
        score: {
            type: Sequelize.INTEGER
        },
        favorite: {
            type: Sequelize.BOOLEAN
        },
        seen: {
            type: Sequelize.BOOLEAN
        },
        userEmail: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: db.users,
                key: 'email'
            }
        }
    });

    return Movie;
};