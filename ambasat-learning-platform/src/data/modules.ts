import type { Module } from '../types';

/**
 * The ten-module beginner curriculum. Ordering follows the actual MK-II kit
 * workflow in the AmbaSat-1 How To Guide: orientation → hardware → firmware →
 * sensor → LoRaWAN uplink → dashboard → review.
 */
export const modules: Module[] = [
  {
    id: 'm00',
    slug: 'your-mission-begins',
    number: '00',
    title: 'Your Mission Begins',
    summary:
      'Meet the AmbaSat-1 program, understand what your sprite-class satellite can do, and set your mission objectives for the course.',
    objectives: [
      'Describe what the AmbaSat-1 is and who it is built for',
      'Distinguish the educational kit from flight-qualified hardware',
      'Map the course modules onto the satellite build workflow',
    ],
    prerequisites: [],
    estimatedDuration: '30 min',
    relatedComponents: [],
    checkpointIds: { knowledge: 'kc-m00', practical: 'pc-m00' },
    manualReferences: [
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 3,
        section: 'Introduction: What is AmbaSat-1?',
        description: 'Sprite-class ("chipsat") positioning, open-source C/C++ example code, Arduino compatibility.',
        verificationStatus: 'verified',
      },
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 4,
        description: 'Deployment of ~200 sprites from a 3U launch container into a ~310 km LEO.',
        verificationStatus: 'verified',
      },
    ],
    status: 'available',
    milestone: 'Mission objective defined',
  },
  {
    id: 'm01',
    slug: 'meet-the-ambasat',
    number: '01',
    title: 'Meet the AmbaSat',
    summary:
      'Take a tour of the satellite: the PCB motherboard, microcontroller, motion sensors, LoRaWAN transceiver, and everything that ships in the MK-II box.',
    objectives: [
      'Name the three main components the manual highlights on the AmbaSat-1 PCB',
      'List the contents of the MK-II kit and the job of each item',
      'Identify which components arrive pre-soldered on the MK-II board',
    ],
    prerequisites: ['Module 00 — Your Mission Begins'],
    estimatedDuration: '45 min',
    relatedComponents: ['pcb', 'microcontroller', 'imu', 'transceiver', 'antenna', 'sensor-daughterboard'],
    checkpointIds: { knowledge: 'kc-m01', practical: 'pc-m01' },
    manualReferences: [
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 4,
        section: 'AmbaSat-1 Main Components',
        description: 'MCU, tri-axis gyro/accelerometer/magnetometer, and LoRaWAN transceiver.',
        verificationStatus: 'verified',
      },
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 5,
        section: "What's in the Box",
        description: 'MK-II kit contents: PCB, CH340 programmer, sensor daughterboard, solar board, battery holder.',
        verificationStatus: 'verified',
      },
    ],
    status: 'available',
    milestone: 'Hardware understood',
  },
  {
    id: 'm02',
    slug: 'engineering-tradeoffs',
    number: '02',
    title: 'Engineering Tradeoffs',
    summary:
      'Why is AmbaSat-1 shaped the way it is? Explore the design choices behind a 35 mm² sprite, the MK-II pre-soldered board, and LoRaWAN communications.',
    objectives: [
      'Explain the trade-offs between a Sprite/chipsat and a CubeSat-class build',
      'Reason about why the MK-II ships with delicate parts pre-soldered',
      'Connect form-factor constraints (3U container, ~200 sats) to real assembly decisions',
    ],
    prerequisites: ['Module 01 — Meet the AmbaSat'],
    estimatedDuration: '45 min',
    relatedComponents: ['pcb', 'sensor-daughterboard', 'solar-board', 'antenna'],
    checkpointIds: { knowledge: 'kc-m02', practical: 'pc-m02' },
    manualReferences: [
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 5,
        description: 'MK-II has delicate components pre-soldered to the PCB, cutting assembly time vs the MK-I "Engineering Kit".',
        verificationStatus: 'verified',
      },
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 20,
        section: 'Step Four — Mount your Sensor',
        description: '"Every millimetre counts" — flush rear soldering so the solar board mounts without gaps inside the 3U container.',
        verificationStatus: 'verified',
      },
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 4,
        description: '~200 sprites per 3U launch container; 310 km LEO chosen for atmospheric data and academic time scales.',
        verificationStatus: 'verified',
      },
    ],
    status: 'available',
    milestone: 'Design rationale understood',
  },
  {
    id: 'm03',
    slug: 'prepare-your-workstation',
    number: '03',
    title: 'Prepare Your Workstation',
    summary:
      'Set up tools, materials, software, and safety practices before touching the hardware: soldering station, anti-static habits, VS Code + PlatformIO, and the AmbaSat source code.',
    objectives: [
      'Assemble the essential and recommended tools from the manual checklist',
      'Apply the manual’s safety precautions: static, ventilation, hot tools, cables',
      'Install Visual Studio Code, the PlatformIO extension, and download the AmbaSat-1 source code',
    ],
    prerequisites: ['Module 01 — Meet the AmbaSat'],
    estimatedDuration: '60 min',
    relatedComponents: ['programmer'],
    checkpointIds: { knowledge: 'kc-m03', practical: 'pc-m03' },
    manualReferences: [
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 7,
        section: "What You Will Need",
        description: 'Essential tools: soldering iron/station, solder, tweezers, snips, computer; VS Code + PlatformIO software.',
        verificationStatus: 'verified',
      },
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 9,
        section: 'Health & Safety Precautions',
        description: 'Static discharge, ventilation for solder fumes, hot irons, and cable safety.',
        verificationStatus: 'verified',
      },
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 11,
        description: 'VS Code + PlatformIO extension; source code from github.com/ambasat/AmbaSat-1.',
        verificationStatus: 'verified',
      },
    ],
    status: 'available',
    milestone: 'Workstation ready',
  },
  {
    id: 'm04',
    slug: 'hardware-assembly',
    number: '04',
    title: 'Hardware Assembly',
    summary:
      'Build the satellite: fit and trim the antenna, tack the six programming pins, run the PCB-LED test, and mount your sensor daughterboard with a flush rear finish.',
    objectives: [
      'Attach and trim the antenna to your regional LoRaWAN frequency before any power test',
      'Solder the six temporary programming pins (GND, SS, VIN, RX, TX, DTR)',
      'Mount the sensor board flush so the solar board can sit flat later',
    ],
    prerequisites: ['Module 03 — Prepare Your Workstation'],
    estimatedDuration: '2–3 h',
    relatedComponents: ['antenna', 'pcb', 'programming-pins', 'sensor-daughterboard'],
    checkpointIds: { knowledge: 'kc-m04', practical: 'pc-m04' },
    manualReferences: [
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 12,
        section: 'Step One — Slap a Tail on it',
        description: 'Antenna must be attached before powering; trim to regional base frequency (86.8 mm @ 868 MHz EU, 91.5 mm @ 915 MHz US).',
        verificationStatus: 'verified',
      },
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 15,
        section: 'Step Two — Programming Pins',
        description: 'Six temporary pins: GND, SS, VIN, RX, TX, DTR; light soldering, removed before launch.',
        verificationStatus: 'verified',
      },
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 20,
        section: 'Step Four — Mount your Sensor',
        description: 'Double-sided tape + four pins; flush solder on the rear where the solar board mounts.',
        verificationStatus: 'verified',
      },
    ],
    status: 'available',
    milestone: 'Hardware assembled',
  },
  {
    id: 'm05',
    slug: 'first-firmware',
    number: '05',
    title: 'First Firmware',
    summary:
      'Turn source code into a running program: open the AmbaSat-LED workspace in VS Code + PlatformIO, build it, wire the CH340 programmer, and upload until the onboard LED blinks.',
    objectives: [
      'Open a PlatformIO workspace from the downloaded AmbaSat-1 source',
      'Compile ("build") an example and read a SUCCESS result',
      'Wire the CH340/FTDI programmer to the board and upload firmware',
      'Recognize the common upload errors and their fixes',
    ],
    prerequisites: ['Module 03 — Prepare Your Workstation', 'Module 04 — Hardware Assembly (pins fitted)'],
    estimatedDuration: '60–90 min',
    relatedComponents: ['programmer', 'microcontroller', 'programming-pins'],
    checkpointIds: { knowledge: 'kc-m05', practical: 'pc-m05' },
    manualReferences: [
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 17,
        section: 'Step Three — LED test',
        description: 'AmbaSat-LED workspace, build (tick) and upload (arrow) in VS Code; programmer wiring G–G, VCC–VIN, RXD–TX, TXD–RX, DTR–DTR.',
        verificationStatus: 'verified',
      },
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 19,
        section: 'Errors & Fault Finding',
        description: '"Please specify upload port" and avrdude stk500_recv() causes and remedies.',
        verificationStatus: 'verified',
      },
    ],
    status: 'available',
    milestone: 'Firmware running',
  },
  {
    id: 'm06',
    slug: 'reading-sensor-data',
    number: '06',
    title: 'Reading Sensor Data',
    summary:
      'Choose and mount one of the eight AmbaSat sensors, flash its example workspace, and watch live measurements in the serial terminal.',
    objectives: [
      'Compare the eight sensor options and pick one for your mission',
      'Flash the sensor-specific example workspace to the board',
      'Read live sensor output in the PlatformIO serial terminal',
    ],
    prerequisites: ['Module 04 — Hardware Assembly (sensor mounted)', 'Module 05 — First Firmware'],
    estimatedDuration: '60–90 min',
    relatedComponents: ['sensor-daughterboard', 'microcontroller', 'programmer'],
    checkpointIds: { knowledge: 'kc-m06', practical: 'pc-m06' },
    manualReferences: [
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 3,
        description: 'The eight sensor options: humidity+temp, temp, gas & pressure, ambient light, TVOC, UV, CO₂, GPS (earthbound only).',
        verificationStatus: 'verified',
      },
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 26,
        section: 'Step Five — Is My Sensor Sensing?',
        description: 'Sensor example workspace → build → upload → view measurements in the terminal (plug icon).',
        verificationStatus: 'verified',
      },
    ],
    status: 'available',
    milestone: 'Sensor measurements collected',
  },
  {
    id: 'm07',
    slug: 'wireless-communication',
    number: '07',
    title: 'Wireless Communication',
    summary:
      'Send data without wires: how LoRaWAN and The Things Network carry packets from your transceiver to the internet, and how to enter your device keys into the flight code.',
    objectives: [
      'Explain what LoRaWAN is and why it suits a 310 km orbit',
      'Describe The Things Network’s community gateway model',
      'Locate NWKSKEY, APPSKEY and DEVADDR and place them in the flight code',
    ],
    prerequisites: ['Module 05 — First Firmware'],
    estimatedDuration: '60 min',
    relatedComponents: ['transceiver', 'antenna', 'microcontroller'],
    checkpointIds: { knowledge: 'kc-m07', practical: 'pc-m07' },
    manualReferences: [
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 29,
        section: 'Step Six — That’s LoRaWAN!',
        description: 'LoRaWAN sub-GHz radio, 700 km+ proven range line-of-sight; TTN with 16,600+ gateways.',
        verificationStatus: 'verified',
      },
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 29,
        description: 'Devices are pre-registered on TTN by AmbaSat; keys delivered via the AmbaSat dashboard account.',
        verificationStatus: 'verified',
      },
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 31,
        description: 'Entering keys into main.cpp flight code as 0x-prefixed byte arrays.',
        verificationStatus: 'verified',
      },
    ],
    status: 'available',
    milestone: 'Telemetry link configured',
  },
  {
    id: 'm08',
    slug: 'mission-control-dashboard',
    number: '08',
    title: 'Mission Control Dashboard',
    summary:
      'Power the satellite from the battery holder, disconnect the programmer, and watch packets land in your AmbaSat Dashboard — your personal ground station.',
    objectives: [
      'Trace the end-to-end path from sensor measurement to dashboard tile',
      'Power the board for untethered testing (battery holder: red → VIN, black → GND)',
      'Verify received telemetry inside the AmbaSat Dashboard account',
    ],
    prerequisites: ['Module 06 — Reading Sensor Data', 'Module 07 — Wireless Communication'],
    estimatedDuration: '45–60 min',
    relatedComponents: ['transceiver', 'battery-holder', 'sensor-daughterboard'],
    checkpointIds: { knowledge: 'kc-m08', practical: 'pc-m08' },
    manualReferences: [
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 6,
        description: 'Dashboard access materials ship with the kit; viewable from any browser.',
        verificationStatus: 'verified',
      },
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 32,
        description: 'Disconnect programmer, connect battery pack (red→VIN, black→GND), view data in the AmbaSat Dashboard.',
        verificationStatus: 'verified',
      },
    ],
    status: 'available',
    milestone: 'Dashboard operational',
  },
  {
    id: 'm09',
    slug: 'integration-and-mission-review',
    number: '09',
    title: 'Integration and Mission Review',
    summary:
      'Review the whole build, work through a fault-finding pass, prepare the board for launch-readiness (pin removal, solar board return), and demonstrate your completed mission.',
    objectives: [
      'Run a structured end-to-end review of hardware, firmware, and telemetry',
      'Apply the manual’s fault-finding guidance to residual problems',
      'Understand which steps happen at AmbaSat HQ before a real launch (pin removal, solar board checks, EU frequency configuration)',
    ],
    prerequisites: ['Module 04 — Hardware Assembly', 'Module 08 — Mission Control Dashboard'],
    estimatedDuration: '60 min',
    relatedComponents: ['pcb', 'solar-board', 'programming-pins', 'battery-holder'],
    checkpointIds: { knowledge: 'kc-m09', practical: 'pc-m09' },
    manualReferences: [
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 14,
        description: 'Launch-program satellites are set to the European frequency plan by AmbaSat engineers per UKSA requirements; antenna may be replaced.',
        verificationStatus: 'verified',
      },
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 15,
        description: 'Programming pins are temporary and removed before launch / before the solar board is attached.',
        verificationStatus: 'verified',
      },
      {
        sourceDocument: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        page: 6,
        description: 'AmbaSat recommends returning the solar board for final checks and assembly prior to launch.',
        verificationStatus: 'verified',
      },
    ],
    status: 'available',
    milestone: 'Final project demonstrated',
  },
];

export const getModule = (slug: string) => modules.find((m) => m.slug === slug);
export const getModuleById = (id: string) => modules.find((m) => m.id === id);
export const nextModule = (slug: string) => modules[modules.findIndex((m) => m.slug === slug) + 1];
export const prevModule = (slug: string) => modules[modules.findIndex((m) => m.slug === slug) - 1];
