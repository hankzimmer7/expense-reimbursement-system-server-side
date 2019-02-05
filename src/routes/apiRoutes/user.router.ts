import express from 'express';
import * as UserDao from '../../dao/user.dao';
import { authAdminMiddleware } from '../../middleware/auth.admin.middleware';
import { authManagerMiddleware } from '../../middleware/auth.manager.middleware';

export const userRouter = express.Router();

// -----------------GET routes----------------------------//

// /users - find all
userRouter.get('', [
  authManagerMiddleware,
  async (req, res) => {
    try {
      const users = await UserDao.findAll();
      res.json(users);
    } catch (err) {
      res.sendStatus(500);
    }
  }]);

// /users/:id - find by id
userRouter.get('/:id', [
  authManagerMiddleware,
  async (req, res) => {
    const idParam = +req.params.id;
    try {
      const user = await UserDao.findById(idParam);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }]);

  // -----------------POST routes----------------------------//

// /users - add a new a user
userRouter.post('', [
  authAdminMiddleware,
  async (req, res) => {
    try {
      const user = await UserDao.save(req.body);
      res.status(200);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }]);

// -----------------PATCH routes----------------------------//

// /users - update a user
userRouter.patch('', [
  authAdminMiddleware,
  async (req, res) => {
    try {
      const user = await UserDao.update(req.body);
      res.status(200);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }]);