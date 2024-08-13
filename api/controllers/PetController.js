const Pet = require("../models/Pet");

class PetController {
    static async create(req, res) {
        console.log(req.body)

        try {
            const newPet = await Pet.create(req.body);

            res.status(201).json(newPet);
        } catch (error) {
            console.log('=>', error.message);
            res.status(400).json({ error: error.message });
        }
    }

    static get() {

    }

    static put(data) {

    }

    static delete(id) {

    }
}
module.exports = { PetController }
