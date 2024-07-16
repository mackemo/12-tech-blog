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
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            post_title: req.body.post_title,
            post_text: req.body.post_text,
            user_id: req.session.user_id
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});


// ------update post ------------------
router.put('/:id', async (req, res) => {
    try {
        // update post on title and text 
        const postData = await Post.update({
            post_title: req.body.post_title,
            post_text: req.body.post_text,
        }, 
        {
            where: {
                id: req.params.id
            }
        });

        if (!postData) {
            res.status(404).json({ message: "Cannot find post!" });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// ------delete post ------------------
router.delete('/:id', async (req, res) => {
    try {
        // delete post based off id
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        if (!postData) {
            res.status(404).json({ message: "Cannot find post!" });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }   
});


module.exports = router;