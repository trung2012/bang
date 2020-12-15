import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useErrorContext, useGameContext } from '../../../context';
import { stageNames } from '../../../game';
import { ICard } from '../../../game';
import { hasDynamite, isJailed } from '../../../game';
import { DraggableCard } from '../DraggableCard';
import { DroppableCard } from '../DroppableCard';
import './PlayerHand.scss';

interface IPlayerCardsProps {
  playerId: string;
  hand: ICard[];
}

export type CardContainerProps = {
  index: number;
  numCards: number;
  maxCardRotationAngle: number;
  shouldAnimate: boolean;
};

export const cardShuffleAnimation = (destinationTransform: string) =>
  keyframes`
  from {
    transform: none;
  }

  to {
    transform: ${destinationTransform};
  }
`;

const PlayerHandContainer = styled.div<{ shouldAnimate: boolean }>`
  ${props => !props.shouldAnimate && 'transform: rotate(0) !important'}
`;

const PlayerHandDroppableCardContainer = styled.div<CardContainerProps>`
  position: absolute;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: none;
  animation: ${props =>
      props.shouldAnimate
        ? cardShuffleAnimation(
            `rotate(${
              -props.maxCardRotationAngle / 2 +
              props.index * (props.maxCardRotationAngle / props.numCards)
            }deg)`
          )
        : 'none'}
    0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  transform-origin: center top;

  &:hover {
    transform: translateY(-40px);
  }
`;

export const PlayerHandComponent: React.FC<IPlayerCardsProps> = ({ hand, playerId }) => {
  const { G, playerID, ctx, moves, isActive } = useGameContext();
  const { setError } = useErrorContext();
  const clientPlayer = G.players[playerID!];
  const targetPlayer = G.players[playerId];
  const isPlayerDead = targetPlayer.hp <= 0;
  const isFacedUp = playerId === playerID || isPlayerDead;
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const maxCardRotationAngle = Math.min(hand.length * 25, 140);

  useEffect(() => {
    if (!isActive && selectedCards.length > 0) {
      setSelectedCards([]);
    }
  }, [isActive, selectedCards.length]);

  useEffect(() => {
    setShouldAnimate(false);

    let animationTimeout = setTimeout(() => {
      setShouldAnimate(true);
    }, 500);

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [hand.length]);

  const onPlayerHandCardClick = (index: number) => {
    if (hasDynamite(clientPlayer) && G.dynamiteTimer === 0) {
      setError('Please draw for dynamite');
      return;
    }

    if (isJailed(clientPlayer)) {
      setError('Please draw for jail');
      return;
    }

    const currentPlayer = G.players[playerID!];
    if (currentPlayer.character.name === 'jesse jones' && currentPlayer.cardDrawnAtStartLeft >= 2) {
      moves.drawFromPlayerHand(playerID, playerId, index);
      return;
    }

    if (G.activeStage === stageNames.takeCardFromHand) {
      if (currentPlayer.character.name !== 'el gringo' || playerId !== ctx.currentPlayer) return;

      moves.drawFromPlayerHand(playerID, playerId, index);
    }
  };

  if (isFacedUp) {
    return (
      <div className='player-hand'>
        {hand.map((card, index) => (
          <DraggableCard
            key={`${card.id}-${index}`}
            card={card}
            index={index}
            isFacedUp={isFacedUp}
            playerId={playerId}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
          />
        ))}
      </div>
    );
  }

  return (
    <PlayerHandContainer shouldAnimate={shouldAnimate} className='player-hand'>
      {hand.map((card, index) => (
        <PlayerHandDroppableCardContainer
          index={index}
          numCards={hand.length}
          maxCardRotationAngle={maxCardRotationAngle}
          shouldAnimate={shouldAnimate}
          key={`${card.id}-${index}`}
        >
          <DroppableCard
            card={card}
            index={index}
            isFacedUp={isFacedUp}
            playerId={playerId}
            cardLocation='hand'
            onClick={() => onPlayerHandCardClick(index)}
          />
        </PlayerHandDroppableCardContainer>
      ))}
    </PlayerHandContainer>
  );
};

export const PlayerHand = React.memo(PlayerHandComponent);
