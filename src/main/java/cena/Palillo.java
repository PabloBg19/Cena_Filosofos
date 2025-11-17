package cena;

import java.util.concurrent.locks.ReentrantLock;

/**
 * Cada palillo es un recurso protegido por un candado justo para evitar inanición.
 */
public class Palillo {
    private final int id;
    private final ReentrantLock candado = new ReentrantLock(true);

    public Palillo(int id) {
        this.id = id;
    }

    public void tomar(int filosofoId, Registro registro) throws InterruptedException {
        registro.info(filosofoId, RegistroColores.CYAN,
                String.format("espera el palillo %d", id));
        candado.lockInterruptibly();
        registro.info(filosofoId, RegistroColores.VERDE,
                String.format("toma el palillo %d", id));
    }

    public void soltar(int filosofoId, Registro registro) {
        candado.unlock();
        registro.info(filosofoId, RegistroColores.AZUL,
                String.format("deja el palillo %d", id));
    }

    public int getId() {
        return id;
    }
}
