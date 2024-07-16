const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


// --------create comment -----------------
router.post('/', async (req, res) => {
    try {
        // create comment with text, user and post id
        const newComment = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;