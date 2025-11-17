package cena;

import java.util.concurrent.Semaphore;

/**
 * Cada filósofo es una hebra independiente que piensa y come varias rondas.
 */
public class Filosofo implements Runnable {
    private final int id;
    private final Palillo palilloIzquierdo;
    private final Palillo palilloDerecho;
    private final Semaphore mayordomo;
    private final Registro registro;
    private final int rondas;

    public Filosofo(int id, Palillo palilloIzquierdo, Palillo palilloDerecho, Semaphore mayordomo,
            Registro registro, int rondas) {
        this.id = id;
        this.palilloIzquierdo = palilloIzquierdo;
        this.palilloDerecho = palilloDerecho;
        this.mayordomo = mayordomo;
        this.registro = registro;
        this.rondas = rondas;
    }

    @Override
    public void run() {
        try {
            for (int ronda = 1; ronda <= rondas; ronda++) {
                pensar(ronda);
                comer(ronda);
            }
            registro.info(id, RegistroColores.MORADO, "terminó todas sus rondas y se despide");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            registro.info(id, RegistroColores.AMARILLO,
                    "fue interrumpido por el docente o el sistema");
        }
    }

    private void pensar(int ronda) throws InterruptedException {
        registro.info(id, RegistroColores.AMARILLO,
                String.format("está pensando para la ronda %d", ronda));
        TiempoAleatorio.dormir(500, 1500);
    }

    private void comer(int ronda) throws InterruptedException {
        mayordomo.acquire();
        registro.info(id, RegistroColores.CYAN, "recibe permiso del mayordomo");

        Palillo primero = palilloIzquierdo.getId() < palilloDerecho.getId() ? palilloIzquierdo : palilloDerecho;
        Palillo segundo = palilloIzquierdo.getId() < palilloDerecho.getId() ? palilloDerecho : palilloIzquierdo;

        primero.tomar(id, registro);
        segundo.tomar(id, registro);

        registro.info(id, RegistroColores.VERDE,
                String.format("come tranquilamente en la ronda %d", ronda));
        TiempoAleatorio.dormir(500, 1200);

        segundo.soltar(id, registro);
        primero.soltar(id, registro);

        mayordomo.release();
        registro.info(id, RegistroColores.CYAN, "entrega el permiso al mayordomo");
    }
}
