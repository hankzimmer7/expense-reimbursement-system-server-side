import express from 'express';

export const logoutRouter = express.Router();

logoutRouter.get('/', (req, res) => {
    if (req.session) {
        req.session.destroy;
    }
    res.status(200);
    res.send('Logged Out');
});