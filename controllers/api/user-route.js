const router = require('express').Router();

const { User, Post, Comment } = require('../../models');

// retrieve all users
router.get('/',async (req, res) => {
    try {
        await User.findAll({
            attributes: { exclude: ['[password'] }
        })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    } catch {

    }  
});