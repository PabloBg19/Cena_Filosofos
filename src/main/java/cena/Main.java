package cena;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Semaphore;

/**
 * Punto de entrada de la simulación. Configura los recursos y lanza las hebras.
 */
public class Main {
    public static void main(String[] args) throws InterruptedException {
        int cantidadFilosofos = args.length > 0 ? Integer.parseInt(args[0]) : 5;
        int rondas = args.length > 1 ? Integer.parseInt(args[1]) : 3;

        Registro registro = new Registro();
        registro.info(-1, RegistroColores.MORADO,
                String.format("Inicia la cena con %d filósofos y %d rondas", cantidadFilosofos, rondas));

        Palillo[] palillos = new Palillo[cantidadFilosofos];
        for (int i = 0; i < cantidadFilosofos; i++) {
            palillos[i] = new Palillo(i);
        }

        Semaphore mayordomo = new Semaphore(cantidadFilosofos - 1, true);
        List<Thread> hilos = new ArrayList<>();

        for (int i = 0; i < cantidadFilosofos; i++) {
            Palillo izquierdo = palillos[i];
            Palillo derecho = palillos[(i + 1) % cantidadFilosofos];
            Filosofo filosofo = new Filosofo(i + 1, izquierdo, derecho, mayordomo, registro, rondas);
            Thread hilo = new Thread(filosofo, "Filosofo-" + (i + 1));
            hilos.add(hilo);
            hilo.start();
        }

        for (Thread hilo : hilos) {
            hilo.join();
        }

        registro.info(-1, RegistroColores.MORADO, "La cena termina en paz y sin interbloqueos");
    }
}
