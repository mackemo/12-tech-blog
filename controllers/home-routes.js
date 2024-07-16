const router = require('express').Router();
const { User, Post, Comment } = require('../models');


// ---------Homepage -----------------
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            // displays all posts with usernames that posted
            attributes: ['post_title', 'post_text'],
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['username'],
                }
            ]
        });
        const posts = postData.map((post) => post.get({ plain: true }));

        // render to homepage
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
       
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;