import { React, useEffect, useState } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "./components/Confetti";
import { FaInstagram } from "react-icons/fa";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allDiceHeld = dice.every((die) => die.isHeld);
    const allDiceSameValue = dice.every((die) => die.value === dice[0].value);
    if (allDiceHeld && allDiceSameValue) {
      setTenzies(true);
    } else {
      setTenzies(false);
    }
  }, [dice]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      const number = Math.floor(Math.random() * 6) + 1;
      newDice.push({ id: nanoid(), value: number, isHeld: false });
    }
    return newDice;
  }

  function rollDice() {
    // dice'ların hepsine bakacak, isHeld true olanlarda değişiklik yapmayacak, geri kalanların value'sini değiştirecek
    setDice((oldDice) =>
      oldDice.map((die) => {
        return !die.isHeld
          ? { ...die, value: Math.floor(Math.random() * 6) + 1 }
          : die;
      })
    );
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((number) => (
    <Die
      key={number.id}
      value={number.value}
      isHeld={number.isHeld}
      holdDice={() => holdDice(number.id)}
    />
  ));

  return (
    <div className="w-full h-full items-center flex justify-center min-h-[100vh]">
      {tenzies && <Confetti className="w-full h-full object-cover" />}
      <div className="w-[360px] h-[379px] items-center flex justify-center bg-[#0B2434]">
        <div className="flex flex-col gap-5 w-[320px] h-[320px] bg-[#F5F5F5] items-center justify-center rounded-xl px-8">
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
          <button
            onClick={() => (tenzies ? setDice(allNewDice()) : rollDice())}
            className="h-9 w-[110px] bg-[#5035FF] hover:bg-[#6048ff] rounded text-white font-bold active:shadow-inner shadow-xl"
          >
            {tenzies ? "New Game" : "Roll"}
          </button>
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
