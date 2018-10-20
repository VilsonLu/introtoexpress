const Joi = require('joi');
const express = require('express');
const router = require('express').Router();

router.use(express.json());

const courses = [
    {id: 1, course:'COMPRO1'},
    {id: 2, course:'COMPRO2'},
    {id: 3, course:'DASALGO'},
    {id: 4, course:'DISCTRU'},
    {id: 5, course:'MACHLRN'}
];


router.get('/', (req, res) => {
    res.send(courses);
});

// api/courses/1 
router.get('/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send("The course with the given ID was not found");

    res.send(course);

});

router.post('/', (req, res) => {

    const result = validateCourses(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
})

function validateCourses(courses){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(courses, schema);
}


module.exports = router;