import { Semaphore } from './semaphore';
import { Philosopher } from './philosopher';
import { SimulationLogger } from './logger';

// Número de filósofos y rondas a simular.
const PHILOSOPHERS = 5;
const ROUNDS = 3;

const logger = new SimulationLogger(PHILOSOPHERS);
logger.intro();

// Cada tenedor se modela como un semáforo binario.
const forks = Array.from({ length: PHILOSOPHERS }, () => new Semaphore(1));
// Mayordomo: solo se permite que cuatro filósofos intenten comer simultáneamente.
const tableLimit = new Semaphore(PHILOSOPHERS - 1);

const philosophers = Array.from({ length: PHILOSOPHERS }, (_, index) => {
  const leftFork = forks[index];
  const rightFork = forks[(index + 1) % PHILOSOPHERS];
  return new Philosopher({
    id: index,
    leftFork,
    rightFork,
    leftForkId: index,
    rightForkId: (index + 1) % PHILOSOPHERS,
    tableLimit,
    iterations: ROUNDS,
    logger
  });
});

// Esperamos a que todos completen sus rondas antes de mostrar el resumen.
Promise.all(philosophers.map((philosopher) => philosopher.live())).then(() => {
  logger.summary(ROUNDS);
});
