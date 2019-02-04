export function authMiddleware(req, res, next) {
  // const user = req.session.user;
  // if (user && (user.role === 1 || user.role === 2)) {
    next();
  // } else {
  //   res.status(401);
  //   res.json({message: 'The incoming token has expired'});
  // }
}