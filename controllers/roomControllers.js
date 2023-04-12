import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";

//get all rooms => /api/rooms

const allRooms = catchAsyncErrors(async (req, res) => {
  const resPerPage = 4;

  const roomsCount = await Room.countDocuments();

  const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter();

  let rooms = await apiFeatures.query;

  const filteredRoomsCount = rooms.length;
  rooms = await new APIFeatures(Room.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage).query;

  res.status(200).json({
    success: true,
    roomsCount,
    resPerPage,
    filteredRoomsCount,
    rooms,
  });
});

//Create new room =>  /api/rooms

const newRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.create(req.body);

  res.status(200).json({
    success: true,
    room,
  });
});

//Get room details => /api/rooms:id

const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    /* res.status(404).json({
        success: false,
        message: "Room not found with this ID",
      }); */
    return next(new ErrorHandler("Room not found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    room,
  });
});

//Update room details => /api/rooms:id

const updateRoom = catchAsyncErrors(async (req, res, next) => {
  let room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room not found with this ID", 404));
  }

  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    room,
  });
});

//Delete room =>  /api/rooms/:id
const deleteRoom = catchAsyncErrors(async (req, res, next) => {
  let room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room not found with this ID", 404));
  }

  await Room.findByIdAndRemove(req.query.id);

  res.status(200).json({
    success: true,
    message: "Room is deleted successfully",
  });
});

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
