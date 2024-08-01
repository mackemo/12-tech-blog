const withAuth = (req, res, next) => {
    // if user is not logged in, redirect to login page
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
    // if user logged in, move on to executing function the withAuth is in
        next();
    }
}

module.exports = withAuth;