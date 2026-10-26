import type { LessonContent } from '../../types';

export const m07: LessonContent = {
  moduleId: 'm07',
  why: 'Step 6 is where the satellite earns the word: your sensor data leaves the board by radio, crosses to a community gateway, and lands on a dashboard you did not have to build. LoRaWAN + The Things Network is the entire communications architecture — understanding it is understanding how AmbaSat talks.',
  coreConcepts: [
    {
      heading: 'LoRaWAN and The Things Network',
      body: 'The transceiver speaks **LoRaWAN**, a long-range, low-power protocol — proven over **700 km** line-of-sight against a ~310 km orbit. Instead of a private ground station, packets reach **The Things Network**: 16,600+ community gateways that forward your satellite\'s frames to the internet (manual pp. 3–4).',
    },
    {
      heading: 'The three keys',
      body: 'Security and routing are anchored by three values generated for *your* board on the AmbaSat Dashboard (manual p.29):\n\n- **NWKSKEY** — network session key\n- **APPSKEY** — application session key\n- **DEVADDR** — device address\n\nThey are entered into the flight code\'s `main.cpp` as byte arrays — the manual\'s convention: *`0x` followed by the hex pairs* (pp. 29–30).',
      callout: {
        kind: 'warning',
        title: 'Protect your keys',
        text: 'These keys identify your satellite on the network. Do not commit them to public repositories or paste them into shared docs.',
      },
    },
    {
      heading: 'Flight code and uplink',
      body: 'The flight-code project (from the AmbaSat-1 repository) reads the sensor, packages the bytes, and transmits on the LoRaWAN uplink — the manual\'s worked example transmits every ~30 seconds in test configuration. After keys are in, build and upload exactly as the LED test did.',
    },
    {
      heading: 'Power for the test',
      body: 'For ground running you can stay on the programmer\'s USB power or switch to the battery pack: **red wire → VIN, black → GND** on the programming pins (manual p.31). Solar board + cells are the on-orbit configuration.',
    },
  ],
  interactive: {
    title: 'Telemetry Journey',
    plannedExperience:
      'Live now — the full interactive pipeline is in the Engineering Lab.',
    visualizationType: 'telemetry-pipeline',
  },
  handsOn: [
    {
      title: 'Register on the AmbaSat Dashboard',
      body: 'Create your satellite\'s entry on the AmbaSat Dashboard (access info is on the kit\'s reading materials, manual p.5) and copy out NWKSKEY, APPSKEY and DEVADDR.',
      manualReference: 'Manual p.29',
    },
    {
      title: 'Enter the keys in main.cpp',
      body: 'Open the flight-code project, find `main.cpp`, and insert the three keys as 0x-prefixed byte arrays exactly as the manual shows (pp. 29–30). Double-check byte order.',
      manualReference: 'Manual pp. 29–30',
    },
    {
      title: 'Build, upload, connect power',
      body: 'Build and upload the flight code. Then either keep the programmer attached or wire the battery pack: red → VIN, black → GND (p.31).',
      manualReference: 'Manual p.31, Step 6',
    },
    {
      title: 'Walk the Telemetry Journey',
      body: 'Open the [Telemetry Journey lab](/lab/telemetry-journey) and click through all 11 stages. For each, say aloud which piece of *your* hardware or code it represents.',
    },
  ],
  troubleshooting: [
    {
      symptom: 'No packets appear on the dashboard',
      possibleCauses: ['Keys mistyped or wrong byte order', 'No TTN gateway in range', 'Wrong regional frequency'],
      suggestions: [
        'Re-enter keys carefully — the manual stresses 0x-prefixed pairs in order',
        'Check ttnmapper.org or the TTN console for nearby gateway coverage',
        'Confirm your antenna length matches your region\'s band (Module 04)',
      ],
    },
    {
      symptom: 'Upload of flight code fails',
      possibleCauses: ['Same toolchain issues as Module 05'],
      suggestions: [
        'Return to the Module 05 troubleshooting table — nothing about upload changed',
      ],
    },
  ],
  nextModuleNote: 'Packets are flying — Module 08 reads them: dashboard, payload decoding, and your own TTN application.',
};
