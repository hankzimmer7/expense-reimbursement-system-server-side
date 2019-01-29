const path = require('path');
const router = require('express').Router();
import { authRouter } from './apiRoutes/auth.router';
import { userRouter } from './apiRoutes/user.router';

// API Routes
router.use('/auth', authRouter);
router.use('/users', userRouter);

// If no API routes are hit, send index.html
// router.use(function (req, res) {
//     res.sendFile(path.join(__dirname, '../../client/public/index.html'));
// });


module.exports = router;