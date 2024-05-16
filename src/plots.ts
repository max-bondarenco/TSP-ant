import { Layout, plot, Plot } from 'nodeplotlib';
import { Environment } from './Environment.js';

export const makePlot = (
  env: Environment,
  path: number[],
  pathLength: number,
): void => {
  const x: number[] = [];
  const y: number[] = [];
  const names: string[] = [];

  path.forEach((i) => {
    x.push(env.clients[i].point.x);
    y.push(env.clients[i].point.y);
    names.push(env.clients[i].name);
  });

  const data: Plot[] = [
    {
      x,
      y,
      mode: 'text+lines+markers',
      text: names,
      textposition: 'top center',
      type: 'scatter',
    },
  ];

  const layout: Layout = {
    title: `Generation: ${env.generation}, Length: ${pathLength.toFixed(0)}`,
  };

  plot(data, layout);
};
