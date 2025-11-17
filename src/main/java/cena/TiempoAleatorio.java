package cena;

import java.util.concurrent.ThreadLocalRandom;

/**
 * Utilidad para dormir entre dos valores y simular tiempos humanos.
 */
public final class TiempoAleatorio {
    private TiempoAleatorio() {
    }

    public static void dormir(int minimoMs, int maximoMs) throws InterruptedException {
        int espera = ThreadLocalRandom.current().nextInt(minimoMs, maximoMs + 1);
        Thread.sleep(espera);
    }
}
