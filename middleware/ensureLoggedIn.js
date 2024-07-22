const ensureLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/auth/sign-in');
    }
};

module.exports = ensureLoggedIn;