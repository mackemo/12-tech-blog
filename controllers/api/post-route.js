const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


// ----retrieve all posts with usernames-------------------------
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            // displays all posts with usernames that posted
            attributes: ['post_title', 'post_text'],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ]
        });
        
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// retrieve single post with corresponding comments --------------
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: ['post_title', 'post_text'],
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

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// --------create post -----------------
router.post('/create', async (req, res) => {
    try {
        const newPost = await Post.create({
            post_title: req.body.post_title,
            post_text: req.body.post_text,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;