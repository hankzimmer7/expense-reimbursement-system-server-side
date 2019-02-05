export function authAdminMiddleware(req, res, next) {
  const user = req.session.user;
  if (user && (user.role === 1)) {
    next();
  } else {
    res.status(401);
    res.json({ message: 'The incoming token has expired' });
  }
}