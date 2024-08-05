const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// --------create post -----------------
router.post('/', withAuth, async (req, res) => {
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
router.put('/:id', withAuth, async (req, res) => {
    try {
        // update post's title and text
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
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
router.delete('/:id', withAuth, async (req, res) => {
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