const Joi = require('joi');
const express = require('express');

const app = new express();

app.use(express.json());

const courses = [
    {id: 1, course:'COMPRO1'},
    {id: 2, course:'COMPRO2'},
    {id: 3, course:'DASALGO'},
    {id: 4, course:'DISCTRU'},
    {id: 5, course:'MACHLRN'}
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// api/courses/1 
app.get('/api/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send("The course with the given ID was not found");

    res.send(course);

});

app.post('/api/courses', (req, res) => {

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    
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

const PORT = process.env.PORT || 3000
app.listen(PORT, function(){
    console.log("Running resthub on port " + PORT);
});