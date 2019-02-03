// const path = require('path');
const router = require('express').Router();
import { loginRouter } from './apiRoutes/login.router';
import { userRouter } from './apiRoutes/user.router';
import { reimbursementRouter } from './apiRoutes/reimbursement.router';

// API Routes
router.use('/login', loginRouter);
router.use('/users', userRouter);
router.use('/reimbursements', reimbursementRouter);

// If no API routes are hit, send index.html
// router.use(function (req, res) {
//     res.sendFile(path.join(__dirname, '../../client/public/index.html'));
// });


module.exports = router;