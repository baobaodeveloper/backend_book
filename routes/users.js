import express from 'express';
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from '../controller/userController.js';
import { verifyUser, verifyAdmin } from '../utils/veryfy.js';

const router = express.Router();

// router
//   .route('/:id')
//   .patch(verifyUser, updateUser)
//   .delete(verifyUser, deleteUser)
//   .get(verifyUser, getUser);
router
  .route('/:id')
  .patch(updateUser)
  .delete(deleteUser)
  .get(getUser);

// router.route('/').get(verifyAdmin, getAllUser);
router.route('/').get(getAllUser);

export default router;
