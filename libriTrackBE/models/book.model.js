module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        author: {
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
        numberPages: {
            type: Sequelize.INTEGER
        },
        readPages: {
            type: Sequelize.INTEGER
        },
        score: {
            type: Sequelize.INTEGER
        },
        favorite: {
            type: Sequelize.BOOLEAN
        },
        read: {
            type: Sequelize.BOOLEAN
        },
    });

    return Book;
};