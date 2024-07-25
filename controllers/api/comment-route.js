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


// ------delete comment ------------------
router.delete('/:id', async (req, res) => {
    try {
        // delete comment based off id
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        if (!commentData) {
            res.status(404).json({ message: "Cannot find comment!" });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }   
});


module.exports = router;