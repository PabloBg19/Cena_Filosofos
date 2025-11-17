import { Semaphore } from './semaphore';
import { randomDelay } from './utils';
import { SimulationLogger } from './logger';

export interface PhilosopherConfig {
  id: number;
  leftFork: Semaphore;
  rightFork: Semaphore;
  leftForkId: number;
  rightForkId: number;
  tableLimit: Semaphore;
  iterations: number;
  logger: SimulationLogger;
}

/**
 * Clase que modela el comportamiento de un filósofo dentro de la cena.
 * Alterna estados de "pensar" y "comer" intentando adquirir los dos tenedores
 * necesarios. Para evitar interbloqueos se impone un orden global sobre los recursos
 * (siempre se toma primero el tenedor con índice más pequeño) y se limita el número de
 * filósofos que pueden acercarse a la mesa simultáneamente.
 */
export class Philosopher {
  private readonly id: number;
  private readonly leftFork: Semaphore;
  private readonly rightFork: Semaphore;
  private readonly leftForkId: number;
  private readonly rightForkId: number;
  private readonly tableLimit: Semaphore;
  private readonly iterations: number;
  private readonly logger: SimulationLogger;

  constructor(config: PhilosopherConfig) {
    this.id = config.id;
    this.leftFork = config.leftFork;
    this.rightFork = config.rightFork;
    this.leftForkId = config.leftForkId;
    this.rightForkId = config.rightForkId;
    this.tableLimit = config.tableLimit;
    this.iterations = config.iterations;
    this.logger = config.logger;
  }

  /**
   * Bucle principal del filósofo. Piensa y come tantas veces como indique la simulación.
   */
  async live(): Promise<void> {
    for (let i = 1; i <= this.iterations; i++) {
      await this.think(i);
      await this.eat(i);
    }
  }

  private async think(iteration: number): Promise<void> {
    this.logger.action(this.id, `Pensando antes de la ronda ${iteration}...`);
    await randomDelay(300, 1200);
  }

  private async eat(iteration: number): Promise<void> {
    await this.tableLimit.acquire();
    this.logger.action(this.id, 'Mayordomo permite acercarse a los tenedores.');

    const takeLeftFirst = this.leftForkId < this.rightForkId;
    const primary = takeLeftFirst ? this.leftFork : this.rightFork;
    const secondary = takeLeftFirst ? this.rightFork : this.leftFork;
    const firstName = takeLeftFirst ? 'izquierdo' : 'derecho';

    this.logger.action(this.id, `Intentando tomar el primer tenedor (${firstName})...`);
    await primary.acquire();
    this.logger.action(this.id, 'Primer tenedor asegurado.');

    this.logger.action(this.id, 'Buscando el segundo tenedor...');
    await secondary.acquire();
    this.logger.action(this.id, 'Segundo tenedor asegurado, comienza a comer.');

    await randomDelay(400, 900);
    this.logger.action(this.id, `Finaliza la ronda ${iteration} y suelta los tenedores.`);

    primary.release();
    secondary.release();
    this.tableLimit.release();
  }
}
