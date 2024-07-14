const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


// ----retrieve all users-------------------------
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


// retrieve single user with corresponding posts --------------
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


// ------user login---------------------------------------------
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        
        if (!userData) {
            res.status(400).json({ message: 'No user with that email!' });
            return;
        }
  
        const validPassword = await userData.checkPassword(req.body.password);
  
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
  
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
    });
  
    } catch (err) {
        res.status(400).json(err);
    }
});


// -----user logout----------
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });

    } else {
        res.status(404).end();
    }
})



module.exports = router;