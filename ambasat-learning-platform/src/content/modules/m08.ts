import type { LessonContent } from '../../types';

export const m08: LessonContent = {
  moduleId: 'm08',
  why: 'Raw LoRaWAN frames are bytes; a mission is information. This module is the last hop of the Telemetry Journey — gateway → network routing → dashboard — and the skills to verify that what the satellite sent is what you see.',
  coreConcepts: [
    {
      heading: 'The AmbaSat Dashboard',
      body: 'The AmbaSat Dashboard is the ready-made endpoint: once your keys identify the device, uplinked packets appear decoded there (manual pp. 29–32). For the MK-II educational flow this is the default mission-control screen — no server required.',
    },
    {
      heading: 'The Things Network console',
      body: 'Between radio and dashboard sits TTN: gateways receive your frames and the network routes them by DEVADDR. The TTN console lets you watch **live traffic per device** — the ground truth when debugging "did the satellite even transmit?"',
      callout: {
        kind: 'info',
        title: 'Ground vs orbit view',
        text: 'On the bench you can watch both ends simultaneously: serial monitor AND dashboard. On orbit you only have the dashboard — which is why bench-side packet literacy matters now.',
      },
    },
    {
      heading: 'Payload decoding',
      body: 'The packet is a compact byte payload: sensor bytes packed for bandwidth, then unpacked for display. Read the flight code\'s packing logic in `main.cpp` alongside the dashboard\'s decoded values — matching one known reading end-to-end is the single most instructive exercise in this module.',
    },
  ],
  interactive: {
    title: 'Payload decoder',
    plannedExperience:
      'An interactive byte-payload explorer: paste/inspect a packet, see each byte field mapped to its sensor value, and predict what a changed field does to the dashboard display.',
    visualizationType: 'payload-decoder',
  },
  handsOn: [
    {
      title: 'Confirm packets on the dashboard',
      domain: 'software',
      body: 'With the flight code running, open your AmbaSat Dashboard device view and confirm decoded readings arrive (manual pp. 29–32).',
      manualReference: 'Manual pp. 29–32',
    },
    {
      title: 'Cross-check one packet',
      domain: 'software',
      body: 'In the TTN console, find one uplink raw payload and manually match its bytes to the dashboard\'s decoded values, using the flight code\'s packing order as the key.',
    },
    {
      title: 'Baseline logging session',
      domain: 'hardware',
      body: 'Let the satellite transmit for 30–60 minutes on battery or USB. Note packet rate, any gaps, and the value ranges — this is your operations baseline for Module 09.',
    },
  ],
  troubleshooting: [
    {
      symptom: 'Frames reach TTN but dashboard shows nothing',
      possibleCauses: ['Dashboard device not linked to keys', 'Decoder mismatch'],
      suggestions: [
        'Re-verify DEVADDR/NWKSKEY/APPSKEY on the dashboard entry',
        'Check the dashboard\'s expected payload format against the flight code',
      ],
    },
    {
      symptom: 'Decoded values look wrong (e.g. absurd temperature)',
      possibleCauses: ['Byte order or scaling wrong in decoder', 'Sensor fault'],
      suggestions: [
        'Compare against the serial monitor reading from Module 06 — same stimulus, both ends',
        'Check the packing order in main.cpp byte-by-byte',
      ],
    },
  ],
  nextModuleNote: 'End-to-end works. Module 09 turns the whole build into a reviewable mission: integration checklist, review, and what launch prep actually involves.',
};
