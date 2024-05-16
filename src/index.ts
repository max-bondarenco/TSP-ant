import { Environment } from './Environment.js';
import TSP from './TSP.js';
import { generateClients } from './utils.js';

const env = new Environment(
  generateClients([
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
  ]),
);

TSP({
  env,
  antsPerGeneration: 5,
  pheromoneDegradation: 0.5,
  basePheromone: 0.5,
  maxGenerations: 5000,
  alpha: 1,
  beta: 1.5,
  Q: 4,
  viewPlot: 'best',
});
