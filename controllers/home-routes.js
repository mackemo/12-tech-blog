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


// ---------Dashboard -----------------
router.get('/dashboard', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['post_title', 'post_text'],
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['comment_text'],
                    // includes comments on posts
                    include: [
                        {
                            model: User,
                            attributes: ['username']
                            // includes the user's names that commented
                        }
                    ]
                }
            ]
        })
        const posts = postData.map((post) => post.get({ plain: true }));

        // render to dashboard
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
       
    } catch (err) {
        res.status(500).json(err);
    }
});
    

module.exports = router;