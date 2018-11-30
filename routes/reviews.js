const express = require('express');
const router = express.Router({mergeParams:true});
const Training =  require('../models/training');
const Review = require('../models/review');
const middleware = require('../middleware');


//Review Index Route
router.get('/', (req, res) => {
    Training.findById(req.params.id).populate({
        path: 'reviews',
        options: {sort: {createdAt: -1}}
    }).exec((err, training) => {
        if (err && !training) {
            req.flash('error', err.message);
            return res.redirect('back');
        } else {
            res.render('reviews/index', {training: training});
        }
    })
})