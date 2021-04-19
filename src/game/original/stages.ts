import { StageMap } from 'boardgame.io/dist/types/src/types';
import { stageNames } from './constants';
import moves from './moves';
import { IGameState } from './types';

const stages: StageMap<IGameState> = {
  discardToPlayCard: {
    moves: {
      discardToReact: moves.discardToReact,
      resetGameStage: moves.resetGameStage,
      clearCardsInPlay: moves.clearCardsInPlay,
      endStage: moves.endStage,
      bang: moves.bang,
      heal: moves.heal,
    },
  },
  [stageNames.clickToBang]: {
    moves: {
      bangWithPower: moves.bangWithPower,
      endStage: moves.endStage,
    },
  },
  joseDelgadoDiscard: {
    moves: {
      discardToReact: moves.discardToReact,
      resetGameStage: moves.resetGameStage,
      clearCardsInPlay: moves.clearCardsInPlay,
    },
  },
  pickFromGeneralStore: {
    moves: {
      pickCardFromGeneralStore: moves.pickCardFromGeneralStore,
      clearCardsInPlay: moves.clearCardsInPlay,
    },
  },
  duel: {
    moves: {
      playCardToReact: moves.playCardToReact,
      takeDamage: moves.takeDamage,
      discardToReact: moves.discardToReact,
      endStage: moves.endStage,
    },
  },
  reactToGatling: {
    moves: {
      playCardToReact: moves.playCardToReact,
      takeDamage: moves.takeDamage,
      drawToReact: moves.drawToReact,
      barrelResult: moves.barrelResult,
      clearCardsInPlay: moves.clearCardsInPlay,
      discardToReact: moves.discardToReact,
      endStage: moves.endStage,
    },
  },
  reactToIndians: {
    moves: {
      playCardToReact: moves.playCardToReact,
      takeDamage: moves.takeDamage,
      clearCardsInPlay: moves.clearCardsInPlay,
      discardToReact: moves.discardToReact,
      endStage: moves.endStage,
    },
  },
  reactToBang: {
    moves: {
      playCardToReact: moves.playCardToReact,
      drawToReact: moves.drawToReact,
      barrelResult: moves.barrelResult,
      takeDamage: moves.takeDamage,
      clearCardsInPlay: moves.clearCardsInPlay,
      setActivePlayersStage: moves.setActivePlayersStage,
    },
  },
  reactToBangWithoutBang: {
    moves: {
      playCardToReact: moves.playCardToReact,
      drawToReact: moves.drawToReact,
      barrelResult: moves.barrelResult,
      takeDamage: moves.takeDamage,
      clearCardsInPlay: moves.clearCardsInPlay,
      discardToReact: moves.discardToReact,
      endStage: moves.endStage,
    },
  },
  takeCardFromHand: {
    moves: {
      drawFromPlayerHand: moves.drawFromPlayerHand,
    },
  },
  kitCarlsonDiscard: {
    moves: {
      kitCarlsonDiscard: moves.kitCarlsonDiscard,
    },
  },
  clearCardsInPlay: {},
  play: {},
  discard: {
    moves: {
      discardFromHand: moves.discardFromHand,
      endStage: moves.endStage,
    },
  },
  ragtime: {
    moves: {
      panic: moves.panic,
    },
  },
  copyCharacter: {
    moves: {
      copyCharacter: moves.copyCharacter,
    },
  },
  bandidos: {
    moves: {
      takeDamage: moves.takeDamage,
      discardToReact: moves.discardToReact,
      clearCardsInPlay: moves.clearCardsInPlay,
      endStage: moves.endStage,
    },
  },
  fanning: {
    moves: {
      bang: moves.bang,
      endStage: moves.endStage,
    },
  },
  tornado: {
    moves: {
      discardForTornado: moves.discardForTornado,
      endStage: moves.endStage,
    },
  },
  poker: {
    moves: {
      discardForPoker: moves.discardForPoker,
    },
  },
  pickCardForPoker: {
    moves: {
      pickCardForPoker: moves.pickCardForPoker,
    },
  },
  lemat: {
    moves: {
      bang: moves.bang,
      playCard: moves.playCard,
      endStage: moves.endStage,
    },
  },
  [stageNames.reactToRobbery]: {
    moves: {
      playCardToReact: moves.playCardToReact,
      giveCardToRobber: moves.giveCardToRobber,
      clearCardsInPlay: moves.clearCardsInPlay,
      catbalou: moves.catbalou,
      endStage: moves.endStage,
    },
  },
  [stageNames.pickCardsForBrawl]: {
    moves: {
      pickCardsForBrawl: moves.pickCardsForBrawl,
    },
  },
  [stageNames.askLemonadeJim]: {
    moves: {
      lemonadeJimPower: moves.lemonadeJimPower,
      endStage: moves.endStage,
    },
  },
  [stageNames.reactToHenryBlockBang]: {
    moves: {
      playCardToReact: moves.playCardToReact,
      drawToReact: moves.drawToReact,
      barrelResult: moves.barrelResult,
      takeDamage: moves.takeDamage,
      clearCardsInPlay: moves.clearCardsInPlay,
      discardToReact: moves.discardToReact,
      endStage: moves.endStage,
    },
  },
};

export default stages;
