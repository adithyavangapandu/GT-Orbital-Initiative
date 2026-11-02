import type { BoardBus, BoardConnection, BoardPart, BoardSource } from '../types';

/**
 * 2D board map of the AmbaSat-1 PCB (rev 1.01) and the equipment wired to it.
 * Layout follows the AmbaSat-1 PCB reference diagram; roles and wiring follow
 * the MK-II How To Guide. Anything taken from a part datasheet rather than the
 * AmbaSat documents is marked `inferred`.
 *
 * Coordinates live in a 1000 × 620 viewBox; the board itself spans
 * x 320–680, y 130–490 (360 units ≈ 35 mm).
 */
export const BOARD = { x: 320, y: 130, size: 360 } as const;

export const busInfo: Record<BoardBus, { label: string; color: string; dashed?: boolean }> = {
  i2c: { label: 'I²C data bus', color: '#22d3ee' },
  spi: { label: 'SPI bus', color: '#4ade80' },
  uart: { label: 'Serial / programming', color: '#a78bfa' },
  clock: { label: 'Clock', color: '#f59e0b' },
  gpio: { label: 'GPIO', color: '#e2e8f0' },
  power: { label: 'Power', color: '#f87171' },
  rf: { label: 'Radio (RF)', color: '#facc15' },
  mechanical: { label: 'Mechanical mount', color: '#94a3b8', dashed: true },
};

export const sourceLabel: Record<BoardSource, string> = {
  manual: 'AmbaSat How To Guide',
  'pcb-diagram': 'AmbaSat-1 PCB diagram',
  inferred: 'Inferred from part datasheet — confirm against the AmbaSat-1 schematic',
};

/** Top-edge connection points (sensor + breakout) and bottom-edge programming pins. */
export const topHeaderPins = ['SCK', '', 'MOSI', 'D3', 'SDA', 'SCL', 'GND', 'VCC'].map((label, i) => ({
  label,
  x: 492 + i * 24.5,
  y: 146,
}));

export const programmingPins = ['DTR', 'TX', 'RX', 'VIN', 'SS', 'GND'].map((label, i) => ({
  label,
  x: 345 + i * 25.2,
  y: 470,
}));

