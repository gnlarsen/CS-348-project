// routes/api/comments.js

const express = require('express');
const router = express.Router();

// Load Comment model
const Comment = require('../../models/Comment');

// @route   GET api/comments/test
// @desc    Tests comments route
// @access  Public
router.get('/test', (req, res) => res.send('comment route testing!'));

// @route   GET api/comments
// @desc    Get all comments
// @access  Public
router.get('/', (req, res) => {
  Comment.find()
    .then(comments => res.json(comments))
    .catch(err => res.status(404).json({ nocommentsfound: 'No Comments found' }));
});

// @route   GET api/comments/:id
// @desc    Get single comment by id
// @access  Public
router.get('/:id', (req, res) => {
  Comment.findById(req.params.id)
    .then(comment => res.json(comment))
    .catch(err => res.status(404).json({ nocommentfound: 'No Comment found' }));
});

// @route   GET api/comments/lamp/:lamp_id
// @desc    Get all comments by lamp_id
// @access  Public
router.get('/lamp/:lamp_id', (req, res) => {
  //console.log(req.params);
  Comment.find({ "lamp_id" : req.params.lamp_id })
    .then(comments => res.json(comments))
    .catch(err => res.status(404).json({ nocommentfound: 'No Comment found' }));
});

// @route   POST api/comments
// @desc    Add/save comment
// @access  Public
router.post('/', (req, res) => {
  //console.log(req.body);
  Comment.create(req.body)
    .then(comment => res.json({ msg: 'Comment added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this comment' }));
});

// @route   PUT api/comments/:id
// @desc    Update comment by id
// @access  Public
router.put('/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body)
    .then(comment => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route   DELETE api/comments/:id
// @desc    Delete comment by id
// @access  Public
router.delete('/:id', (req, res) => {
  Comment.findByIdAndDelete(req.params.id)
    .then(comment => res.json({ mgs: 'Comment entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a comment' }));
});

module.exports = router;