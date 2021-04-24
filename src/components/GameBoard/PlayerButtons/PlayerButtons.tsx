import React, { useEffect } from 'react';
import { useErrorContext, useGameContext } from '../../../context';
import { PlayerButton } from './PlayerButton';
import { ReactComponent as PassIcon } from '../../../assets/pass.svg';
import { ReactComponent as SkipIcon } from '../../../assets/skip.svg';
import { ReactComponent as PowerIcon } from '../../../assets/power.svg';
import { ReactComponent as DamageIcon } from '../../../assets/damage.svg';
import { ReactComponent as CancelIcon } from '../../../assets/cancel.svg';
import './PlayerButtons.scss';
import {
  delayBetweenActions,
  doesPlayerNeedToDraw,
  getOtherPlayersAlive,
  hasActiveDynamite,
  hasActiveSnake,
  IGamePlayer,
  isJailed,
  isPlayerGhost,
  stageNames,
  stagesReactingToBullets,
  stagesThatAllowCancel,
} from '../../../game';
import useSound from 'use-sound';
import { IModalButton, useModalContext } from '../../../context/modal';
const power = require('../../../assets/sounds/power.mp3');

export const PlayerButtons: React.FC<{ player: IGamePlayer }> = ({ player }) => {
  const [playPower] = useSound(power, { volume: 0.2 });
  const { G, ctx, moves, playerID, isActive } = useGameContext();
  const { setError } = useErrorContext();
  const { setModalContent } = useModalContext();
  const isClientPlayer = playerID === player.id;
  const isCurrentPlayer = isClientPlayer && player.id === ctx.currentPlayer;
  const playerCurrentStage = (ctx.activePlayers
    ? ctx.activePlayers[playerID!]
    : 'none') as stageNames;
  const isReactingToBullets =
    ctx.activePlayers !== null &&
    !!ctx.activePlayers[playerID!] &&
    stagesReactingToBullets.includes(playerCurrentStage);
  const isPowerDisabled = player.character.activePowerUsesLeft === 0;

  useEffect(() => {
    if (playerCurrentStage) {
      switch (playerCurrentStage) {
        case stageNames.discardToPlayCard: {
          setModalContent({
            title: `Discard a card`,
            text: `Click on a card to discard and continue`,
          });
          break;
        }
        case stageNames.clickToBang: {
          setModalContent({
            title: `Click someone to BANG`,
            text: `Click on someone to BANG them`,
          });
          break;
        }
        case stageNames.reactToBang:
        case stageNames.reactToBangWithoutBang:
        case stageNames.reactToHenryBlockBang: {
          setModalContent({
            title: `Someone is BANGing you`,
            text: `Play a MISSED (or equivalent) or take 1 damage`,
          });
          break;
        }
        case stageNames.reactToGatling: {
          setModalContent({
            title: `Someone played Gatling`,
            text: `Play a MISSED (or equivalent) or take 1 damage`,
          });
          break;
        }
        case stageNames.reactToIndians: {
          setModalContent({
            title: `Someone played Indians`,
            text: `Play a BANG or take 1 damage`,
          });
          break;
        }
        case stageNames.reactToRobbery: {
          setModalContent({
            title: `Someone is taking a card from you`,
            text: `Click Pass if you cannot play anything to react`,
          });
          break;
        }
        case stageNames.askLemonadeJim: {
          setModalContent({
            title: `Lemonade Jim power`,
            text: `Do you want to discard 1 card to regain 1 health?`,
            buttons: [
              { text: 'Yes', moveName: 'lemonadeJimPower', moveArgs: [playerID] },
              { text: 'No', moveName: 'endStage' },
            ],
          });
          break;
        }
        default: {
          setModalContent(null);
          break;
        }
      }
    } else {
      setModalContent(null);
    }
  }, [playerCurrentStage, playerID, setModalContent]);

  useEffect(() => {
    if (playerCurrentStage === stageNames.continueAfterHenryBlockBang) {
      const moveName = G.henryBlockAfterEffects?.move;
      const moveArgs = G.henryBlockAfterEffects?.moveArgs;

      if (isActive && moveName && moves[moveName] && moveArgs) {
        setModalContent({
          title: 'Continue',
          text: 'Please click continue',
          buttons: [
            {
              text: 'Continue',
              moveName,
              moveArgs,
            },
          ],
        });
        return;
      }
    }
  }, [G.henryBlockAfterEffects, isActive, moves, playerCurrentStage, setModalContent]);

  const onEndTurnClick = () => {
    if (!isClientPlayer || !isActive) {
      setError('You cannot perform this action right now');
      return;
    }

    if (doesPlayerNeedToDraw(player, ctx)) {
      setError('Please draw first');
      return;
    }

    let numCardsToDiscard =
      player.character.name === 'sean mallory'
        ? player.hand.length - 10
        : player.hand.length - player.hp;

    if (isPlayerGhost(player)) {
      numCardsToDiscard = player.hand.length;
    }

    if (numCardsToDiscard > 0) {
      setError(
        `Please discard ${numCardsToDiscard} card${
          numCardsToDiscard > 1 ? 's' : ''
        } before ending your turn`
      );
      moves.makePlayerDiscardToPlay('endTurn', playerID, numCardsToDiscard);
      return;
    }

    if (hasActiveDynamite(player)) {
      setError('Please draw for dynamite');
      return;
    }

    if (hasActiveSnake(player)) {
      setError('Please draw for rattlesnake');
      return;
    }

    if (isJailed(player)) {
      setError('Please draw for jail');
      return;
    }

    moves.endTurn();
  };

  const onPowerClick = () => {
    if (!isClientPlayer) return;

    if (
      player.character.name !== 'jourdonnais' &&
      player.character.name !== 'chuck wengam' &&
      (player.character.activePowerUsesLeft ?? 0) <= 0
    ) {
      return;
    }

    switch (player.character.name) {
      case 'jourdonnais': {
        if (player.jourdonnaisPowerUseLeft > 0) {
          if (
            playerCurrentStage === stageNames.reactToGatling ||
            playerCurrentStage === stageNames.reactToBang
          ) {
            moves.drawToReact(player.id);
            playPower();
            setTimeout(() => {
              moves.barrelResult(playerID, true);
            }, delayBetweenActions);
          }
          return;
        }
        break;
      }
      case 'chuck wengam': {
        if (player.hp === 1) {
          setError('You cannot use your power with 1 life point');
          return;
        }

        moves.chuckWengamPower();
        playPower();
        return;
      }
      case 'jose delgado': {
        if (!player.hand.some(card => card.type === 'equipment')) {
          setError('You have no blue card to discard');
          return;
        }
        moves.joseDelgadoPower();
        playPower();
        return;
      }
      case 'black flower': {
        if (!player.hand.some(card => card.suit === 'clubs')) {
          setError('You have no Clubs card to discard');
          return;
        }
        moves.blackFlowerPower();
        playPower();
        return;
      }
      case 'doc holyday': {
        if (player.hand.length < 2) {
          setError('You do not have enough cards to discard');
          return;
        }
        moves.docHolyDayPower();
        playPower();
        return;
      }
      case 'der spot - burst ringer': {
        if (!player.hand.some(card => card.name === 'bang')) {
          setError('You have no Bang cards to use this power');
          return;
        }
        moves.derSpotBurstRingerPower();
        playPower();
        return;
      }
      case 'evelyn shebang': {
        if (player.cardDrawnAtStartLeft <= 0) {
          setError('You cannot use your power now');
          return;
        }
        const otherPlayersAlive = getOtherPlayersAlive(G, ctx);
        const buttons: IModalButton[] = [{ text: '0' }];

        if (otherPlayersAlive.length >= 1) {
          buttons.push({ text: '1', moveName: 'evelynShebangPower', moveArgs: [1] });
        }

        if (otherPlayersAlive.length >= 2) {
          buttons.push({ text: '2', moveName: 'evelynShebangPower', moveArgs: [2] });
        }

        setModalContent({
          title: 'Evelyn Shebang Power',
          text: 'How many people do you want to bang this turn?',
          buttons,
        });

        playPower();
        return;
      }
    }
  };

  const onTakeDamageClick = () => {
    if (!isClientPlayer) return;

    moves.takeDamage(player.id);
  };

  const onPassClick = () => {
    if (!isClientPlayer) return;

    if (playerCurrentStage === stageNames.reactToRobbery && G.robberyState) {
      if (G.robberyState.move === 'cat balou') {
        moves.catbalou(G.robberyState.victimId, G.robberyState.cardIndex, G.robberyState.type);
      } else {
        moves.giveCardToRobber(G.robberyState.cardIndex, G.robberyState.type);
      }
    }
  };

  if (player.hp <= 0 && !isPlayerGhost(player)) {
    return null;
  }

  return (
    <div className='player-buttons'>
      {isClientPlayer && isActive && (
        <>
          {player.character.hasActivePower && (
            <PlayerButton
              tooltipTitle='Activate your power'
              onClick={onPowerClick}
              disabled={isPowerDisabled}
            >
              <PowerIcon className='player-button-icon' />
            </PlayerButton>
          )}
          {isCurrentPlayer && (
            <PlayerButton tooltipTitle='End turn' onClick={onEndTurnClick}>
              <PassIcon className='player-button-icon' />
            </PlayerButton>
          )}
          {isReactingToBullets && (
            <PlayerButton tooltipTitle='Take damage' onClick={onTakeDamageClick}>
              <DamageIcon className='player-button-icon damage-icon' />
            </PlayerButton>
          )}
          {stagesThatAllowCancel.includes(playerCurrentStage) && (
            <PlayerButton
              tooltipTitle={playerCurrentStage === stageNames.lemat ? 'Turn off Lemat' : 'Cancel'}
              onClick={() => moves.endStage()}
            >
              <CancelIcon className='player-button-icon damage-icon' />
            </PlayerButton>
          )}
          {playerCurrentStage === stageNames.reactToRobbery && (
            <PlayerButton tooltipTitle='Pass' onClick={onPassClick}>
              <SkipIcon className='player-button-icon' />
            </PlayerButton>
          )}
        </>
      )}
    </div>
  );
};
