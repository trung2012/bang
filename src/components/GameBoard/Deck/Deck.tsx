import React, { useState } from 'react';
import { useErrorContext, useGameContext } from '../../../context';
import { animationDelayMilliseconds, delayBetweenActions, hasActiveSnake } from '../../../game';
import { hasActiveDynamite, isJailed } from '../../../game';
import { CardPile } from './CardPile';
import classnames from 'classnames';
import './Deck.scss';
import Tippy from '@tippyjs/react';

export const Deck = () => {
  const [isDeckDisabled, setIsDeckDisabled] = useState(false);
  const { G, ctx, isActive, playerID, moves } = useGameContext();
  const { setError } = useErrorContext();
  const { deck } = G;
  const clientPlayer = G.players[playerID!];

  const onDeckClick = () => {
    if (!isActive) return;

    setIsDeckDisabled(true);
    setTimeout(() => {
      setIsDeckDisabled(false);
    }, animationDelayMilliseconds);

    if (playerID === ctx.currentPlayer && hasActiveDynamite(clientPlayer)) {
      moves.drawToReact(playerID);

      setTimeout(() => {
        moves.dynamiteResult();
      }, delayBetweenActions);
      return;
    }

    if (playerID === ctx.currentPlayer && hasActiveSnake(clientPlayer)) {
      moves.drawToReact(playerID);

      setTimeout(() => {
        moves.snakeResult();
      }, delayBetweenActions);
      return;
    }

    if (playerID === ctx.currentPlayer && isJailed(clientPlayer)) {
      moves.drawToReact(playerID);

      setTimeout(() => {
        moves.jailResult();
      }, delayBetweenActions);
      return;
    }

    if (clientPlayer.cardDrawnAtStartLeft <= 0) {
      setError('You cannot draw at the moment');
      return;
    }

    if (clientPlayer.character.name === 'black jack') {
      moves.blackJackDraw();
      setTimeout(() => {
        moves.blackJackResult();
      }, 2000);

      return;
    }

    switch (clientPlayer.character.name) {
      case 'kit carlson': {
        moves.kitCarlsonDraw();
        return;
      }
      case 'pixie pete': {
        moves.drawFromDeck(3);
        return;
      }
      case 'bill noface': {
        moves.billNoFaceDraw();
        return;
      }
      case 'tuco franziskaner': {
        moves.tucoFranziskanerDraw();
        return;
      }
      default:
        moves.drawFromDeck(2);
        return;
    }
  };

  return (
    <Tippy content='Click to draw'>
      <div>
        <CardPile
          className={classnames('deck', {
            'deck--active':
              isActive && playerID === ctx.currentPlayer && clientPlayer.cardDrawnAtStartLeft > 0,
          })}
          cards={deck}
          isFacedUp={false}
          onClick={isDeckDisabled ? () => {} : onDeckClick}
        />
      </div>
    </Tippy>
  );
};
