import React from "react";
import Layout from "../../components/layout/Layout";
import { wrapper } from "../../redux/store";
import { getSession } from "next-auth/client";
import BookingDetails from "../../components/booking/BookingDetails";
import { bookingDetails } from "../../redux/actions/checkBookingAction";

const BookingDetailsPage = () => {
  return (
    <Layout title="Booking Details ">
      <BookingDetails />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, store, params }) => {
    const session = await getSession({ req });

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    await store.dispatch(bookingDetails(req.headers.cookie, req, params.id));
  }
);

export default BookingDetailsPage;
