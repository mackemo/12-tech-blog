const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


// retrieve all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// retrieve single user with corresponding posts
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: ['first_name', 'last_name'],
            include: [
                {
                    model: Post,
                    attributes: ['post_title', 'post_text'],
                    include: [
                        {
                            model: Comment,
                            attributes: ['comment_text'],
                            include: [
                                {
                                    model: User,
                                    attributes: ['first_name', 'last_name']
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        if (!userData) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;