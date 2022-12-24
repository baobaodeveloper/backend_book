import express from 'express';
import {
  getRoom,
  createRoom,
  getAllRoom,
  updateRoom,
  deleteRoom,
  updateRoomAvailable,
} from '../controller/roomController.js';
import { verifyAdmin } from '../utils/veryfy.js';

const router = express.Router();

router.route('/').get(getAllRoom);
router.route('/:hotelid').post(createRoom);
router.route('/:id').get(getRoom).patch(updateRoom);
router.route('/availability/:id').put(updateRoomAvailable);
router.route('/:id/:hotelid').delete(deleteRoom);

export default router;
