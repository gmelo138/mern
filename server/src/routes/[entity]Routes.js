const express = require('express');
const {
    get[Entities],
    get[Entity],
    create[Entity],
    update[Entity],
    delete[Entity]
} = require('../controllers/[entity]Controller');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
    .route('/')
    .get(get[Entities])
    .post(protect, authorize('admin', 'user'), create[Entity]);

router
    .route('/:id')
    .get(get[Entity])
    .put(protect, authorize('admin', 'user'), update[Entity])
    .delete(protect, authorize('admin', 'user'), delete [Entity]);

module.exports = router;