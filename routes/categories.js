const express = require('express');
const router = express.Router();
const {Category, validated} = require('../models/categoryModel');

router.get('/', async(req, res) => {
    const categories = await Category.find().sort('name');
    res.send(categories);
})

router.get('/:id', async(req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category){
    res.status(404).send('Informations Not found...');
    }
    return res.send(category);
})

router.post('/', async(req, res) => {
    const {error} = validated(req.body);
    if (error)
        res.status(400).send(error.details[0].message);
    let category = new Category({
        name: req.body.name
    });
    category = await category.save();
    return res.status(201).send(category);
});

router.put('/:id', async(req, res) => {
    const {error} = validated(req.body);
    if(error){
      return  res.status(400).send(error.details[0].message); 
    }
    const category = await Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
    if(!category){
       return res.status(404).send('Information Not foun...');
    }
    return res.send(category);
})

router.delete('/:id', async(req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);
    if(!category){
       return res.status(404).send('Info Not foun...');
    }
    return res.send(category);
})

module.exports = router;