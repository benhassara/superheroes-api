var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Superhero = mongoose.model('superheroes');


router.get('/superheroes', function(req, res) {
  Superhero.find(function(err, superheroes) {
    console.log(superheroes);
    res.render(
    'api',
    {title: 'Superhero API',
     superheroes: superheroes});
  });
});

router.post('/superheroes', function(req, res) {
  new Superhero({name: req.body.name})
      .save(function(err, superhero) {
        console.log(superhero);
        res.redirect('/api/superheroes');
      });
});

router.get('/superhero/:id', function(req, res) {
  var query = {"_id": req.params.id};
  Superhero.findOne(query, function(err, superhero){
    console.log(superhero);
    res.render(
      'superhero',
      {title : 'Superhero API - ' + superhero.name, superhero : superhero}
    );
  });
});

module.exports = router;
