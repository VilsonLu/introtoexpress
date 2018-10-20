const express = require('express');

const app = new express();

const coursesController = require('./coursesController');

app.use('/courses', coursesController);

const PORT = process.env.PORT || 3000
app.listen(PORT, function(){
    console.log("Running resthub on port " + PORT);
});