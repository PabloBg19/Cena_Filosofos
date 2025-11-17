# 🧠 La cena de los filósofos (TypeScript)

Proyecto didáctico para la asignatura de Diseño de Interfaces Web. El objetivo es resolver el clásico problema de la **Cena de los Filósofos** empleando **TypeScript**, modelando a cada filósofo como una tarea asincrónica y utilizando una implementación sencilla de semáforos para garantizar la exclusión mutua.

## 1. Descripción general

### 1.1 Objetivos del ejercicio
- Comprender cómo funciona el problema de concurrencia de la cena de los filósofos.
- Practicar la programación orientada a objetos y asincronía con TypeScript.
- Implementar una solución que evite el **interbloqueo** y la **inanición**.

### 1.2 Descripción del problema
Cinco filósofos están sentados en una mesa circular. Alternan entre **pensar** y **comer**, pero para comer necesitan dos tenedores (izquierdo y derecho). Solo hay un tenedor entre cada filósofo, por lo que deben coordinarse sin bloquearse.

## 2. Requisitos técnicos
1. Cada filósofo se representa con la clase `Philosopher` y se ejecuta como una tarea asincrónica independiente.
2. Los semáforos (`Semaphore`) administran el acceso exclusivo a los tenedores y actúan también como mayordomo (solo cuatro filósofos pueden acercarse a la vez).
3. El orden de adquisición de tenedores sigue el índice numérico: siempre se toma primero el tenedor con número más pequeño, eliminando ciclos de espera.
4. Se registran los eventos en consola mediante `SimulationLogger` para analizar el comportamiento.

## 3. Estructura del proyecto
```
├── src
│   ├── index.ts           # Punto de entrada de la simulación
│   ├── logger.ts          # Salida en consola con mensajes claros
│   ├── philosopher.ts     # Lógica de cada filósofo
│   ├── semaphore.ts       # Implementación de semáforos
│   └── utils.ts           # Funciones auxiliares (delays aleatorios)
├── package.json           # Scripts (build/start) sin dependencias externas
├── tsconfig.json          # Configuración del compilador
└── README.md              # Este documento
```

## 4. Puesta en marcha
1. **Instalar dependencias** (no se descarga nada porque no hay librerías externas)
   ```bash
   npm install
   ```
2. **Compilar y ejecutar la simulación**
   ```bash
   npm start
   ```

> 💡 Todos los mensajes están en español y describen claramente el estado de cada filósofo para que el informe sea "humano" y fácil de seguir en clase.

## 5. Explicación rápida del código
- **`Semaphore`**: controla cuántos filósofos pueden usar cada tenedor (uno a la vez) y actúa como mayordomo de la mesa.
- **`Philosopher`**: alterna entre pensar y comer. Respeta el orden global de tenedores (menor índice primero) para eliminar interbloqueos.
- **`SimulationLogger`**: añade marcas de tiempo y colores ANSI para que el registro sea comprensible.
- **`index.ts`**: crea los cinco filósofos, asigna los tenedores y lanza la simulación con tres rondas.

## 6. Estrategias contra el interbloqueo e inanición
- **Orden global de recursos**: cada filósofo toma primero el tenedor con identificador menor, evitando ciclos.
- **Mayordomo (semáforo de capacidad 4)**: solo cuatro filósofos pueden intentar tomar tenedores simultáneamente, garantizando que siempre haya recursos libres.
- **Semáforos con cola FIFO**: los permisos se reparten por orden de llegada para que nadie se quede esperando indefinidamente.

## 7. Ejemplo de salida
```
=== Simulación: La cena de los filósofos ===
Cinco filósofos se sientan alrededor de una mesa circular, intercalando pensar y comer.
2025-11-17T08:34:41.935Z Filósofo 3 ➜ Pensando antes de la ronda 1...
...
Todos los filósofos han completado 3 rondas sin hambruna ni interbloqueos.
```

## 8. Documentación para el informe
Puedes utilizar las siguientes secciones en tu memoria o presentación:
1. **Introducción**: Explica el problema clásico y por qué es importante.
2. **Análisis del problema**: Roles (filósofos, tenedores) y conflictos (recursos limitados).
3. **Diagrama de clases** (sugerido): `Philosopher`, `Semaphore`, `SimulationLogger`.
4. **Explicación de la implementación**: Detalla cómo cada filósofo adquiere/libera semáforos.
5. **Prevención de interbloqueo**: orden global + mayordomo + cola FIFO del semáforo.
6. **Resultados**: Incluye capturas de la consola y describe que no se detecta inanición.
7. **Conclusiones**: aprendizajes sobre concurrencia y asincronía en TypeScript.

¡Listo! Con este repositorio tienes la simulación funcionando, la teoría resumida y una guía para completar tu trabajo de clase.
