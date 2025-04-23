const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://netninja:test123@cluster0.ricgj.mongodb.net/node-tut?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result) => {
    console.log("connected to db");
    app.listen(3000);
})
.catch((err) => console.log(err));

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//view engine
app.set('view engine', 'ejs');

//routing
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

//blog routes
app.use(blogRoutes);
  
//404 page
app.use((req, res) => {
    res.status(404).render('404.ejs');
})