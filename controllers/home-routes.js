const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


// ---------Homepage -----------------
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            // displays all posts with usernames that posted
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ],
            order: [["post_date", "DESC"]]
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
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: User,
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
            ],
            order: [["post_date", "DESC"]]
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


// --------Single Post ------------
router.get('/single-post/:id', async (req, res) => {
    console.log('Fetching post with ID:', req.params.id)
    try {
        const postData = await Post.findByPk(req.params.id, {
            // displays post title and text
            include: [
                {
                    model: User,
                    attributes: ['first_name', 'last_name']
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
        });

        if (!postData) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        const post = postData.get({ plain: true });
        const userId = req.session.userId;

        // render the post to single post page
        res.render('single-post', {
            post,
            userId,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// ---------Create Post -----------------
router.get('/create-post', withAuth, async (req, res) => {
    try {
        // render create post page
        res.render('createpost', {
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// ---------Edit Post -----------------
router.get('/edit-post/:id', withAuth, async (req, res) => {
    try {
        // find specific post
        const postData = await Post.findByPk(req.params.id);
  
        if (!postData) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
  
        const post = postData.get({ plain: true });
        
        // render edit post page
        res.render('editpost', {
            post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// ---------Login------------------
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
  
    res.render('login');
});


// ---------Signup------------------
router.get('/signup', (req, res) => {
    res.render('signup');
});

        
module.exports = router;