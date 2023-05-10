import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../redux/actions/roomActions";
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import RoomFeatures from "./RoomFeatures";

const RoomDetails = () => {
  const dispatch = useDispatch();

  const { room, error } = useSelector((state) => state.roomDetails);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, []);

  return (
    <div className="container container-fluid">
      <h2 className="mt-5">{room?.name}</h2>

      <div className="ratings mt-auto mb-3">
        <div className="rating-outer">
          <div
            className="rating-inner"
            style={{ width: `${(room?.ratings / 5) * 100}%` }}
          ></div>
        </div>
        <span id="no_of_reviews">({room?.numOfReviews} Reviews)</span>
      </div>

      <Carousel pause="hover">
        {room &&
          room.images?.map((image) => {
            return (
              <Carousel.Item key={image._id}>
                <Image src={image.url} alt="room pic" layout="fill" />
              </Carousel.Item>
            );
          })}
      </Carousel>

      <div className="row my-5">
        <div className="col-12 col-md-6 col-lg-8">
          <h3>Description</h3>
          <p>{room.description}</p>

          <RoomFeatures room={room} />
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="booking-card shadow-lg p-4">
            <p className="price-per-night">
              <b>${room.pricePerNight}</b> / night
            </p>

            <button className="btn btn-block py-3 booking-btn">Pay</button>
          </div>
        </div>
      </div>

      <div className="reviews w-75">
        <h3>Reviews:</h3>
        <hr />
        <div className="review-card my-3">
          <div className="rating-outer">
            <div className="rating-inner"></div>
          </div>
          <p className="review_user">by John</p>
          <p className="review_comment">Good Quality</p>

          <hr />
        </div>

        <div className="review-card my-3">
          <div className="rating-outer">
            <div className="rating-inner"></div>
          </div>
          <p className="review_user">by John</p>
          <p className="review_comment">Good Quality</p>

          <hr />
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