export const boardParts: BoardPart[] = [
  {
    id: 'pcb',
    label: 'AmbaSat-1 PCB',
    partName: 'Rev 1.01 · 35 × 35 mm',
    location: 'on-board',
    install: 'pre-soldered',
    summary:
      'The motherboard. Copper traces inside it carry power and signals between every part on this map. On the MK-II kit the delicate surface-mount chips arrive already soldered; you add the antenna, pins, sensor and power.',
    shape: { x: 320, y: 130, w: 360, h: 360 },
    componentSlug: 'pcb',
    moduleSlugs: ['meet-the-ambasat', 'hardware-assembly', 'integration-and-mission-review'],
    labSlug: 'satellite-anatomy',
    source: 'pcb-diagram',
  },
  {
    id: 'mcu',
    label: 'Microcontroller',
    partName: 'ATmega328P-AN',
    location: 'on-board',
    install: 'pre-soldered',
    summary:
      'An 8-bit picoPower AVR RISC microcontroller with 32 kB of flash — the “brain” of the satellite. Your compiled firmware runs here: it reads the sensors, packages telemetry and tells the radio when to transmit.',
    shape: { x: 383, y: 158, w: 98, h: 98 },
    componentSlug: 'microcontroller',
    moduleSlugs: ['meet-the-ambasat', 'first-firmware', 'reading-sensor-data'],
    labSlug: 'telemetry-journey',
    source: 'pcb-diagram',
  },
  {
    id: 'crystal',
    label: 'Crystal / resonator',
    partName: '4 MHz',
    location: 'on-board',
    install: 'pre-soldered',
    summary:
      'Provides the microcontroller’s clock. A modest 4 MHz clock is a deliberate low-power choice: the satellite trades raw speed for energy it can sustain from a battery or solar cells.',
    shape: { x: 328, y: 136, w: 32, h: 50 },
    componentSlug: 'microcontroller',
    moduleSlugs: ['engineering-tradeoffs'],
    source: 'pcb-diagram',
  },
  {
    id: 'imu',
    label: 'IMU',
    partName: 'LSM9DS1',
    location: 'on-board',
    install: 'pre-soldered',
    summary:
      'A tri-axis gyroscope, accelerometer and magnetometer in one chip — the satellite’s sense of rotation, acceleration and orientation relative to Earth’s magnetic field.',
    shape: { x: 440, y: 338, w: 48, h: 48 },
    componentSlug: 'imu',
    moduleSlugs: ['meet-the-ambasat', 'reading-sensor-data'],
    source: 'pcb-diagram',
  },
  {
    id: 'ldo',
    label: 'Voltage regulator',
    partName: 'LDO · 2.5 V out',
    location: 'on-board',
    install: 'pre-soldered',
    summary:
      'A low-dropout (LDO) regulator that turns the incoming supply on VIN into a steady 2.5 V rail (up to 150 mA) for the chips on the board. Low dropout means it keeps regulating even as the battery voltage sags.',
    shape: { x: 332, y: 361, w: 38, h: 34 },
    componentSlug: 'battery-holder',
    moduleSlugs: ['engineering-tradeoffs', 'hardware-assembly'],
    labSlug: 'power-and-circuits',
    source: 'pcb-diagram',
  },
  {
    id: 'led',
    label: 'Onboard LED',
    partName: 'D1',
    location: 'on-board',
    install: 'pre-soldered',
    summary:
      'A status LED driven directly by the microcontroller. The AmbaSat-LED example blinks it — your first proof that firmware uploaded and runs.',
    shape: { x: 426, y: 292, w: 22, h: 30 },
    componentSlug: 'pcb',
    moduleSlugs: ['first-firmware'],
    labSlug: 'firmware-execution',
    source: 'inferred',
    note: 'Position taken from the D1 silkscreen designator.',
  },
  {
    id: 'radio',
    label: 'LoRa transceiver',
    partName: 'RFM95W',
    location: 'on-board',
    install: 'pre-soldered',
    summary:
      'The LoRa radio module: a long-range, spread-spectrum modem with high interference immunity. It turns the microcontroller’s telemetry packets into radio waves that LoRaWAN gateways can hear.',
    shape: { x: 510, y: 325, w: 153, h: 143 },
    componentSlug: 'transceiver',
    moduleSlugs: ['meet-the-ambasat', 'wireless-communication'],
    labSlug: 'telemetry-journey',
    source: 'pcb-diagram',
  },
  {
    id: 'antenna',
    label: 'Wire antenna',
    partName: '“A” pad · 91.5 mm (US) / 86.8 mm (EU)',
    location: 'on-board',
    install: 'student-installed',
    summary:
      'A single wire you solder to the “A” pad beside the transceiver and trim to your region’s frequency. Never power the board without it — the transmitter can destroy itself.',
    shape: { x: 652, y: 459, w: 260, h: 24 },
    componentSlug: 'antenna',
    moduleSlugs: ['hardware-assembly', 'wireless-communication'],
    source: 'manual',
  },
  {
    id: 'sensor-header',
    label: 'Top connection points',
    partName: 'SCK · MOSI · D3 · SDA · SCL · GND · VCC',
    location: 'on-board',
    install: 'student-installed',
    summary:
      'Eight through-hole points along the top edge. The sensor daughterboard solders across SDA, SCL, GND and VCC; the others are labelled with SPI and digital-pin names.',
    shape: { x: 480, y: 134, w: 196, h: 46 },
    componentSlug: 'sensor-daughterboard',
    moduleSlugs: ['hardware-assembly', 'reading-sensor-data'],
    source: 'pcb-diagram',
    note: 'One pin label (second from left) is not legible in the reference diagram.',
  },
  {
    id: 'prog-header',
    label: 'Programming pins',
    partName: 'DTR · TX · RX · VIN · SS · GND',
    location: 'on-board',
    install: 'student-installed',
    summary:
      'Six temporary pins on the bottom edge (silkscreen “FTDI”). They are your development port: the programmer uploads firmware through them and the battery holder powers the board through VIN/GND.',
    shape: { x: 332, y: 440, w: 154, h: 46 },
    componentSlug: 'programming-pins',
    moduleSlugs: ['hardware-assembly', 'first-firmware'],
    source: 'manual',
  },
  {
    id: 'sensor',
    label: 'Sensor daughterboard',
    partName: 'e.g. STS21 temperature',
    location: 'off-board',
    install: 'student-installed',
    summary:
      'Your mission payload. The reference diagram shows the STS21, a calibrated high-accuracy digital temperature sensor; the How To Guide lists eight sensor options in total (GPS is earthbound-only).',
    shape: { x: 560, y: 26, w: 140, h: 60 },
    componentSlug: 'sensor-daughterboard',
    moduleSlugs: ['meet-the-ambasat', 'hardware-assembly', 'reading-sensor-data'],
    source: 'pcb-diagram',
  },
  {
    id: 'programmer',
    label: 'USB programmer',
    partName: 'CH340 / FTDI',
    location: 'off-board',
    install: 'external',
    summary:
      'Bridges your computer’s USB port to the board’s serial pins. Wiring: GND↔GND, VCC↔VIN, RXD↔TX, TXD↔RX, DTR↔DTR — transmit and receive cross over.',
    shape: { x: 326, y: 545, w: 170, h: 52 },
    componentSlug: 'programmer',
    moduleSlugs: ['prepare-your-workstation', 'first-firmware'],
    source: 'manual',
  },
  {
    id: 'battery',
    label: 'Battery holder',
    partName: 'Ground-testing power',
    location: 'off-board',
    install: 'student-installed',
    summary:
      'Powers the satellite untethered on the bench: red lead → VIN, black lead → GND. In orbit, the solar board takes over this job.',
    shape: { x: 50, y: 418, w: 190, h: 56 },
    componentSlug: 'battery-holder',
    moduleSlugs: ['hardware-assembly', 'mission-control-dashboard'],
    labSlug: 'power-and-circuits',
    source: 'manual',
  },
  {
    id: 'solar',
    label: 'Solar board',
    partName: 'Mounts on the rear',
    location: 'off-board',
    install: 'student-installed',
    summary:
      'The on-orbit power source. It mounts flat against the back of the PCB, which is why every pin stub and solder joint on the rear must be trimmed flush. Launch-specific solar checks are handled by AmbaSat engineers.',
    shape: { x: 50, y: 150, w: 190, h: 64 },
    componentSlug: 'solar-board',
    moduleSlugs: ['engineering-tradeoffs', 'hardware-assembly', 'integration-and-mission-review'],
    labSlug: 'power-and-circuits',
    source: 'manual',
  },
  {
    id: 'gateway',
    label: 'LoRaWAN gateway',
    partName: 'The Things Network',
    location: 'off-board',
    install: 'external',
    summary:
      'Community gateways receive the satellite’s LoRa packets — 700 km+ line-of-sight — and forward them over the internet to the AmbaSat Dashboard.',
    shape: { x: 780, y: 240, w: 180, h: 60 },
    moduleSlugs: ['wireless-communication', 'mission-control-dashboard'],
    labSlug: 'telemetry-journey',
    source: 'manual',
  },
];

