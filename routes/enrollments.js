const { Enrollment, validate } = require('../models/enrollmentModel');
const { Course } = require('../models/coursesModel');
const { Customer } = require('../models/customerModel');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const enrollments = await Enrollment.find().sort('_dateStart');
    res.send(enrollments);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer)
        return res.status(404).send('Ma\'lumot mavjud emas...');
    
    const course = await Course.findById(req.body.courseId);
    if(!course)
        return res.status(404).send(`Ma'lumot mavjud emas...`);
    
    let enrollment = new Enrollment({
        customer: {
            _id: customer._id,
            name: customer.name
        },
        course: {
            _id: course._id,
            title: course.title
        },
        courseFee: course.fee
    });
    if(customer.isVip)
        enrollment.courseFee = course.fee - (0.2 * course.fee);
    
    enrollment = await enrollment.save();

    customer.bonusPoints++;
    customer.save();

    res.send(enrollment);
});

router.get('/:id', async (req, res) => {
    const enrollment = await Enrollment.findById(req.params.id);
    if(!enrollment)
        return res.send(404).send(`Ma'lumot mavjud emas...`);
    
    res.send(enrollment);    
});

module.exports = router;