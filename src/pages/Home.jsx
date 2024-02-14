import CustomDialog from "../components/CustomDialog";

const Home = () => {
  return (
    <div>
      <h1 className="text-4xl font-semibold text-white">
        <CustomDialog />
      </h1>
      <p className="text-white">
        Welcome to the home page. This is a protected route.
      </p>
    </div>
  );
};

export default Home;
