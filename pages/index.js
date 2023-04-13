import Layout from "../components/layout/Layout";
import Home from "../components/Home";
import { wrapper } from "../redux/store";
import { getRooms } from "../redux/actions/roomActions";

export default function HomePage() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, store }) => {
    await store.dispatch(getRooms(req));
  }
);
