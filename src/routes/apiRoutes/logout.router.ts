import express from 'express';

export const logoutRouter = express.Router();

// Logs out the current user
logoutRouter.get('/', (req, res) => {
    if (req.session) {
        req.session.user = {
            username: '',
            password: ''
        };
    }
    res.status(200);
    res.send('Logged Out');
});