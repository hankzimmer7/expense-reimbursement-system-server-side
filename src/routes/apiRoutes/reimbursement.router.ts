import express from 'express';
import { Reimbursement } from '../../models/reimbursement';
import * as ReimbursementDao from '../../dao/reimbursement.dao';
import { authMiddleware } from '../../middleware/auth.middleware';

export const reimbursementRouter = express.Router();

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

// // /reimbursements/:id - find by id
// reimbursementRouter.get('/:id', async (req, res) => {
//   console.log(req.params);
//   const idParam = +req.params.id;
//   try {
//     const reimbursement = await ReimbursementDao.findById(idParam);
//     res.json(reimbursement);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });