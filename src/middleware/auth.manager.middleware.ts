export function authManagerMiddleware(req, res, next) {
    const user = req.session.user;
    if (user && (user.role === 'admin' || user.role === 'finance-manager')) {
        next();
    } else {
        res.status(401);
        res.json({ message: 'The incoming token has expired' });
    }
}