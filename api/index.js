const express = require('express')
const { PetController } = require('./controllers/PetController')
const cors = require('cors');

require('./dbmongo')

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

app.get('/search', function (req, res) {
    PetController.search(req, res)
})


app.listen(3333, () => {
    console.log('Server is running on port 3333')
})