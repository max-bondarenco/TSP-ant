import { Environment } from './Environment.js';

export type Client = {
  point: Point;
  readonly name: string;
  visited: boolean;
  desireToVisit: number;
};

export type TSPParams = {
  env: Environment;
  alpha?: number;
  beta?: number;
  maxGenerations?: number;
  antsPerGeneration?: number;
  basePheromone?: number;
  pheromoneDegradation?: number;
  Q?: number;
  viewPlot: 'best' | 'bestOfGeneration';
};

export type Point = {
  x: number;
  y: number;
};
