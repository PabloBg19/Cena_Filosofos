# ☕️ Cena de los filósofos en Java con hilos reales

Trabajo completo y en español para ilustrar el problema clásico de concurrencia en una materia de sistemas operativos o programación concurrente. Todo el código está comentado de forma "humana" y se puede ejecutar únicamente con el JDK.

## 1. Objetivos de la práctica
- Entender cómo los filósofos compiten por recursos limitados (palillos) y por qué se producen interbloqueos.
- Poner en práctica hilos (`Thread`), semáforos y candados justos de la biblioteca estándar de **Java**.
- Proporcionar una simulación observable con registros en consola para usar en un informe o exposición.

## 2. Elementos principales
- **Mayordomo (Semaphore)**: limita a `N-1` filósofos intentando comer al mismo tiempo.
- **Orden global de recursos**: cada filósofo toma primero el palillo con número menor y luego el mayor.
- **Palillos con `ReentrantLock` justo**: evita inanición porque los turnos respetan el orden de llegada.
- **Registro coloreado**: imprime la hora, el filósofo y la acción, todo en español.

## 3. Estructura del repositorio
```
├── src
│   └── main
│       └── java
│           └── cena
│               ├── Filosofo.java       # Lógica de cada hilo
│               ├── Main.java           # Punto de entrada
│               ├── Palillo.java        # Representación de cada recurso
│               ├── Registro.java       # Salida sincronizada
│               ├── RegistroColores.java# Códigos ANSI
│               └── TiempoAleatorio.java# Pausas aleatorias
├── README.md
└── .gitignore
```

## 4. Cómo ejecutar
1. Compila todos los archivos (se asume que tienes `javac`):
   ```bash
   mkdir -p out
   javac -d out $(find src -name "*.java")
   ```
2. Lanza la simulación con los valores por defecto (5 filósofos, 3 rondas):
   ```bash
   java -cp out cena.Main
   ```
3. Opcional: pasa parámetros personalizados (`filósofos` `rondas`):
   ```bash
   java -cp out cena.Main 6 5
   ```

## 5. Guion sugerido para tu informe
1. **Introducción**: qué es la cena de los filósofos y qué problemas ilustra.
2. **Modelo de recursos**: mesa redonda, dos palillos por filósofo y sección crítica.
3. **Diseño de la solución**: describe al mayordomo, el orden de palillos y los candados justos.
4. **Implementación en Java**: explica las clases anteriores y el ciclo pensar/comer.
5. **Prevención de interbloqueos**: relaciona cada técnica con el problema original.
6. **Resultados**: pega un fragmento del log coloreado y resalta que todos comen sin inanición.
7. **Conclusiones personales**: aprendizajes sobre sincronización y diseño concurrente.

## 6. Ejemplo breve de salida
```
[12:14:08] Filósofo 1 -> recibe permiso del mayordomo
[12:14:08] Filósofo 1 -> toma el palillo 0
[12:14:09] Filósofo 1 -> toma el palillo 1
[12:14:09] Filósofo 1 -> come tranquilamente en la ronda 1
...
[12:14:15] Filósofo 4 -> terminó todas sus rondas y se despide
[12:14:16] Filósofo -1 -> La cena termina en paz y sin interbloqueos
```

Con esto tienes todo listo para mostrar en clase: código Java con hilos reales, explicación paso a paso y una guía para documentar el trabajo.
