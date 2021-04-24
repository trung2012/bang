import {} from 'gsap/all';

export const effectNames = {
  barrel: 'barrel',
};

export type EffectName = keyof typeof effectNames;

export const cardAnimations = {
  barrel: (id: string) => {},
};

export const animateCard = (id: string, effect: EffectName) => {
  cardAnimations[effect](id);
};
