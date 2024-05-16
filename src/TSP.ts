import { Environment } from './Environment.js';
import { Client, TSPParams } from './index.d.js';
import { choose, randInt } from './utils.js';
import { makePlot } from './plots.js';

export default ({
  alpha = 1,
  beta = 1,
  Q = 1,
  env,
  basePheromone = 0.05,
  pheromoneDegradation = 0.05,
  antsPerGeneration = 10,
  maxGenerations = 100,
  viewPlot,
}: TSPParams) => {
  env.setBasePheromone(basePheromone);

  let path: number[];
  let pathLength: number;
  let bestPath: number[];
  let bestLenth: number = Infinity;

  while (env.generation <= maxGenerations) {
    for (let i = 0; i < antsPerGeneration; i++) {
      [path, pathLength] = traverse(
        env,
        alpha,
        beta,
        randInt(0, env.clients.length - 1),
      );

      if (bestLenth > pathLength) {
        bestLenth = pathLength;
        bestPath = path;
      }

      env.increasePheromones(path, Q / pathLength);
    }

    env.degradatePheromones(pheromoneDegradation);

    env.generation++;

    if (viewPlot === 'bestOfGeneration') makePlot(env, bestPath!, bestLenth!);
  }

  if (viewPlot === 'best') makePlot(env, bestPath!, bestLenth!);
};

export const traverse = (
  env: Environment,
  alpha: number,
  beta: number,
  start: number = 0,
): [number[], number] => {
  const clients = env.getClientsClone();
  const path = [start];

  let currentIndex = start;
  let currentClient = clients[currentIndex];
  let pathLength = 0;
  let prevIndex;

  let nextClient;
  let destinations: Client[];

  while (path.length < clients.length) {
    destinations = [];
    currentClient.visited = true;

    for (let nextIndex = 0; nextIndex < clients.length; nextIndex++) {
      if (clients[nextIndex].visited) continue;
      nextClient = clients[nextIndex];

      nextClient.desireToVisit = env.getDesire(
        currentIndex,
        nextIndex,
        alpha,
        beta,
      );

      destinations.push(nextClient);
    }

    currentClient = choose(destinations);

    prevIndex = currentIndex;
    currentIndex = clients.indexOf(currentClient);

    path.push(currentIndex);
    pathLength += env.getDistance(prevIndex, currentIndex);
  }

  path.push(start);
  pathLength += env.getDistance(currentIndex, start);

  return [path, pathLength];
};
