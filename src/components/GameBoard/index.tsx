import { BoardProps } from 'boardgame.io/react';
import React from 'react';
import { AnimationProvider, CardsProvider, ErrorProvider, GameContext } from '../../context';
import { IGameState } from '../../game';
import { GameTable } from './GameTable.tsx';
import 'tippy.js/dist/tippy.css';
import { ModalProvider } from '../../context/modal';

export const GameBoard: React.FC<BoardProps<IGameState>> = ({
  G,
  ctx,
  moves,
  events,
  playerID,
  isActive,
  matchData: playersInfo,
}) => {
  return (
    <GameContext.Provider
      value={{
        G,
        ctx,
        moves,
        events,
        playerID,
        isActive,
        playersInfo,
      }}
    >
      <ErrorProvider>
        <AnimationProvider>
          <CardsProvider>
            <ModalProvider>
              <GameTable />
            </ModalProvider>
          </CardsProvider>
        </AnimationProvider>
      </ErrorProvider>
    </GameContext.Provider>
  );
};
