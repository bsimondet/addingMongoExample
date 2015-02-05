'use strict';

var mongoose = require('mongoose');

// Defining Model
// =====================================================

var Classes = mongoose.model('Class', {
    class: String,
    grade: String,
    credits: String
});

// Defining Routes
// =====================================================

exports.index = function(req, res) {
    Classes.find(function (err, classes) {
        if (err) {
            console.log("Error getting data from database");
            res.send(err)
        } else {
            res.json(pets); // return results
        }
    });
};

exports.create = function(req, res) {
    Classes.create(req.body, function (err, classes) {
        if (err) {
            res.send(err);
        } else {
            Classes.find(function (err, pets) {
                if (err) {
                    res.send(err);
                }

                res.json(pets);
            });
        }
    });
};

exports.destroy = function(req, res) {
    Classes.findById(req.params.class_id, function(err, classes){
        if(err) { res.send(err); return "error: " + err; }
        if(!classes) { return res.sendStatus(404); }

        Classes.remove(function(err){
            if(err) { return "error: " + err}
            return res.sendStatus(204);
        });
    });
};