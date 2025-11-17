package cena;

/**
 * Paleta mínima de colores ANSI para mostrar mensajes legibles en consola.
 * Todo el comentario está en español para mantener coherencia con la entrega.
 */
public final class RegistroColores {
    public static final String RESET = "\u001B[0m";
    public static final String VERDE = "\u001B[32m";
    public static final String AMARILLO = "\u001B[33m";
    public static final String AZUL = "\u001B[34m";
    public static final String MORADO = "\u001B[35m";
    public static final String CYAN = "\u001B[36m";

    private RegistroColores() {
    }
}
