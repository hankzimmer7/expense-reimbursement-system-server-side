const router = require('express').Router();
import { loginRouter } from './apiRoutes/login.router';
import { logoutRouter } from './apiRoutes/logout.router';
import { userRouter } from './apiRoutes/user.router';
import { reimbursementRouter } from './apiRoutes/reimbursement.router';

// API Routes
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/users', userRouter);
router.use('/reimbursements', reimbursementRouter);

module.exports = router;