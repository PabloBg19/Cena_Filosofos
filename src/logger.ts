/**
 * Pequeño ayudante para mostrar mensajes con formato y colores ANSI en consola.
 */
export class SimulationLogger {
  constructor(private readonly totalPhilosophers: number) {}

  private timestamp(): string {
    return this.colorGray(new Date().toISOString());
  }

  intro(): void {
    console.log('\n=== Simulación: La cena de los filósofos ===\n');
    console.log('Cinco filósofos se sientan alrededor de una mesa circular, intercalando pensar y comer.\n');
  }

  action(id: number, message: string): void {
    const colorizers = [this.colorCyan, this.colorGreen, this.colorMagenta, this.colorYellow, this.colorBlue];
    const color = colorizers[id % colorizers.length];
    console.log(`${this.timestamp()} ${color.call(this, `Filósofo ${id + 1}`)} ➜ ${message}`);
  }

  summary(successfulMeals: number): void {
    console.log(
      `\n${this.colorBold(
        `Todos los filósofos han completado ${successfulMeals} rondas sin hambruna ni interbloqueos.`
      )}\n`
    );
  }

  // Métodos auxiliares para colores (ANSI)
  private colorCyan(text: string): string {
    return `\x1b[36m${text}\x1b[0m`;
  }

  private colorGreen(text: string): string {
    return `\x1b[32m${text}\x1b[0m`;
  }

  private colorMagenta(text: string): string {
    return `\x1b[35m${text}\x1b[0m`;
  }

  private colorYellow(text: string): string {
    return `\x1b[33m${text}\x1b[0m`;
  }

  private colorBlue(text: string): string {
    return `\x1b[34m${text}\x1b[0m`;
  }

  private colorGray(text: string): string {
    return `\x1b[90m${text}\x1b[0m`;
  }

  private colorBold(text: string): string {
    return `\x1b[1m${text}\x1b[0m`;
  }
}
