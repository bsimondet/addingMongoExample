'use strict';

var mongoose = require('mongoose');

// Defining Model
// =====================================================

var dbClass = mongoose.model('Classes', {
    class: String,
    grade: String,
    credits: String
});

// Defining Routes
// =====================================================

exports.index = function(req, res) {
    dbClass.find(function (err, classes) {
        if (err) {
            console.log("Error getting data from database");
            res.send(err)
        } else {
            res.json(classes); // return results
        }
    });
};

exports.create = function(req, res) {
    dbClass.create(req.body, function (err,classes) {
        if (err) {
            res.send(err);
        } else {
            dbClass.find(function (err, classes) {
                if (err) {
                    res.send(err);
                }
                res.json(classes);
            });
        }
    });
};

exports.destroy = function(req, res) {
    dbClass.findById(req.params.class_id, function(err, dbClass){
        if(err) { res.send(err); return "error: " + err; }
        if(!dbClass) { return res.sendStatus(404); }

        dbClass.remove(function(err){
            if(err) { return "error: " + err}
            return res.sendStatus(204);
        });
    });
};