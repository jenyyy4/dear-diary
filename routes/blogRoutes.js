const express = require('express');
const Blog = require('../models/blog');
const blogController = require('../controller/blogController');
const router = express.Router();


router.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});
  
router.get('/blogs', blogController.blog_index);

router.post('/blogs', (req, res) => {
    console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
    .then((result) => res.redirect('/blogs'))
    .catch((err) => console.log(err));
})
  
router.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        console.log(err);
      });
});
  
router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
});

module.exports = router;