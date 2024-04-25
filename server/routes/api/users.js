// routes/api/users.js

const express = require('express');
const router = express.Router();

// Load User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.send('user route testing!'));

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: 'No User found' }));
});

// @route   GET api/users/:id
// @desc    Get single user by id
// @access  Public
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: 'No User found' }));
});

// @route   GET api/users/:email/:password
// @desc    Get single user by email and password
// @access  Public
router.get('/:email/:password', (req, res) => {
  User.find({ "email" : req.params.email, "password" : req.params.password })
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: 'No User found' }));
});

// @route   POST api/users
// @desc    Add/save user
// @access  Public
router.post('/', (req, res) => {
  User.create(req.body)
    .then(user => res.json({ msg: 'User added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
});

// @route   PUT api/users/:id
// @desc    Update user by id
// @access  Public
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route   DELETE api/users/:id
// @desc    Delete user by id
// @access  Public
router.delete('/:id', (req, res) => {
  console.log(req.params);
  User.findByIdAndDelete(req.params.id)
    .then(user => res.json({ mgs: 'User entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a user' }));
});

module.exports = router;