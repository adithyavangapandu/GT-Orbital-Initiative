import type { TelemetryStage } from '../types';

/**
 * End-to-end telemetry chain for the MK-II kit's ground-testing path, adapted
 * from the manual: firmware deployment happens over the CH340 programmer;
 * runtime telemetry flows sensor → MCU → LoRaWAN transceiver → TTN gateway →
 * AmbaSat Dashboard. The on-orbit path reuses the same radio path (LoRaWAN →
 * TTN) but is powered by the solar board instead of the battery holder.
 */
export const telemetryStages: TelemetryStage[] = [
  {
    id: 'source-code',
    phase: 'deploy',
    domain: 'software',
    title: 'Source Code',
    summary: 'C/C++ firmware — example workspaces or your own edits.',
    detail:
      'AmbaSat-1 firmware is written in C/C++ inside Visual Studio Code. You start from the open-source workspaces in the AmbaSat-1 GitHub repository (examples like AmbaSat-LED, sensor workspaces, and the Flight Code) and modify or extend them.',
    inputs: 'Your mission requirements',
    outputs: 'main.cpp and project files',
    hardware: '—',
    software: 'VS Code + PlatformIO, github.com/ambasat/AmbaSat-1',
    moduleSlug: 'first-firmware',
    manualReference: 'Manual pp.11, 17',
  },
  {
    id: 'compile',
    phase: 'deploy',
    domain: 'software',
    title: 'Compile & Build',
    summary: 'PlatformIO compiles the workspace into a firmware image.',
    detail:
      'Clicking the tick button builds the workspace: PlatformIO resolves the framework/libraries, compiles your C/C++ and links a binary the MCU can execute. A green "SUCCESS" means the image is ready.',
    inputs: 'Source files',
    outputs: 'Compiled firmware binary',
    hardware: '—',
    software: 'PlatformIO build system in VS Code',
    moduleSlug: 'first-firmware',
    manualReference: 'Manual p.17',
  },
  {
    id: 'upload',
    phase: 'deploy',
    domain: 'both',
    title: 'Upload via Programmer',
    summary: 'The CH340/FTDI programmer copies firmware over USB to the board.',
    detail:
      'The arrow button uploads the build through the CH340/FTDI programmer, across the six programming pins (GND, SS, VIN, RX, TX, DTR) into the MCU’s flash. This stage also powers the board during development.',
    inputs: 'Firmware binary',
    outputs: 'Firmware flashed onto the MCU',
    hardware: 'CH340/FTDI programmer, programming pin header, USB',
    software: 'PlatformIO upload (avrdude under the hood)',
    moduleSlug: 'first-firmware',
    manualReference: 'Manual pp.15, 17–18',
  },
  {
    id: 'execute',
    phase: 'runtime',
    domain: 'both',
    title: 'MCU Executes Firmware',
    summary: 'On power-up the microcontroller runs your program loop.',
    detail:
      'With firmware flashed and power applied (programmer during development, battery holder for untethered testing), the MCU starts executing: initialising peripherals, then looping over its sensor → package → transmit cycle.',
    inputs: 'Power + flashed firmware',
    outputs: 'Running control loop',
    hardware: 'Microcontroller Unit on the AmbaSat-1 PCB',
    software: 'Your compiled flight firmware',
    moduleSlug: 'first-firmware',
    manualReference: 'Manual pp.4, 18',
  },
  {
    id: 'request',
    phase: 'runtime',
    domain: 'both',
    title: 'MCU Requests Reading',
    summary: 'Firmware polls the sensor daughterboard for a measurement.',
    detail:
      'The MCU issues a read to the mounted sensor (e.g. gas & pressure, humidity+temperature, UV…). This is the firmware → hardware interface soldered together in Module 04.',
    inputs: 'Sensor poll command',
    outputs: 'Request on the sensor interface',
    hardware: 'MCU + sensor daughterboard connection points',
    software: 'Sensor driver code in the workspace',
    moduleSlug: 'reading-sensor-data',
    manualReference: 'Manual pp.20, 26',
  },
  {
    id: 'sense',
    phase: 'runtime',
    domain: 'hardware',
    title: 'Sensor Returns Measurement',
    summary: 'The sensor responds with real environmental data.',
    detail:
      'The daughterboard converts a physical quantity into a value and returns it to the MCU — exactly what you saw scrolling in the serial terminal during the Step Five sensor test.',
    inputs: 'Poll from the MCU',
    outputs: 'Raw measurement (e.g. temperature, gas reading)',
    hardware: 'Sensor daughterboard (one of the eight options)',
    software: '—',
    moduleSlug: 'reading-sensor-data',
    manualReference: 'Manual pp.26–28',
  },
  {
    id: 'package',
    phase: 'runtime',
    domain: 'software',
    title: 'Firmware Packages Telemetry',
    summary: 'Readings are formatted into a LoRaWAN packet for your device.',
    detail:
      'The flight code formats the sensor data into an uplink payload. Your NWKSKEY, APPSKEY and DEVADDR — entered into main.cpp from the AmbaSat Dashboard settings — make sure the packet is identified as your device’s.',
    inputs: 'Sensor measurement + device keys',
    outputs: 'Formatted LoRaWAN uplink packet',
    hardware: 'MCU',
    software: 'Flight code (main.cpp) with your session keys',
    moduleSlug: 'wireless-communication',
    manualReference: 'Manual pp.29–31',
  },
  {
    id: 'transmit',
    phase: 'runtime',
    domain: 'both',
    title: 'Transceiver Transmits',
    summary: 'The LoRaWAN chip radiates the packet through the wire antenna.',
    detail:
      'The pre-soldered transceiver modulates the packet onto your region’s LoRaWAN band. Antenna length is matched to that band (86.8 mm @ 868 MHz EU, 91.5 mm @ 915 MHz US) — which is why Module 04 insists the antenna goes on first.',
    inputs: 'LoRaWAN packet',
    outputs: 'Sub-GHz radio transmission',
    hardware: 'LoRaWAN transceiver + trimmed wire antenna',
    software: 'Regional frequency-plan settings',
    moduleSlug: 'wireless-communication',
    manualReference: 'Manual pp.12, 29',
  },
  {
    id: 'gateway',
    phase: 'runtime',
    domain: 'hardware',
    title: 'Gateway Receives',
    summary: 'A nearby TTN gateway hears the packet over the air.',
    detail:
      'Any of The Things Network’s 16,000+ community gateways in range receives the sub-GHz transmission — no specialist radio gear needed on your end.',
    inputs: 'Radio transmission (line-of-sight helps)',
    outputs: 'Packet delivered to the TTN network',
    hardware: 'TTN community gateway',
    software: 'The Things Network',
    moduleSlug: 'wireless-communication',
    manualReference: 'Manual p.29',
  },
  {
    id: 'route',
    phase: 'runtime',
    domain: 'software',
    title: 'Network Routes Data',
    summary: 'TTN forwards the packet to the application owning your device.',
    detail:
      'The Things Network matches your DEVADDR and session keys to the pre-registered AmbaSat application and routes the decrypted payload onward.',
    inputs: 'Packet at the gateway',
    outputs: 'Payload routed to the AmbaSat application',
    hardware: '—',
    software: 'TTN network server + AmbaSat application',
    moduleSlug: 'wireless-communication',
    manualReference: 'Manual pp.29–30',
  },
  {
    id: 'dashboard',
    phase: 'runtime',
    domain: 'software',
    title: 'Dashboard Displays Data',
    summary: 'Your AmbaSat Dashboard shows the measurement — mission data!',
    detail:
      'Log in to your AmbaSat Dashboard from any browser and watch your satellite’s readings arrive — your personal ground station, completing the sensor-to-screen journey.',
    inputs: 'Routed telemetry payload',
    outputs: 'Live charts/readings for your device',
    hardware: '—',
    software: 'AmbaSat Dashboard (web)',
    moduleSlug: 'mission-control-dashboard',
    manualReference: 'Manual pp.6, 32',
  },
];

export const telemetryModes = [
  {
    id: 'ground' as const,
    label: 'Ground testing',
    power: 'Battery holder (red → VIN, black → GND)',
    radio: 'LoRaWAN on your regional frequency plan → TTN gateway → AmbaSat Dashboard',
    note: 'This is the path the manual walks through: programmer for firmware, battery pack for untethered runs, TTN for the radio link.',
  },
  {
    id: 'orbit' as const,
    label: 'On-orbit (after deployment)',
    power: 'Solar board & cells on the rear of the PCB',
    radio: 'Same LoRaWAN uplink — satellites are configured for the European frequency plan by AmbaSat engineers per UKSA requirements, and received by TTN gateways from ~310 km',
    note: 'The manual states the proven transceiver range is 700 km+ line-of-sight — comfortably covering the ~310 km LEO. Educational kit ≠ flight-qualified hardware: launch configuration is performed by AmbaSat engineers.',
  },
];
