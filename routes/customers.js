const express = require('express');
const router = express.Router();
const {Customer, validated} = require('../models/customerModel');

router.get('/', async(req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
})

router.get('/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer){
    res.status(404).send('Informations Not found...');
    }
    return res.send(customer);
})

router.post('/', async(req, res) => {
    const {error} = validated(req.body);
    if (error)
        res.status(400).send(error.details[0].message);
    let customer = new Customer({
        name: req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone
    });
    customer = await customer.save();
    return res.status(201).send(customer);
});

router.put('/:id', async(req, res) => {
    const {error} = validated(req.body);
    if(error){
      return  res.status(400).send(error.details[0].message); 
    }
    const customer = await Customer.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
    if(!customer){
       return res.status(404).send('Information Not foun...');
    }
    return res.send(customer);
})

router.delete('/:id', async(req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer){
       return res.status(404).send('Info Not foun...');
    }
    return res.send(customer);
})

module.exports = router;