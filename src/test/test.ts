import assert from 'assert';
import { dist, randInt } from '../utils.js';
import { Point } from '../index.d.js';
import { Environment } from '../Environment.js';
import { traverse } from '../TSP.js';

describe('Math Fucntions', () => {
  describe('randInt()', () => {
    it('should return random integer in given bounds, inclusive', () => {
      let curInt: number;
      const min = -10;
      const max = 10;

      for (let t = 0; t < 100; t++) {
        curInt = randInt(min, max);
        assert(curInt >= min && curInt <= max);
      }
    });
  });

  describe('dist()', () => {
    it('should return distance between two points', () => {
      const p1: Point = { x: 4, y: 5 };
      const p2: Point = { x: 1, y: 1 };

      assert.equal(dist(p1, p2), 5);
    });
  });
});

describe('Algorithm', () => {
  const testEnv = new Environment([
    { name: 'A', point: { x: -10, y: 10 }, visited: false, desireToVisit: 0 },
    { name: 'B', point: { x: 0, y: 0 }, visited: false, desireToVisit: 0 },
    { name: 'C', point: { x: -10, y: 5 }, visited: false, desireToVisit: 0 },
    { name: 'D', point: { x: 15, y: -5 }, visited: false, desireToVisit: 0 },
    { name: 'E', point: { x: 5, y: -10 }, visited: false, desireToVisit: 0 },
  ]);
  testEnv.setBasePheromone(0.1);
  let alpha, beta, Q;

  describe('Path generation', () => {
    it('should visit all nodes once and end up in first node', () => {
      alpha = 1;
      beta = 1;

      const [path, pathLength] = traverse(testEnv, alpha, beta, 0);
      assert.equal(path.length, testEnv.clients.length + 1);
      assert.equal(path[0], path[path.length - 1]);
      assert(pathLength > 0);

      const unique = new Set(path);
      assert.equal(unique.size, testEnv.clients.length);
    });
  });

  describe('Path choise', () => {
    it('should choose shorter path in most cases', () => {
      alpha = 1;
      beta = 2;

      let path,
        pathLength,
        counter = 0;

      for (let i = 0; i < 100; i++) {
        [path, pathLength] = traverse(testEnv, alpha, beta, 0);
        if (path[1] === 2) counter++;
      }

      assert(counter >= 60);
    });
  });

  describe('Pheromone trail', () => {
    it('should leave trail of pheromones on the way', () => {
      alpha = 1;
      beta = 1;
      Q = 1;

      const [path, pathLength] = traverse(testEnv, alpha, beta, 0);

      const oldPheromone: number[][] = [];
      for (let i = 0; i < testEnv.pheromone.length; i++) {
        oldPheromone.push([...testEnv.pheromone[i]]);
      }

      testEnv.increasePheromones(path, Q / pathLength);

      for (let i = 1; i < path.length; i++) {
        assert(
          oldPheromone[path[i]][path[i - 1]] <
            testEnv.pheromone[path[i]][path[i - 1]],
        );
      }
    });
  });
});
