const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


// ----retrieve all posts with usernames-------------------------
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
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


module.exports = router;