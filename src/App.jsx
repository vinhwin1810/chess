import React from "react";
import VerticalTiles from "./components/animata/preloader/vertical-tiles.jsx";

function App() {
  return (
    <div className="bg-zinc-800">
      <VerticalTiles
        animationDelay={0.2}
        animationDuration={0.5}
        minTileWidth={32}
        stagger={0.05}
        tileClassName="bg-gradient-to-r from-zinc-100 to-zinc-300"
      />
    </div>
  );
}

export default App;
