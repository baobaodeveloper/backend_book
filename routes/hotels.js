import express from 'express';
import {
  getHotel,
  createHotel,
  getAllHotel,
  updateHotel,
  deleteHotel,
  countBycity,
  countByType,
  getHotelRooms,
} from '../controller/hotelController.js';
import { verifyAdmin } from '../utils/veryfy.js';

const router = express.Router();

router.route('/').get(getAllHotel).post(createHotel);
router.route('/find/:id').get(getHotel);
router.route('/:id').patch(updateHotel).delete(deleteHotel);

router.route('/countByCity').get(countBycity);
router.route('/countByType').get(countByType);
router.route('/room/:id').get(getHotelRooms);

export default router;
