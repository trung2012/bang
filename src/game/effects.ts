export const config = {
  effects: {
    gunshot: {
      create: (cardId: string) => cardId,
    },
    explosion: {},
    gunCock: {
      create: (cardId: string) => cardId,
    },
    takeDamage: {},
    gatling: {
      create: (cardId: string) => cardId,
    },
    horse: {
      create: (cardId: string) => cardId,
    },
    swoosh: {},
    jail: {},
    beer: {
      create: (cardId: string) => cardId,
    },
  },
};

export type BangEffectsConfig = typeof config;