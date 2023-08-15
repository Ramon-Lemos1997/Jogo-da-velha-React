import React from "react";
import CardElement from "./CardElement";

export default function GameBoard(props) {
  return (
    <div id="gameBoard">
      {props.cards.map((card, index) => (
        <CardElement key={index} handleFlip={props.onHandleFlip} card={card} />
      ))}
    </div>
  );
}
