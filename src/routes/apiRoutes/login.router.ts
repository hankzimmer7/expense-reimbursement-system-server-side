import express from 'express';
import * as UserDao from '../../dao/user.dao';

export const loginRouter = express.Router();

loginRouter.post('/', (req, res) => {
  async function login() {
    try {
      const users = await UserDao.findAllWithPasswords();
      let userFound = false;
      let passwordCorrect = false;
      // Check over each user
      users.forEach((user) => {
        // If the username exists in the database
        if (req.body.username === user.username) {
          userFound = true;
          // Check if the password is correct
          if (req.body.password === user.password) {
            passwordCorrect = true;
            console.log(`User ${req.body.username} successfully logged in`);
            const loggedInUser = {
              userId: user.userId,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role
            };
            // Attach the user to the session
            req.session.user = loggedInUser;
            res.json(loggedInUser);
          } else {
            console.log('password is incorrect');
          }
        }
      });

      // If the credentials are incorrect
      if (!userFound) {
        console.log(`User ${req.body.username} not found`);
        res.status(400);
        res.send('Invalid credentials');
      } else if (!passwordCorrect) {
        console.log('Password incorrect');
        res.status(400);
        res.send('Invalid credentials');
      }
    } catch (err) {
      throw ('Failed to retrieve all users');
    }
  }
  login();
});

loginRouter.get('/info', (req, res) => {
  res.json(req.session.user);
});