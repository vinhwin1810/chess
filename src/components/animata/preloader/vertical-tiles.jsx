// VerticalTiles.js - Main animation component
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Using react-router instead of Next.js Link
import { cn } from "../../../libs/utils";
import ChessGame from "../../ChessGame";

function VerticalTiles({
  tileClassName,
  minTileWidth = 32,
  animationDuration = 0.5,
  animationDelay = 1,
  stagger = 0.05,
}) {
  const [tiles, setTiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  const calculateTiles = useCallback(() => {
    if (containerRef.current) {
      const { offsetWidth: width } = containerRef.current;
      const tileCount = Math.max(3, Math.floor(width / minTileWidth));
      const tileWidth = width / tileCount + 1;

      const newTiles = Array.from({ length: tileCount }, (_, index) => ({
        id: index,
        width: tileWidth,
        order: Math.abs(index - Math.floor((tileCount - 1) / 2)),
      }));

      setTiles(newTiles);
    }
  }, [minTileWidth]);

  useEffect(() => {
    calculateTiles();
    const resizeObserver = new ResizeObserver(calculateTiles);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [calculateTiles]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTiles = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      {!isLoaded && (
        <div className="fixed inset-0 flex items-center justify-center bg-white text-black z-50">
          <p className="text-4xl font-bold">Loading...</p>
        </div>
      )}
      <div
        ref={containerRef}
        className="relative overflow-hidden h-screen w-full"
      >
        {/* Tiles (Click to Open/Close) */}
        <div
          className="absolute inset-0 flex pointer-events-auto"
          onClick={toggleTiles}
        >
          {tiles.map((tile) => (
            <motion.div
              key={tile.id}
              className={cn("bg-gray-800", tileClassName)}
              style={{
                width: tile.width,
                position: "absolute",
                left: `${(tile.id * 100) / tiles.length}%`,
                top: 0,
                height: "100%",
                zIndex: 20,
              }}
              initial={{ y: 0 }}
              animate={{ y: isOpen ? "100%" : "0%" }}
              transition={{
                duration: animationDuration,
                delay: animationDelay + tile.order * stagger,
                ease: [0.45, 0, 0.55, 1],
              }}
            />
          ))}
        </div>

        <div className="absolute h-screen w-full bg-zinc-800 space-y-6 inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          {/* Show button after tiles are ready to dashboard*/}
          <div className="pointer-events-auto mt-4">
            <ChessGame />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerticalTiles;
