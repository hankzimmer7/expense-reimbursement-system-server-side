import express from 'express';
import { Reimbursement } from '../../models/reimbursement';
import * as ReimbursementDao from '../../dao/reimbursement.dao';
import { authMiddleware } from '../../middleware/auth.middleware';

export const reimbursementRouter = express.Router();

// -----------------GET routes----------------------------//

// /reimbursements - find all
reimbursementRouter.get('', [
  authMiddleware,
  async (req, res) => {
    try {
      const reimbursements = await ReimbursementDao.findAll();
      res.json(reimbursements);
    } catch (err) {
      res.sendStatus(500);
    }
  }]);

// /reimbursements/status/:statusId - find by status
reimbursementRouter.get('/status/:statusId', [
  authMiddleware,
  async (req, res) => {
    const statusId = +req.params.statusId;
    try {
      const reimbursements = await ReimbursementDao.findByStatus(statusId);
      res.json(reimbursements);
    } catch (err) {
      res.sendStatus(500);
    }
  }]);

  // /reimbursements/author/userId/:userId - find by user
reimbursementRouter.get('/author/userId/:userId', [
  authMiddleware,
  async (req, res) => {
    const userId = +req.params.userId;
    try {
      const reimbursements = await ReimbursementDao.findByUser(userId);
      res.json(reimbursements);
    } catch (err) {
      res.sendStatus(500);
    }
  }]);

// /reimbursements/:id - find by id
reimbursementRouter.get('/:id', [

  async (req, res) => {
    console.log(req.params);
    const idParam = +req.params.id;
    try {
      const reimbursement = await ReimbursementDao.findById(idParam);
      res.json(reimbursement);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }]
);

// -----------------POST routes----------------------------//

// /reimbursements - add a new a reimbursement
reimbursementRouter.post('', async (req, res) => {
  try {
    const reimbursement = await ReimbursementDao.save(req.body);
    res.status(200);
    res.json(reimbursement);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// -----------------PATCH routes----------------------------//

// /reimbursements - update a reimbursement
reimbursementRouter.patch('', async (req, res) => {
  try {
    const reimbursement = await ReimbursementDao.update(req.body);
    res.status(200);
    res.json(reimbursement);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});