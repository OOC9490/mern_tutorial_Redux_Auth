const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// GET api/items
// Get all items
// Public
router.get('/', (request, response) => {
    Item.find()
        .sort({ date: -1 }) //sorts items index by date entered in descending order
        .then(items => response.json(items))
        .catch(error => response.status(400).json(`Error: ${error}`));
})

// POST api/items/add
// Create an item
// Public
router.post('/add', (request, response) => {
    const newItem = new Item({
        name: request.body.name
    });

    newItem.save()
        .then(item => response.json(item))
        .catch(error => response.status(400).json('Error: ' + error));
});

// DELETE api/items/delete/:id
// Delete an item
// Public
router.delete('/delete/:id', (request, response) => {
    Item.findById(request.params.id)
        .then(item => item.remove().then(() => response.json(`${item.name} was removed from the shopping list!`)))
        .catch(error => response.status(404).json(`Error: ${error}`));
});

// give access to this file
module.exports = router;