/**
 * Implementación sencilla de un semáforo para entornos asincrónicos.
 * Gestiona una cola FIFO de promesas que se resuelven por orden de llegada.
 */
export class Semaphore {
  private permits: number;
  private queue: Array<() => void> = [];

  constructor(initialPermits: number) {
    if (initialPermits <= 0) {
      throw new Error('El número inicial de permisos debe ser mayor que cero.');
    }
    this.permits = initialPermits;
  }

  /**
   * Solicita un permiso. Si no hay disponibles se bloquea hasta que otro filósofo libere.
   */
  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits -= 1;
      return;
    }

    await new Promise<void>((resolve) => {
      this.queue.push(resolve);
    });
  }

  /**
   * Libera un permiso para que otro filósofo pueda continuar.
   */
  release(): void {
    const next = this.queue.shift();
    if (next) {
      next();
    } else {
      this.permits += 1;
    }
  }
}
