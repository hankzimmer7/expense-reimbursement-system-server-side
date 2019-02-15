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
      console.log(err);
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

  // /users/username/:name - find by username, first name, or last name
userRouter.get('/username/:name', [
  authManagerMiddleware,
  async (req, res) => {
    const NameParam = req.params.name;
    try {
      const user = await UserDao.findByName(NameParam);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }]);

  // /users/nojoin/:id - find by id and don't join the role - this is used on the front-end for updating the user
userRouter.get('/nojoin/:id', [
  authManagerMiddleware,
  async (req, res) => {
    const idParam = +req.params.id;
    try {
      const user = await UserDao.findByIdNoJoin(idParam);
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