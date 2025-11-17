package cena;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

/**
 * Registro centralizado para que los filósofos escriban mensajes ordenados.
 */
public class Registro {
    private static final DateTimeFormatter FORMATO = DateTimeFormatter.ofPattern("HH:mm:ss");

    public synchronized void info(int filosofoId, String color, String mensaje) {
        var marca = LocalTime.now().format(FORMATO);
        System.out.printf("[%s] Filósofo %d -> %s%s%s%n", marca, filosofoId, color, mensaje, RegistroColores.RESET);
    }
}
