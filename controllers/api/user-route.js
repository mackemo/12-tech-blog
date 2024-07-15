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
            // displays user first and last name
            include: [
                {
                    model: Post,
                    attributes: ['post_title', 'post_text'],
                    // the user's posts with title and text
                    include: [
                        {
                            model: Comment,
                            attributes: ['comment_text'],
                            // includes comments on posts
                            include: [
                                {
                                    model: User,
                                    attributes: ['first_name', 'last_name']
                                    // includes the user's names that commented
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


// -----user signup-----------------------------
router.post('/signup', async (req, res) => {
    try {
        // check to see if user account with email exists already
        const existingUser = await User.findOne({ where: { email: req.body.email } });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // create user with the params
        const newUser = await User.create({
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
        });

        // saves the user info in session
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            res.status(200).json(newUser);
        });

    } catch (err) {
        res.status(500).json(err);
    }
});


// ------user login---------------------------------------------
router.post('/login', async (req, res) => {
    try {
        // find user by email
        const userData = await User.findOne({ where: { email: req.body.email } });
        
        if (!userData) {
            res.status(400).json({ message: 'No user with that email!' });
            return;
        }
        
        // check password is correct
        const validPassword = await userData.checkPassword(req.body.password);
  
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        
        // saves to session
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
    // destroys user session (logging out)
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });

    } else {
        res.status(404).end();
    }
})


// -----delete user------------------
router.delete('/:id', async (req, res) => {
    // find specific user session id
    const userId = req.session.user_id;
    
    try {
        // removes user by id
        await User.destroy({
            where: {
                id: userId
            }
        });

        res.status(200).json("Applicant deleted!");
    } catch (err) {
        res.status(400).json(err);
    }   
});
 

module.exports = router;