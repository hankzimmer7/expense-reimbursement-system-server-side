export function authManagerOrUserMiddleware(req, res, next) {
    const user = req.session.user;
    console.log('req.params', req.params);
    console.log('req.session.user', req.session.user);
    if (user && (user.role === 'admin' || user.role === 'finance-manager' || +req.params.userId === req.session.user.user_id)) {
        next();
    } else {
        res.status(401);
        res.json({ message: 'The incoming token has expired' });
    }
}