export const boardConnections: BoardConnection[] = [
  {
    id: 'clk',
    from: 'crystal',
    to: 'mcu',
    bus: 'clock',
    label: 'Clock signal',
    description: 'The crystal oscillates at 4 MHz and paces every instruction the microcontroller executes.',
    path: 'M360 161 H371 V185 H383',
    source: 'pcb-diagram',
  },
  {
    id: 'mcu-imu',
    from: 'mcu',
    to: 'imu',
    bus: 'i2c',
    label: 'I²C (motion data)',
    description: 'The microcontroller polls the IMU for gyroscope, accelerometer and magnetometer readings.',
    path: 'M466 256 V338',
    source: 'inferred',
  },
  {
    id: 'mcu-sensor-pads',
    from: 'mcu',
    to: 'sensor-header',
    bus: 'i2c',
    label: 'I²C (SDA / SCL)',
    description: 'The same two-wire bus continues to the SDA and SCL points, so the sensor daughterboard shares it with the IMU.',
    path: 'M481 192 H590 V154 M481 202 H615 V154',
    source: 'pcb-diagram',
  },
  {
    id: 'sensor-pads',
    from: 'sensor',
    to: 'sensor-header',
    bus: 'i2c',
    label: 'Soldered across SDA · SCL · GND · VCC',
    description: 'The daughterboard gets its power (VCC/GND) and its data link (SDA/SCL) from four of the top connection points.',
    path: 'M590 86 V138 M615 86 V138 M639 86 V138 M664 86 V138',
    source: 'pcb-diagram',
  },
  {
    id: 'mcu-radio',
    from: 'mcu',
    to: 'radio',
    bus: 'spi',
    label: 'SPI (commands + packets)',
    description: 'The microcontroller configures the radio and hands it telemetry packets to transmit over a fast serial bus.',
    path: 'M481 240 H498 V350 H510',
    source: 'inferred',
  },
  {
    id: 'radio-antenna',
    from: 'radio',
    to: 'antenna',
    bus: 'rf',
    label: 'RF output',
    description: 'Radio-frequency energy leaves the transceiver through the “A” pad into the wire antenna.',
    path: 'M640 468 V471 H656',
    source: 'pcb-diagram',
  },
  {
    id: 'antenna-gateway',
    from: 'antenna',
    to: 'gateway',
    bus: 'rf',
    label: 'LoRaWAN uplink',
    description: 'Telemetry travels through the air to any gateway in range, then on to the dashboard.',
    path: 'M905 462 Q 945 380 870 302',
    source: 'manual',
  },
  {
    id: 'mcu-led',
    from: 'mcu',
    to: 'led',
    bus: 'gpio',
    label: 'GPIO (LED drive)',
    description: 'A digital output pin switches the LED on and off — the AmbaSat-LED test.',
    path: 'M437 256 V292',
    source: 'inferred',
  },
  {
    id: 'pins-mcu',
    from: 'prog-header',
    to: 'mcu',
    bus: 'uart',
    label: 'Serial TX / RX + DTR reset',
    description: 'Firmware arrives over TX/RX; DTR resets the microcontroller so its bootloader can accept the upload.',
    path: 'M345 458 V405 H395 V256 M370 458 V418 H405 V256 M395 458 V430 H415 V256',
    source: 'manual',
  },
  {
    id: 'vin-ldo',
    from: 'prog-header',
    to: 'ldo',
    bus: 'power',
    label: 'VIN → regulator',
    description: 'Whatever supplies VIN (programmer or battery) feeds the regulator input.',
    path: 'M421 458 V442 H351 V395',
    source: 'pcb-diagram',
  },
  {
    id: 'ldo-rail',
    from: 'ldo',
    to: 'mcu',
    bus: 'power',
    label: '2.5 V rail',
    description: 'The regulated 2.5 V supply powers the microcontroller and the other chips on the board.',
    path: 'M332 378 H326 V225 H383',
    source: 'pcb-diagram',
  },
  {
    id: 'programmer-pins',
    from: 'programmer',
    to: 'prog-header',
    bus: 'uart',
    label: 'GND · VCC→VIN · RXD→TX · TXD→RX · DTR',
    description: 'Temporary jumper wires during development. Note the crossover: the programmer’s receive line goes to the board’s transmit pin and vice versa.',
    path: 'M345 545 V482 M370 545 V482 M395 545 V482 M421 545 V482 M471 545 V482',
    source: 'manual',
  },
  {
    id: 'battery-pins',
    from: 'battery',
    to: 'prog-header',
    bus: 'power',
    label: 'Red → VIN · Black → GND',
    description: 'Battery power for untethered ground tests, through the same VIN/GND pins.',
    path: 'M240 438 H290 V520 H425 V482 M240 456 H280 V530 H475 V482',
    source: 'manual',
  },
  {
    id: 'solar-mount',
    from: 'solar',
    to: 'pcb',
    bus: 'mechanical',
    label: 'Mounts flush on the rear',
    description: 'The solar board sits behind the PCB; its exact electrical tie-in is configured during launch preparation.',
    path: 'M240 182 H320',
    source: 'manual',
  },
];

export const getBoardPart = (id: string) => boardParts.find((p) => p.id === id);

/** The board-map part that best represents each Component Explorer entry. */
const componentPart: Record<string, string> = {
  pcb: 'pcb',
  microcontroller: 'mcu',
  imu: 'imu',
  transceiver: 'radio',
  antenna: 'antenna',
  'sensor-daughterboard': 'sensor',
  programmer: 'programmer',
  'programming-pins': 'prog-header',
  'solar-board': 'solar',
  'battery-holder': 'battery',
};

export const boardPartForComponent = (componentSlug: string) => {
  const id = componentPart[componentSlug];
  return id ? getBoardPart(id) : undefined;
};

export const connectionsFor = (partId: string) =>
  boardConnections.filter((c) => c.from === partId || c.to === partId);
