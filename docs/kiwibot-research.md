# Kiwibot / robot.com — investigación para la aplicación

_Investigado el 24 sep 2026. Fuentes al final. Esto es contexto para Nicolás; no va en el sitio._

## Resumen (lo que importa para aplicar)

1. **Kiwibot y robot.com son la misma empresa.** Kiwibot compró el dominio robot.com y se rebautizó (anuncio en mayo de 2025, relanzamiento oficial el 29 oct 2025). kiwibot.com redirige a robot.com; los avisos dicen "Robot.com (formerly Kiwibot)". HQ en San Francisco, equipos en Medellín y Taiwán.
2. **Qué construyen:** R-Kiwi (robot de reparto en andenes y campus: LiDAR 3D, 6 cámaras HD, cómputo NVIDIA, batería de 10–12 h), R-Cargo (logística), R-Noid (humanoide con ruedas) y R-Dog (2027). Más de 500 robots en más de 30 campus y ciudades. Ensamble en Medellín y teleoperación desde Colombia.
3. **Única práctica técnica abierta hoy:** *Robotics Embedded Systems Intern* (SF, equipo de Autonomía). Pide Python y C++, ROS/ROS2, Docker, Git, integración de sensores (LiDAR, cámaras estéreo, IMU, GPS/RTK), ARM, IoT, firmware/OTA, **"communication protocols for sensors, actuators and robot boards"** y depurar **"from firmware bugs to hardware malfunctions"**.
4. **Lo que piden los roles de hardware ya cerrados:** Senior Electrical/Embedded pedía **Altium / KiCad / LTspice**, captura de esquemáticos, selección de componentes, C/C++, RTOS, EMI/EMC, electrónica de potencia, BMS y **control de motores**. Robotics Intern (Mech/Elec/SW) pedía armar, calibrar y modificar prototipos, Python, microcontroladores, integración de sensores, impresión 3D y ser *"a tinkerer and a builder"*. Además exigía **autorización para trabajar en EE. UU.**
5. **Cultura:** despliegue real por encima de laboratorio ("Built for sidewalks, not labs"), *Own Your Domain*, *Learn from Deployment*, responsabilidad desde el día 1, y "Chill if you don't check every box".

## Cómo encaja con tu experiencia real

| Lo que valoran | Tu evidencia | Encaje |
| --- | --- | --- |
| PCB design, schematic capture (Altium, LTspice) | PCB a la medida para Diseño de Sistemas Basados en Procesadores; Altium y LTspice en el CV | **Fuerte** |
| C/C++ firmware en MCU | FIR sobre PIC (drivers SPI, parser UART, FSM), DreamSnake en C++ | **Fuerte** |
| Protocolos entre sensores, actuadores y placas | SPI (ADC/DAC), UART, I²C (LCD), MQTT (PROTEO), PWM (motor, servo) | **Fuerte** |
| Depuración de firmware a hardware | Monitorías: depuración en C, interrupciones, temporización | **Fuerte** |
| Control de motores | Banda transportadora: puente H L298N, PWM mínimo contra la fricción, zona muerta; servo con pulsos en µs | Medio (lazo abierto) |
| Python e integración de sensores en Linux/ARM | PROTEO en Raspberry Pi: sensor IR por GPIO, servo con pigpio, MQTT con LWT | Medio-fuerte |
| IoT y estado de flota | Topic Last Will online/offline en PROTEO (mismo concepto que el monitoreo de flota) | Medio |
| Impresión 3D, prototipado | En el CV | Medio |
| Deployment real | Voltio en piloto con usuarios reales; apps en producción para clientes | Medio (software) |
| ROS/ROS2, Docker, RTOS, EMI/EMC, BMS, KiCad | **No aparecen en tu experiencia** | No usar |

## Decisiones que tomé en el sitio con base en esto

- Orden: hardware destacado primero; experiencia (monitorías con PCB) enseguida; skills como datasheet.
- Vocabulario tomado de sus avisos, **solo donde es cierto**: *sensor integration*, *motor control*, *communication protocols*, *debugging*, *schematic*, *Altium*, *LTspice*, *embedded Linux (Raspberry Pi, ARM)*.
- Se muestran explícitamente Python + Raspberry Pi + MQTT (PROTEO), porque la única práctica abierta es de Autonomía/embebidos.
- No se mencionan ROS, Docker, RTOS, KiCad, BMS ni EMI/EMC.

## Riesgos y recomendaciones

- La práctica abierta es en **San Francisco, presencial**. La que se cerró exigía autorización de trabajo en EE. UU. Si no la tienes, conviene preguntar directamente por **Medellín** (Hardware & Manufacturing o el *University Program*) o por prácticas remotas.
- En Colombia piden inglés **B2/C1** y **visa de EE. UU.** para viajar a los sitios. Tu B2 cumple el mínimo.
- Un repo pequeño con **ROS 2 + Raspberry Pi** (por ejemplo, publicar el sensor IR de PROTEO como nodo ROS 2) cerraría la brecha más visible frente al aviso abierto. Es una sugerencia; no está en el sitio.

## Origen (contexto)

Felipe Chávez (CEO) fundó Lulo, un servicio de mensajería en Bogotá, hacia 2015–16. Kiwi Campus nació en el SkyDeck de UC Berkeley y sus primeros robots rodaron allí en marzo de 2017. La fecha de fundación aparece como 2016 o 2017 según la fuente. Rondas conocidas: US$7.5 M pre-Serie A en 2022 (Sodexo entre los inversionistas) y unos US$24 M en total según Tracxn. En 2024 compraron Auto Mobility Solutions (Taipéi). Tienen cerca de 400 empleados, alrededor del 30 % en Colombia.

## Fuentes

- https://www.robot.com/ · https://www.robot.com/r-kiwi · https://www.robot.com/robotics · https://www.robot.com/careers
- https://robot.na.teamtailor.com/jobs/391741-robotics-embedded-systems-intern (abierta)
- https://robot.na.teamtailor.com/jobs/580928-junior-implementation-engineer (Medellín)
- https://web.archive.org/web/20251103025419/https://kiwibot.na.teamtailor.com/jobs/391863-robotics-intern-mechanical-electrical-software (cerrada)
- https://web.archive.org/web/20251207225805/https://robot.na.teamtailor.com/jobs/304608-senior-electrical-embedded-systems-engineer (cerrada)
- https://www.newswire.com/news/kiwibot-transforms-into-robot-com-setting-stage-for-global-automation-22570341
- https://restofworld.org/2025/colombia-robotcom-global-robotics-expansion/
- https://retailtechinnovationhub.com/home/2025/10/29/kiwibot-turns-into-robotcom-as-sodexo-amazon-web-services-and-skip-deploy-its-technology
- https://thenextweb.com/news/robot-com-kiwibot-r-noid-humanoid-workplace-physical-intelligence
- https://developer.nvidia.com/blog/kiwibot-arrives-in-san-jose/
- https://github.com/kiwicampus (hoy "Robot.com-Autonomy")
