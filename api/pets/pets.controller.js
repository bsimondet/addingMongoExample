'use strict';

var mongoose = require('mongoose');

// Defining Model
// =====================================================

var Pet = mongoose.model('Pet', {
    text: String,
    weight: String
});

// Defining Routes
// =====================================================

exports.index = function(req, res) {
    Pet.find(function (err, pets) {
        if (err) {
            console.log("Error getting data from database");
            res.send(err)
        } else {
            res.json(pets); // return results
        }
    });
};

exports.create = function(req, res) {
    Pet.create(req.body, function (err, pet) {
        if (err) {
            res.send(err);
        } else {
            Pet.find(function (err, pets) {
                if (err) {
                    res.send(err);
                }

                res.json(pets);
            });
        }
    });
};

exports.destroy = function(req, res) {
    Pet.findById(req.params.pet_id, function(err, pet){
      if(err) { res.send(err); return "error: " + err; }
      if(!pet) { return res.sendStatus(404); }

      pet.remove(function(err){
         if(err) { return "error: " + err}
         return res.sendStatus(204);
      });
    });
};