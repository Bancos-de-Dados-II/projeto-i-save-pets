const Pet = require("../models/Pet");

class PetController {
    static async create(req, res) {
        try {
            const newPet = await Pet.create(req.body);

            res.status(201).json(newPet);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async get(req, res) {
        try {
            const allPets = await Pet.findAll()

            res.status(200).json(allPets);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static put(data) {

    }

    static delete(id) {

    }
}
module.exports = { PetController }
