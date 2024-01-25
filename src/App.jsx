import { React, useEffect, useState } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "./components/Confetti";
import { FaInstagram } from "react-icons/fa";
import Header from "./components/Header";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer;

    if (!tenzies) {
      setTime(0);
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [tenzies]);

  useEffect(() => {
    if (tenzies) {
      saveScore();
    }
  }, [tenzies]);

  useEffect(() => {
    const allDiceHeld = isAllHeld();
    const allDiceSameValue = dice.every((die) => die.value === dice[0].value);
    if (allDiceHeld && allDiceSameValue) {
      setTenzies(true);
    } else {
      setTenzies(false);
    }
  }, [dice]);

  function isAllHeld(config) {
    return config === "!"
      ? dice.every((die) => !die.isHeld)
      : dice.every((die) => die.isHeld);
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      const number = Math.floor(Math.random() * 6) + 1;
      newDice.push({ id: nanoid(), value: number, isHeld: false });
    }
    return newDice;
  }

  function rollDice() {
    if (isAllHeld("!")) {
      setTime(0);
    }
    setDice((oldDice) =>
      oldDice.map((die) => {
        return !die.isHeld
          ? { ...die, value: Math.floor(Math.random() * 6) + 1 }
          : die;
      })
    );
  }

  function holdDice(id) {
    if (!isAllHeld()) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
        })
      );
    }
  }

  function saveScore() {
    const prevScore = localStorage.getItem("score");
    prevScore === null || time < prevScore
      ? localStorage.setItem("score", time)
      : localStorage.setItem("score", prevScore);
  }

  function getScore() {
    if (localStorage.getItem("score") > 0) {
      return localStorage.getItem("score");
    } else {
      return 0;
    }
  }

  const diceElements = dice.map((number) => (
    <Die
      key={number.id}
      value={number.value}
      isHeld={number.isHeld}
      holdDice={() => holdDice(number.id)}
    />
  ));

  const styles = {
    color:
      time <= 10
        ? "#026b00"
        : time > 10 && time <= 20
        ? "#a39500"
        : time > 20
        ? "#eb0000"
        : "none",
  };
  return (
    <div className="w-full h-full items-center flex flex-col justify-center min-h-[100vh] bg-[#c7e9ff]">
      <Header />
      {tenzies && <Confetti className="w-full h-full object-cover" />}
      {tenzies && <h3 className="font-bold">Your Best Score: {getScore()}s</h3>}
      <div className="w-[360px] h-[379px] items-center flex justify-center bg-[#0B2434]">
        <div className="flex flex-col gap-4 w-[320px] h-[320px] bg-[#F5F5F5] items-center justify-center rounded-xl px-8">
          <div className="w-full h-auto flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl text-[#2B283A] mb-2">
              {tenzies ? "Congrulations 👏" : "Tenzies"}
            </h1>
            <p className="text-[#4A4E74] text-xs text-center">
              {tenzies
                ? "You've successfully matched all dice. Click the button to play again."
                : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
            </p>
          </div>
          <div className="grid grid-rows-2 grid-flow-col gap-3 w-full h-auto">
            {diceElements}
          </div>
          <div className="items-center flex flex-col justify-center">
            <button
              onClick={() => (tenzies ? setDice(allNewDice()) : rollDice())}
              className="h-9 w-[110px] bg-[#5035FF] hover:bg-[#6048ff] rounded text-white font-bold active:shadow-inner shadow-xl"
            >
              {tenzies ? "New Game" : "Roll"}
            </button>
            <h6 className="text-xs">
              Time: <span style={styles}>{time}</span>s
            </h6>
          </div>
          <h6 className="flex justify-center items-center w-full text-[#0B2434] text-xs">
            Developed by{" "}
            <a
              href="https://www.instagram.com/ayberksch"
              className="flex items-center mx-1"
            >
              <FaInstagram className="mr-[2px]" />
              ayberksch
            </a>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default App;
