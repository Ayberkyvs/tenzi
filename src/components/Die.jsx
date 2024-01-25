import React from "react";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF",
  };
  return (
    <div
      className="flex items-center justify-center w-9 h-9 bg-white shadow-lg font-bold text-xl cursor-pointer"
      style={styles}
      onClick={props.holdDice}
    >
      {props.value}
    </div>
  );
}

export default Die;
