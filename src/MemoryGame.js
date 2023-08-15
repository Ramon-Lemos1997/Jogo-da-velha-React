import React, { useEffect, useState } from 'react';
import './App.css';
import GameOver from './components/GameOver';
import game from './components/game/game';
import GameBoard from './components/GameBoard';

function MemoryGame() {
  const [gameOver, setGameOver] = useState(false);
  const [cards, setCards] = useState([]);
  //quando mostro o componente, crio o cards,
  useEffect(() => {
    setCards(game.createCardFromTeachs());
  }, []);
  //recomeçar o game;
  function restart() {
    setCards(game.createCardFromTeachs());
    game.clearCards()
    setGameOver(false);
  }
  //lidar com cada card clicado;
  function handleFlip(card) {
    //verificar o primeiro card clicado;
    if (game.setCard(card.id)) {
      //se passa da primeira verificação, veriffica se eu eu tenho um segundo card;
      if (game.secondCard) {
        //verifico se houve match;
        if (game.checkMatch()) {
          //se tiver match limpo este cards, 
          game.clearCards();
          //verifico se foi o útlimo par;
          if (game.checkGameOver()) {
            setGameOver(true);
          }
          //se não passar eu mostro os cards por 1 segundo e desviro,
        } else {
          setTimeout(() => {
            game.unflipCards();
            setCards([...game.cards])
          }, 1000);
        }
      }
    }
    //mostrar sempre o card atualizado;
    setCards([...game.cards])
  }

  return (
    <div>
      <GameBoard onHandleFlip={handleFlip} cards={cards} />
      <GameOver show={gameOver} handleRestart={restart} />
    </div>
  );
}

export default MemoryGame;
