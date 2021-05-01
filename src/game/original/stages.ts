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
      discardFromHand: moves.discardFromHand,
    },
  },
  [stageNames.clickToBang]: {
    moves: {
      bangWithPower: moves.bangWithPower,
      endStage: moves.endStage,
      discardFromHand: moves.discardFromHand,
    },
  },
  joseDelgadoDiscard: {
    moves: {
      discardToReact: moves.discardToReact,
      resetGameStage: moves.resetGameStage,
      clearCardsInPlay: moves.clearCardsInPlay,
      discardFromHand: moves.discardFromHand,
    },
  },
  pickFromGeneralStore: {
    moves: {
      pickCardFromGeneralStore: moves.pickCardFromGeneralStore,
      clearCardsInPlay: moves.clearCardsInPlay,
      discardFromHand: moves.discardFromHand,
    },
  },
  duel: {
    moves: {
      playCardToReact: moves.playCardToReact,
      takeDamage: moves.takeDamage,
      discardToReact: moves.discardToReact,
      endStage: moves.endStage,
      discardFromHand: moves.discardFromHand,
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
      discardFromHand: moves.discardFromHand,
    },
  },
  reactToIndians: {
    moves: {
      playCardToReact: moves.playCardToReact,
      takeDamage: moves.takeDamage,
      clearCardsInPlay: moves.clearCardsInPlay,
      discardToReact: moves.discardToReact,
      endStage: moves.endStage,
      discardFromHand: moves.discardFromHand,
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
      discardFromHand: moves.discardFromHand,
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
      discardFromHand: moves.discardFromHand,
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
  [stageNames.bandidos]: {
    moves: {
      takeDamage: moves.takeDamage,
      discardToReact: moves.discardToReact,
      clearCardsInPlay: moves.clearCardsInPlay,
      endStage: moves.endStage,
      discardFromHand: moves.discardFromHand,
    },
  },
  fanning: {
    moves: {
      bang: moves.bang,
      endStage: moves.endStage,
      discardFromHand: moves.discardFromHand,
    },
  },
  tornado: {
    moves: {
      discardForTornado: moves.discardForTornado,
      endStage: moves.endStage,
      discardFromHand: moves.discardFromHand,
    },
  },
  poker: {
    moves: {
      discardForPoker: moves.discardForPoker,
      discardFromHand: moves.discardFromHand,
    },
  },
  pickCardForPoker: {
    moves: {
      pickCardForPoker: moves.pickCardForPoker,
      discardFromHand: moves.discardFromHand,
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
      discardToReact: moves.discardToReact,
      catbalou: moves.catbalou,
      endStage: moves.endStage,
      discardFromHand: moves.discardFromHand,
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
      discardFromHand: moves.discardFromHand,
    },
  },
};

export default stages;
