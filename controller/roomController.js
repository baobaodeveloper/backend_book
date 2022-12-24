import { Hotel } from '../models/Hotel.js';
import { Room } from '../models/Room.js';

export const createRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelid;
    const room = await Room.create(req.body);

    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { rooms: room._id },
    });
    res.status(200).json({
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json({
      room,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllRoom = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({
      rooms,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(201).json({
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRoomAvailable = async (req, res, next) => {
  try {
    const room = await Room.updateOne(
      {
        'roomNumbers._id': req.params.id,
      },
      {
        $push: {
          'roomNumbers.$.unavailableDates': req.body.dates,
        },
      }
    );
    res.status(200).json({
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelid;

    await Hotel.findByIdAndDelete(hotelId, {
      $pull: { rooms: req.params.id },
    });
    res.status(200).json({
      message: 'Room delete success',
    });
  } catch (error) {
    next(error);
  }
};
