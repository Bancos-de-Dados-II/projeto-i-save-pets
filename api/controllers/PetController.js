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

    static async put(req, res) {
        try {
            const pet = await Pet.findByPk(req.params.id);

            if (pet == null) {
                res.status(404).json({ erro: "pet não encontrado" });
                return;
            }

            const { name, age, description, adoptionStatus } = req.body;

            pet.name = name;
            pet.age = age;
            pet.description = description;
            pet.adoptionStatus = adoptionStatus;

            await pet.save();
            res.json(pet);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static delete(id) {

    }
}
module.exports = { PetController }
