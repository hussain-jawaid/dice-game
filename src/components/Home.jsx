import { Link } from "react-router-dom";
import "../CSS/home.css";

export default function Home() {
  return (
    <section className="w-full px-6 md:px-28 py-10 min-h-screen flex flex-col md:flex-row">
      {/* Left Side Image */}
      <div
        id="image"
        className="w-full md:w-1/2 flex items-center justify-center mb-10 md:mb-0"
      >
        <img src="/images/dices.png" alt="" className="w-3/4 md:w-full" />
      </div>

      {/* Right Side Content */}
      <div
        id="content"
        className="w-full md:w-1/2 flex flex-col items-center md:items-end justify-center gap-6 text-center md:text-right"
      >
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-tight">
          DICE GAME
        </h1>
        <Link
          to="/play-game"
          className="bg-black text-white py-3 px-10 sm:px-16 rounded text-lg sm:text-xl transition-all duration-200 hover:scale-105"
        >
          Play Now
        </Link>
      </div>
    </section>
  );
}
