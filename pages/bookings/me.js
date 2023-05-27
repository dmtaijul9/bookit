import React from "react";
import Layout from "../../components/layout/Layout";
import MyBookingsComponent from "../../components/booking/MyBookings";
import { wrapper } from "../../redux/store";
import { getSession } from "next-auth/client";
import { myBookings } from "../../redux/actions/checkBookingAction";

const MyBookings = () => {
  return (
    <Layout title="My Bookings">
      <MyBookingsComponent />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, store }) => {
    const session = await getSession({ req });

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    await store.dispatch(myBookings(req.headers.cookie, req));
  }
);

export default MyBookings;
