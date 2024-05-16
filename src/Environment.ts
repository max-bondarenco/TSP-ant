import { Client } from './index.d.js';
import { choose, dist } from './utils.js';

export class Environment {
  private distances: number[][] = [];
  public pheromone: number[][] = [];
  public generation = 1;

  constructor(public clients: Client[]) {
    for (let i = 0; i < clients.length; i++) {
      this.distances.push([]);
      this.pheromone.push([]);
    }
  }

  public getClientsClone(): Client[] {
    const result: Client[] = [];
    this.clients.forEach((c) => result.push({ ...c }));
    return result;
  }

  public setBasePheromone(value: number): void {
    this.pheromone.forEach((p) => {
      for (let i = 0; i < this.clients.length; i++) {
        p.push(value);
      }
    });
  }

  public getDistance(index1: number, index2: number): number {
    if (this.distances[index1][index2] === undefined) {
      const distance = dist(
        this.clients[index1].point,
        this.clients[index2].point,
      );

      this.distances[index1][index2] = distance;
      this.distances[index2][index1] = distance;
    }

    return this.distances[index1][index2];
  }

  public getDesire(
    index1: number,
    index2: number,
    alpha: number,
    beta: number,
  ): number {
    return (
      Math.pow(this.pheromone[index1][index2], alpha) /
      Math.pow(this.getDistance(index1, index2), beta)
    );
  }

  public increasePheromones(path: number[], value: number) {
    let index1, index2;
    for (let i = 1; i < path.length; i++) {
      index1 = path[i];
      index2 = path[i - 1];

      this.pheromone[index1][index2] += value;
      this.pheromone[index2][index1] += value;
    }
  }

  public degradatePheromones(value: number) {
    for (let i = 0; i < this.pheromone.length; i++) {
      for (let j = 0; i < this.pheromone.length; i++)
        this.pheromone[i][j] *= value;
    }
  }
}
