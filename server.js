const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const db = "mongodb+srv://Mridul:Bagri@cluster0.gacsq.mongodb.net/TechnoColabs?retryWrites=true&w=majority";
const PORT = 5501;

app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log(`connection successful`)).catch((err) => console.log(`no connection`));

//create data schema
const courseSchema = new mongoose.Schema({
    Name: {
        type: String
    },
    Email: {
        type: String
    },
    PhoneNo: {
        type: Number
    },
});

const Course = mongoose.model('remainder', courseSchema);

module.exports = Course;


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    let newrem = new Course({
        Name: req.body.Name,
        Email: req.body.Email,
        PhoneNo: req.body.Phone
    });
    newrem.save();
    res.redirect('/');
})

app.listen(PORT, function() {
    console.log(`The server is running on port ${PORT}`);
});