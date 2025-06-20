import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PlayGame() {
  const [clickIndex, setClickIndex] = useState(null);
  const [boxValue, setBoxValue] = useState(null);
  const diceArray = [
    "/images/dice/dice_1.png",
    "/images/dice/dice_2.png",
    "/images/dice/dice_3.png",
    "/images/dice/dice_4.png",
    "/images/dice/dice_5.png",
    "/images/dice/dice_6.png",
  ];
  const [diceImgPath, setDiceImgPath] = useState("/images/dice/dice_1.png");
  const [isRolling, setIsRolling] = useState(false);
  const [score, setScore] = useState(0);
  const [boxClicked, setBoxClicked] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const boxClick = (idx) => {
    if (gameWon || gameOver) return;
    setClickIndex(idx);
    setBoxValue(idx + 1);
    setBoxClicked(false);
  };

  const rollDice = () => {
    if (isRolling || gameWon || gameOver) return;

    if (boxValue === null) {
      setBoxClicked(true);
      return;
    }

    setIsRolling(true);
    let rollCount = 0;
    let maxRoll = 15;

    const rollInterval = setInterval(() => {
      const randomDice = Math.floor(Math.random() * diceArray.length);
      setDiceImgPath(diceArray[randomDice]);
      rollCount++;

      if (rollCount >= maxRoll) {
        clearInterval(rollInterval);
        const finalValue = randomDice + 1;
        setIsRolling(false);

        setScore((prevScore) => {
          let newScore;
          if (boxValue === finalValue) {
            newScore = prevScore + finalValue;
          } else {
            newScore = prevScore - finalValue;
          }
          return newScore;
        });
      }
    }, 80);
  };

  useEffect(() => {
    if (score >= 20) {
      setGameWon(true);
    } else if (score <= -100) {
      setGameOver(true);
    }
  }, [score]);

  const resetGame = () => {
    setScore(0);
    setGameWon(false);
    setGameOver(false);
    setClickIndex(null);
    setBoxValue(null);
    setBoxClicked(false);
    setDiceImgPath("/images/dice/dice_1.png");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-20 py-4 border-b border-gray-200">
        <Link
          to="/"
          className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          <i className="fas fa-home text-xl"></i>
        </Link>
      </div>

      <section className="flex flex-col w-full px-4 sm:px-6 lg:px-20 py-6 lg:py-8">
        {/* Game Result Modal/Overlay */}
        {(gameWon || gameOver) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4 shadow-2xl">
              <div className="text-6xl mb-4">{gameWon ? "🎉" : "😞"}</div>
              <h2 className="text-3xl font-bold mb-4">
                {gameWon ? "Congratulations!" : "Game Over!"}
              </h2>
              <p className="text-xl mb-6 text-gray-600">
                {gameWon ? "You Won!" : "You Lost!"}
              </p>
              <p className="text-lg mb-6">
                Final Score: <span className="font-bold">{score}</span>
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="bg-black text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Play Again
                </button>
                <Link
                  to="/"
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-4 mb-8">
          {/* Total Score Display */}
          <div className="text-center order-2 lg:order-1">
            <h1
              className={`text-6xl sm:text-7xl lg:text-8xl font-bold transition-colors duration-300 ${
                score >= 14
                  ? "text-green-600"
                  : score <= -50
                  ? "text-red-600"
                  : "text-gray-800"
              }`}
            >
              {score}
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-gray-600 mt-2">
              Total Score
            </p>
            {/* Progress indicator */}
            <div className="mt-2 text-sm text-gray-500">
              {score >= 20
                ? "Winner!"
                : score <= -100
                ? "Game Over!"
                : `${20 - score} points to win | ${
                    -100 - score
                  } points to lose`}
            </div>
          </div>

          {/* Number Selection Area */}
          <div className="flex flex-col items-center lg:items-end order-1 lg:order-2">
            {/* Error Message */}
            <div className="h-8 mb-4">
              {boxClicked && (
                <p className="text-red-600 text-lg sm:text-xl font-semibold">
                  You have not selected any number
                </p>
              )}
            </div>

            {/* Number Buttons */}
            <div className="grid grid-cols-3 sm:flex gap-3 sm:gap-4 mb-4">
              {[...Array(6)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => boxClick(idx)}
                  disabled={gameWon || gameOver}
                  className={`border-2 border-black text-lg sm:text-xl font-semibold py-4 sm:py-6 px-6 sm:px-8 transition-all duration-200 hover:scale-105 ${
                    clickIndex === idx
                      ? "bg-black text-white shadow-lg"
                      : "bg-white hover:bg-gray-50"
                  } ${
                    gameWon || gameOver ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <p className="text-lg sm:text-xl font-bold text-gray-700">
              Select Number
            </p>
          </div>
        </div>

        {/* Main Dice Section */}
        <div className="flex flex-col gap-4 items-center mb-8">
          <div className="relative">
            <img
              className={`cursor-pointer w-32 h-32 sm:w-40 sm:h-40 transition-transform duration-200 ${
                isRolling ? "animate-pulse scale-110" : "hover:scale-105"
              } ${
                !boxValue || gameWon || gameOver
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={rollDice}
              src={diceImgPath}
              alt="Dice"
            />
            {isRolling && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              </div>
            )}
          </div>

          <p className="text-lg sm:text-2xl text-gray-700 font-medium">
            {gameWon || gameOver
              ? "Game Finished!"
              : isRolling
              ? "Rolling..."
              : "Click on Dice to roll"}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              className="border-2 border-black py-3 rounded-lg font-semibold text-lg bg-white hover:bg-gray-50 transition-colors duration-200"
              onClick={resetGame}
            >
              {gameWon || gameOver ? "New Game" : "Reset Score"}
            </button>
            <button
              onClick={() => setShowRules(!showRules)}
              className="border-2 border-black bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-200"
            >
              {showRules ? "Hide Rules" : "Show Rules"}
            </button>
          </div>
        </div>

        {/* Rules Section */}
        {showRules && (
          <div className="flex justify-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 sm:p-8 max-w-2xl w-full">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                How to play dice game
              </h1>
              <div className="space-y-3 text-gray-700">
                <p className="text-lg">• Select any number (1-6)</p>
                <p className="text-lg">• Click on dice image to roll</p>
                <p className="text-lg">
                  • If your selected number matches the dice, you gain points
                  equal to the dice value
                </p>
                <p className="text-lg">
                  • If your guess is wrong, you lose points equal to the dice
                  value
                </p>
                <p className="text-lg font-semibold">
                  • Reach 20 points to win! Don't let your score reach -100 or
                  you lose!
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
