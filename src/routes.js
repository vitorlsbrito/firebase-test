const { Router } = require('express');

const StopsController = require('./app/controllers/StopsController');

const FireStore = require('./database/firestore');

const router = Router();

router.get('/', (req, res) => {
    res.json({ ok: true });
});

/* Stops */
router.get('/stops', StopsController.index);
router.get('/stops/:id', StopsController.show);
router.post('/stops', StopsController.store);
router.put('/stops/:id', StopsController.update);
router.delete('/stops/:id', StopsController.delete);

module.exports = router;
