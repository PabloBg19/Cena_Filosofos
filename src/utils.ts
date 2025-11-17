/**
 * Devuelve una promesa que se resuelve tras un número aleatorio de milisegundos.
 */
export const randomDelay = (min: number, max: number): Promise<void> => {
  const duration = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, duration));
};
