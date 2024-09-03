// This middleware checks if the user has a valid subscription to access the content video
const verifySubscriptionMiddleware = async (req, res, next) => {
    const subscription = req.user['cognito:groups'][0];
    const category  = req.params.category;

    const allowedBasicSubCategories = ['punish-game', 'neutral-game', 'edgeguard-game'];

    console.log('Subscription: ', subscription);
    console.log('Category: ', category);

    // NOTE: The middleware will change later depending if the melee community wants more content in the future. If so, new categories and subscription levels will be added.

    // If category is introduction, allow access to all users
    // Else if subscription is basic and category is in allowedBasicSubCategories, allow access to basic subcategories
    // Else, return 403 Forbidden
    if (category === 'introduction') {
        console.log('Access allowed. Video category is free. Proceeding with the request');
        next();
    } else if (subscription === 'Basic' && allowedBasicSubCategories.includes(category)) {
        console.log('Access allowed. User has basic subscription. Proceeding with the request');
        next();
    } else {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
}

module.exports = verifySubscriptionMiddleware;