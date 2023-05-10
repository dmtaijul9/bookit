import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import RoomItem from "./room/RoomItem";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { useRouter } from "next/router";
import Link from "next/link";

const Home = () => {
  const { rooms, error, resPerPage, roomsCount, filteredRoomsCount } =
    useSelector((store) => store.allRooms);

  let { page = 1 } = useRouter().query;
  page = Number(page);
  const { location } = useRouter().query;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, []);

  const handlePageChange = (pageNumber) => {
    window.location.href = `/?page=${pageNumber}`;
  };

  return (
    <>
      <section id="rooms" className="container mt-5">
        {location ? (
          <h2 className="mb-3 ml-2 stays-heading">
            {location ? `Rooms in ${location}` : "All Rooms"}
          </h2>
        ) : null}

        <Link href="/search">
          <a className="ml-2 back-to-search">
            <i className="fa fa-arrow-left"></i> Back to Search
          </a>
        </Link>
        <div className="row">
          {rooms && rooms.length <= 0 ? (
            <div className="alert alert-danger">
              <b>No Rooms.</b>
            </div>
          ) : (
            rooms &&
            rooms.map((room) => <RoomItem room={room} key={room._id} />)
          )}
        </div>
      </section>
      {resPerPage < roomsCount && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={roomsCount}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="First"
            lastPageText="Last"
          />
        </div>
      )}
    </>
  );
};

export default Home;
