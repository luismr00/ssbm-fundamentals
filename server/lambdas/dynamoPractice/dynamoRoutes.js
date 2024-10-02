const express = require('express');
const router = express.Router();
const dynamoControllers = require('./dynamoControllers');

router.post('/create', dynamoControllers.createItem);
router.get('/read/:id', dynamoControllers.getItem);
router.put('/update/:id', dynamoControllers.updateItem);
router.delete('/delete/:id', dynamoControllers.deleteItem);

// Other advanced queries will be added here
router.post('/filter', dynamoControllers.filterItems);

module.exports = router;