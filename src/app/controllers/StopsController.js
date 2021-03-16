const StopRepository = require('../repositories/StopRepository');

class StopsControllers {
    async index(req, res) {
        const entries = await StopRepository.findAll();

        res.json(entries);
    }

    async show(req, res) {
        const { id } = req.params;

        const entry = await StopRepository.findById(id);

        res.json(entry);
    }

    async store(req, res) {
        const { bus, trip, stop, label, address, latitude, longitude } = req.body;

        const entry = await StopRepository.store({ bus, trip, stop, label, address, latitude, longitude });

        res.json(entry);
    }

    async update(req, res) {

    }

    async delete(req, res) {

    }
}

module.exports = new StopsControllers();
