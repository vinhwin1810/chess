import chess from "../assets/chess.png";

const Home = () => {
  return (
    <div className="bg-gray-800">
      <div className="h-screen w-full overflow-hidden">
        <img src={chess} />
      </div>
    </div>
  );
};

export default Home;
