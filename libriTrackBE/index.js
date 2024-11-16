require('dotenv').config();

const express = require('express');
const cors = require('cors');

const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

var corsOptions = {
    origin: ['http://localhost:8081', 'http://localhost:4200', 'http://localhost:8100']
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require('./models');

// ESTE NO ELIMINA LA BASE DE DATOS
db.sequelize.sync();

// ESTE ELIMINA LA BASE DE DATOS
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to LibriTrack API.' });
});

require('./routes/book.routes')(app);
require('./routes/user.routes')(app);
require('./routes/movie.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    }
);