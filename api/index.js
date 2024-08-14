const express = require('express')
const { PetController } = require('./controllers/PetController')
const { sequelize } = require('./db')
const { Pet } = require('./models/Pet')
const cors = require('cors');

const app = express()
app.use(express.json());
app.use(cors({ origin: '*' }));

app.post('/pet', function (req, res) {
    PetController.create(req, res)
})

app.get('/pets', function (req, res) {
    PetController.get(req, res)
})

app.put('/pet/:id', function (req, res) {
    PetController.put(req, res)
})

app.delete('/pet/:id', function (req, res) {
    PetController.delete(req, res)
})

conectar = async () => {
    try {
        await sequelize.authenticate();
        Pet.sync()
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

app.listen(3333, () => {
    console.log('Server is running on port 3333')
    conectar()
})