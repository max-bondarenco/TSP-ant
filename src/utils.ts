import { Client, Point } from './index.d.js';

export const randInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const probability = (p: number): boolean => {
  return Math.random() <= p;
};

export const dist = (p1: Point, p2: Point): number => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

export const generateClients = (names: string[]): Client[] => {
  return names.map((name) => ({
    point: { x: randInt(-50, 50), y: randInt(-50, 50) },
    name,
    visited: false,
    desireToVisit: 0,
  }));
};

export const choose = (destinations: Client[]): Client => {
  destinations.sort((a, b) => a.desireToVisit - b.desireToVisit);

  const sumDesire = destinations.reduce(
    (acc, cur) => acc + cur.desireToVisit,
    0,
  );

  for (let i = 0; i < destinations.length; i++) {
    if (probability(destinations[i].desireToVisit / sumDesire))
      return destinations[i];
  }
  return destinations[0];
};
