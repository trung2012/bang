import React, { useEffect } from 'react';
import { useErrorContext, useGameContext } from '../../../context';
import {
  delayBetweenActions,
  doesPlayerNeedToDraw,
  hasActiveDynamite,
  hasActiveSnake,
  isJailed,
  stageNames,
} from '../../../game';
import { ICard } from '../../../game';
import { DroppableCard } from '../DroppableCard';
import './PlayerEquipments.scss';

interface IPlayerEquipments {
  playerId: string;
  equipments: ICard[];
}

export const PlayerEquipments: React.FC<IPlayerEquipments> = ({ playerId, equipments }) => {
  const { G, ctx, playerID, moves, isActive } = useGameContext();
  const { setError } = useErrorContext();
  const { players } = G;
  const cardLocation = 'equipment';
  const clientPlayer = players[playerID!];
  const targetPlayer = players[playerId];
  const playerCurrentStage = (ctx.activePlayers
    ? ctx.activePlayers[playerID!]
    : 'none') as stageNames;

  useEffect(() => {
    const barrelCard = clientPlayer.equipments.find(card => card.name === 'barrel');
    if (
      barrelCard !== undefined &&
      ctx.activePlayers &&
      (playerCurrentStage === stageNames.reactToGatling ||
        playerCurrentStage === stageNames.reactToBang ||
        playerCurrentStage === stageNames.reactToBangWithoutBang) &&
      clientPlayer.barrelUseLeft > 0
    ) {
      setTimeout(() => {
        moves.drawToReact(playerID);

        setTimeout(() => {
          moves.barrelResult(playerID, false);
        }, delayBetweenActions);
      }, delayBetweenActions);

      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerCurrentStage]);

  const onEquipmentClick = (equipmentCard: ICard, index: number) => {
    if (!isActive || playerID === null) return;
    const sourcePlayer = players[playerID];

    if (doesPlayerNeedToDraw(sourcePlayer, ctx)) {
      setError('Please draw first');
      return;
    }

    //Process clicking on other people's equipments
    if (
      playerID !== playerId &&
      sourcePlayer.character.name === 'pat brennan' &&
      sourcePlayer.cardDrawnAtStartLeft >= 2
    ) {
      if (hasActiveDynamite(sourcePlayer)) {
        setError('Please draw for dynamite');
        return;
      }

      if (hasActiveSnake(sourcePlayer)) {
        setError('Please draw for rattlesnake');
        return;
      }

      if (isJailed(sourcePlayer)) {
        setError('Please draw for jail');
        return;
      }

      if (targetPlayer.character.name === 'henry block') {
        moves.henryBlockBang(
          sourcePlayer.id,
          playerId,
          'patBrennanEquipmentDraw',
          [playerId, index, cardLocation],
          index,
          cardLocation
        );
        return;
      }

      moves.patBrennanEquipmentDraw(playerId, index, cardLocation);
      return;
    }

    if (ctx.activePlayers && ctx.activePlayers[ctx.currentPlayer] === stageNames.ragtime) {
      moves.panic(playerId, index, cardLocation);
      return;
    }

    // Process clicking on own equipments
    if (playerID !== playerId) return;

    if (equipmentCard.name === 'lemat' && playerID === ctx.currentPlayer) {
      moves.lemat();
      return;
    }

    if (
      equipmentCard.name === 'barrel' &&
      ctx.activePlayers &&
      (ctx.activePlayers[playerID] === stageNames.reactToGatling ||
        ctx.activePlayers[playerID] === stageNames.reactToBang ||
        ctx.activePlayers[playerID] === stageNames.reactToBangWithoutBang) &&
      targetPlayer.barrelUseLeft > 0
    ) {
      moves.drawToReact(playerID);
      setTimeout(() => {
        moves.barrelResult(playerID, false);
      }, delayBetweenActions);
      return;
    }
  };

  if (!equipments?.length) {
    return null;
  }

  return (
    <div className='player-equipments'>
      {equipments.map((card, index) => (
        <DroppableCard
          key={card.id}
          card={card}
          index={index}
          isFacedUp={true}
          playerId={playerId}
          cardLocation={cardLocation}
          onClick={() => onEquipmentClick(card, index)}
        />
      ))}
    </div>
  );
};
