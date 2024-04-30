// routes/api/lamps.js

const express = require('express');
const router = express.Router();

// Load Lamp model
const Lamp = require('../../models/Lamp');

// @route   GET api/lamps/test
// @desc    Tests lamps route
// @access  Public
router.get('/test', (req, res) => res.send('lamp route testing!'));

// @route   GET api/lamps
// @desc    Get all lamps
// @access  Public
router.get('/', (req, res) => {
    Lamp.find()
      .then(lamps => res.json(lamps))
      .catch(err => res.status(404).json({ nolampsfound: 'No Lamps found' }));
});

// @route   GET api/lamps/?minPrice=:minPrice&maxPrice=:maxPrice&lampType=:lampType
// @desc    Get single lamp by id
// @access  Public
router.get('/filter/:minPrice/:maxPrice/:lampType', (req, res) => {
  minPrice = req.params.minPrice;
  maxPrice = req.params.maxPrice;
  lamp_type = req.params.lampType;
  var query = { price: { $gte: minPrice, $lte: maxPrice },
                lamp_type: lamp_type};
  if (maxPrice === "any" && lamp_type === "any") {
    query = { price: { $gte: minPrice }};
  }
  else if (maxPrice === "any") {
    query = { price: { $gte: minPrice },
              lamp_type: lamp_type }
  }
  else if (lamp_type === "any") {
    query = { price: { $gte: minPrice, $lte: maxPrice }}
  }

  //console.log(query)
  Lamp.find(query)
    .then(lamps => res.json(lamps))
    .catch(err => res.status(404).json({ nolampsfound: 'No Lamps found' }));
});

// @route   GET api/lamps/:id
// @desc    Get single lamp by id
// @access  Public
router.get('/:id', (req, res) => {
  console.log("id")
  Lamp.findById(req.params.id)
    .then(lamp => res.json(lamp))
    .catch(err => res.status(404).json({ nolampfound: 'No Lamp found' }));
});

// @route   POST api/lamps
// @desc    Add/save lamp
// @access  Public
router.post('/', (req, res) => {
  Lamp.create(req.body)
    .then(lamp => res.json({ msg: 'Lamp added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this lamp' }));
});

// @route   PUT api/lamps/:id
// @desc    Update lamp by id
// @access  Public
router.put('/:id', (req, res) => {
  Lamp.findByIdAndUpdate(req.params.id, req.body)
    .then(lamp => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route   DELETE api/lamps/:id
// @desc    Delete lamp by id
// @access  Public
router.delete('/:id', (req, res) => {
  Lamp.findByIdAndDelete(req.params.id)
    .then(lamp => res.json({ mgs: 'Lamp entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a lamp' }));
});

module.exports = router;