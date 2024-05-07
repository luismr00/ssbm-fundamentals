// Basic middleware to protect routes
const protect = (req, res, next) => {
    const userToken = req.cookies.userToken;

    if (userToken) {
        // Perform any necessary verification/authentication logic
        next(); // User is authenticated, proceed to the next middleware or route handler
    } else {
        res.status(401).send('Unauthorized');
    }
};

module.exports = protect;
