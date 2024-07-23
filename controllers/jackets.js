const express = require('express');
const router = express.Router();

const Jacket = require('../models/jacket');


router.get('/', async (req, res) => {
    try {
        const jackets = await Jacket.find({}).populate('name');
        console.log(jackets); 

        res.render('jackets/index.ejs', {
            jackets: jackets
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const jacket = await Jacket.findById(req.params.id).populate('name');
        
        const alreadyFavorited = jacket.favoritedByUsers.some((userId) => userId.equals(req.session.user._id));
        
        res.render('jackets/show.ejs', {
            jacket: jacket,
            alreadyFavorited: alreadyFavorited
        });
    } catch (error) {
        console.log(error);
        res.redirect('/jackets');
    }
});

router.post('/:id/favorite', async (req, res) => {
    try {
        await Jacket.findByIdAndUpdate(req.params.id, {
            $push: { favoritedByUsers: req.session.user._id }
        })
    } catch (error) {
        console.log(error)
    }
    res.redirect('/jackets/' + req.params.id);
});


router.delete('/:id/favorites', async (req, res) => {
    try {
        await Jacket.findByIdAndUpdate(req.params.id, {
            $pull: { favoritedByUsers: req.session.user._id }
        });
    } catch (error) {
        console.log(error)
    }
    res.redirect('/jacket/' + req.params.id);
})

module.exports = router;