import type { Lab } from '../types';

export const labs: Lab[] = [
  {
    id: 'lab-anatomy',
    slug: 'satellite-anatomy',
    number: 'LAB 1',
    title: 'Satellite Anatomy Explorer',
    description:
      'A clickable model of the AmbaSat-1 board: hover and select the MCU, IMU, transceiver, antenna, sensor and power sections to see what each does and how they connect.',
    plannedInteractivity:
      'Interactive board diagram with selectable regions, subsystem descriptions, and links into the Component Explorer.',
    associatedModules: ['meet-the-ambasat', 'engineering-tradeoffs'],
    status: 'coming-soon',
    visualizationType: 'interactive-board-diagram',
  },
  {
    id: 'lab-power',
    slug: 'power-and-circuits',
    number: 'LAB 2',
    title: 'Power and Circuit Explorer',
    description:
      'Follow energy through the board: battery holder on the bench, solar board in sunlight, and the MCU/radio/sensor loads they feed.',
    plannedInteractivity:
      'Interactive power-tree diagram showing sources, rails and consumers, with simple load/budget toggles.',
    associatedModules: ['hardware-assembly', 'mission-control-dashboard', 'integration-and-mission-review'],
    status: 'coming-soon',
    visualizationType: 'power-distribution-diagram',
  },
  {
    id: 'lab-firmware',
    slug: 'firmware-execution',
    number: 'LAB 3',
    title: 'Firmware Execution Explorer',
    description:
      'Watch a line of C++ become a running program: source → compiler → firmware image → MCU fetch-execute loop, and what the LED blink really means.',
    plannedInteractivity:
      'Animated build-and-run pipeline with a simplified compile step and an MCU execution loop visualisation.',
    associatedModules: ['first-firmware', 'reading-sensor-data'],
    status: 'coming-soon',
    visualizationType: 'execution-pipeline-animation',
  },
  {
    id: 'lab-telemetry',
    slug: 'telemetry-journey',
    number: 'LAB 4',
    title: 'Telemetry Journey',
    description:
      'The end-to-end path of a measurement: click through every stage from firmware upload to the sensor reading landing on your dashboard.',
    plannedInteractivity:
      'Clickable pipeline (live now) — future: animated packet flow, packet inspector, failure injection (no antenna, wrong keys), and ground vs on-orbit comparison.',
    associatedModules: ['first-firmware', 'reading-sensor-data', 'wireless-communication', 'mission-control-dashboard'],
    status: 'interactive',
    visualizationType: 'pipeline-walkthrough',
  },
  {
    id: 'lab-mission-control',
    slug: 'virtual-mission-control',
    number: 'LAB 5',
    title: 'Virtual Mission Control',
    description:
      'A simulated ground-station console: mock telemetry tiles, packet log and link status, modelled on the real AmbaSat Dashboard flow.',
    plannedInteractivity:
      'Simulated dashboard driven by generated telemetry, with labelled demo data and alert-style events.',
    associatedModules: ['mission-control-dashboard'],
    status: 'coming-soon',
    visualizationType: 'telemetry-dashboard-simulation',
  },
];

export const getLab = (slug: string) => labs.find((l) => l.slug === slug);
