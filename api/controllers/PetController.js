const _Pet = require("../models/PetSchema");
const { setRedis, getRedis } = require("../redisConfig");

class PetController {
    static async search(req, res) {
        try {
            if(req.query.name === '') {
                return res.status(200).json([]);
            }

            const result = await _Pet.aggregate([
                {
                    $search: {
                        index: "search-text",
                        text: {
                            query: req.query.name,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ]);

            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }
    static async create(req, res) {
        try {
            const petData = {
                ...req.body,
                age: Number(req.body.age),
                localization: { type: 'Point', coordinates: req.body.localization.coordinates }
            };
            const newPet = new _Pet(petData)
            const pet = await newPet.save()
            if (!pet) return res.status(400).json({ error: 'error create pet' })

            const cachedPets = await getRedis('pets');

            if (cachedPets) {
                const allPets = await _Pet.find({});
                await setRedis('pets', JSON.stringify(allPets));
            }

            res.status(201).json(pet);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async get(req, res) {
        try {
            const cachedPets = await getRedis('pets');

            if (cachedPets) {
                console.log('Returning cached pets');
                return res.status(200).json(JSON.parse(cachedPets));
            }

            const allPets = await _Pet.find({});
            await setRedis('pets', JSON.stringify(allPets));

            res.status(200).json(allPets);
        } catch (error) {
            console.error('Error fetching pets:', error);
            res.status(500).json({ error: error.message });
        }
    }


    static async put(req, res) {
        try {
            let pet = {}

            const { name, age, description, adoptionStatus, type } = req.body;

            pet.name = name;
            pet.age = age;
            pet.description = description;
            pet.adoptionStatus = adoptionStatus;
            pet.type = type

            await _Pet.findByIdAndUpdate(req.params.id, pet);

            const cachedPets = await getRedis('pets');

            if (cachedPets) {
                const allPets = await _Pet.find({});
                await setRedis('pets', JSON.stringify(allPets));
            }

            res.json(pet);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const pet = await _Pet.findByIdAndDelete(req.params.id);
            if (!pet) return res.status(404).json({ error: 'Pet not found' });

            const cachedPets = await getRedis('pets');

            if (cachedPets) {
                const allPets = await _Pet.find({});
                await setRedis('pets', JSON.stringify(allPets));
            }

            res.status(200).json(pet);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
module.exports = { PetController }
