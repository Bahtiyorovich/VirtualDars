const express = require('express');
const categoriesRouter = require('./routes/categories');
const customersRouter = require('./routes/customers');
const coursesRouter = require('./routes/courses');
const enrollments = require('./routes/enrollments');
const app = express(); 

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/virtualdasr', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDbga ulanish hosil qilindi...');
    })
    .catch((err) => {
        console.log('MongoDbga ulanish vaqtida xatolik yuz berdi...', err);
    });

app.use(express.json());
app.use('/api/categories', categoriesRouter);
app.use('/api/customers', customersRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/enrollments', enrollments);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`${port} - portni tinglashni boshladim... `);
})





