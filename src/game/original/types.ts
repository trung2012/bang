import { CardNameVOS } from '../expansions';
import { ExpansionName } from './config';

export interface IGameState {
  deck: ICard[];
  discarded: ICard[];
  generalStore: ICard[];
  players: IGamePlayerMap;
  playOrder: string[];
  characters: ICharacter[];
  isSuddenDeathOn: boolean;
  activeStage: string | null;
  reactionRequired: {
    sourcePlayerId: string | null;
    cardNeeded: CardName | CardNameVOS | null;
    quantity: number;
  };
  dynamiteTimer: number;
  sidKetchumId: string | null;
  expansions: ExpansionName[];
}

export interface IGamePlayerMap {
  [id: string]: IGamePlayer;
}
export interface IGamePlayer {
  id: string;
  hp: number;
  maxHp: number;
  name?: string;
  hand: ICard[];
  equipments: ICard[];
  character: ICharacter;
  gunRange: number;
  actionRange: number;
  role: Role;
  numBangsLeft: number;
  cardsInPlay: ICard[];
  secretCards: ICard[];
  cardDiscardedThisTurn: number;
  cardDrawnAtStartLeft: number;
  targetedCard?: ICard;
  barrelUseLeft: number;
  jourdonnaisPowerUseLeft: number;
}

export interface ICard {
  id: string;
  name: CardName | CardNameVOS;
  value: number;
  suit: CardSuit;
  type: CardType;
  imageUrl: string;
  description?: string;
  needsReaction?: boolean;
  isTargeted?: boolean;
  rotationValue?: number;
  playWithBang?: boolean;
}

export type CardSuit = 'hearts' | 'spades' | 'diamond' | 'clubs';
export type CardType = 'action' | 'equipment' | 'targeted_equipment';
export interface ICharacter {
  name: CharacterName;
  hp: number;
  description: string;
  imageUrl: string;
  hasActivePower?: boolean;
}

export type Role = 'sheriff' | 'deputy' | 'outlaw' | 'renegade';

export type CharacterName =
  | 'bart cassidy'
  | 'black jack'
  | 'calamity janet'
  | 'el gringo'
  | 'jesse jones'
  | 'jourdonnais'
  | 'kit carlson'
  | 'lucky duke'
  | 'paul regret'
  | 'pedro ramirez'
  | 'rose doolan'
  | 'sid ketchum'
  | 'slab the killer'
  | 'suzy lafayette'
  | 'vulture sam'
  | 'willy the kid'
  | 'black flower'
  | 'colorado bill'
  | 'der spot - burst ringer'
  | 'evelyn shebang'
  | 'henry block'
  | 'lemonade jim'
  | 'mick defender'
  | 'tuco franziskaner';

export type CardName =
  | 'barrel'
  | 'dynamite'
  | 'jail'
  | 'mustang'
  | 'remington'
  | 'rev carabine'
  | 'schofield'
  | 'scope'
  | 'volcanic'
  | 'winchester'
  | 'bang'
  | 'beer'
  | 'cat balou'
  | 'duel'
  | 'gatling'
  | 'general store'
  | 'indians'
  | 'missed'
  | 'panic'
  | 'saloon'
  | 'stagecoach'
  | 'wells fargo';

export interface ICardsToGenerate {
  [cardType: string]: ICardGenerationInfo[];
}

export interface ICardGenerationInfo {
  name: CardName | CardNameVOS;
  imageUrl: string;
  values: {
    [suit: string]: number[];
  };
}

export interface ILookup {
  [key: number]: any;
}

export type RobbingType = 'hand' | 'equipment';

export interface IGameResult {
  winners: IGamePlayer[];
  team: string;
}
