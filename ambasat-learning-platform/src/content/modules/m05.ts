import type { LessonContent } from '../../types';

export const m05: LessonContent = {
  moduleId: 'm05',
  why: 'Step 2 of the manual is the moment of truth for the whole toolchain: compiler, USB programmer, wiring, and the board itself, all proven by one blinking LED. If the LED blinks, everything downstream — sensors, radio, dashboard — has a working foundation.',
  coreConcepts: [
    {
      heading: 'The toolchain',
      body: 'VS Code plus the **PlatformIO** plugin is the build system (manual p.17). PlatformIO manages the compiler, board definitions and the uploader — the two controls you need are the **tick icon** (build) and the **arrow icon** (upload) at the bottom of the window.\n\nFirmware language is **C/C++**; the board is also Arduino-compatible, so existing sketches port readily.',
    },
    {
      heading: 'Wiring the programmer',
      body: 'The CH340/FTDI programmer mates to the temporary pins with a specific crossover (manual p.18):\n\n```text\nGND ↔ GND   VCC ↔ VIN   RXD ↔ TX   TXD ↔ RX   DTR ↔ DTR\n```\n\nRX↔TX crossing is the classic trap: the programmer\'s receive listens to the board\'s transmit, and vice versa.',
      callout: {
        kind: 'tip',
        title: 'Read the diagram, not just the table',
        text: 'Manual p.18 shows the full wiring diagram — the SS pin also connects per the guide. Verify every lead before powering.',
      },
    },
    {
      heading: 'The LED blink test',
      body: 'The procedure (pp. 17–18): clone the AmbaSat-1 GitHub repository, open the LED test sketch in VS Code, press the **tick** to build, then the **arrow** to upload. A working upload blinks the onboard LED — your first satellite telemetry, of a sort.',
    },
    {
      heading: 'Reading upload errors',
      body: 'Manual p.19 covers the classic failures: a wrong upload port selection, and the `stk500_recv(): programmer is not responding` family of errors — almost always a wiring, port or driver problem rather than a dead board.',
    },
  ],
  interactive: {
    title: 'Upload pipeline walkthrough',
    plannedExperience:
      'An animated version of the deploy-side of the Telemetry Journey: source → compile → upload, with the wiring crossover highlighted at the upload stage.',
    visualizationType: 'upload-pipeline',
  },
  handsOn: [
    {
      title: 'Wire the programmer correctly',
      domain: 'hardware',
      body: 'Connect programmer to board per manual p.18: G–G, VCC–VIN, RXD–TX, TXD–RX, DTR–DTR (and SS per the diagram). Double-check before powering.',
      manualReference: 'Manual p.18',
    },
    {
      title: 'Build the LED test',
      domain: 'software',
      body: 'Clone github.com/ambasat/AmbaSat-1, open the LED test sketch in VS Code + PlatformIO, and build with the tick icon.',
      manualReference: 'Manual p.17, Step 2',
    },
    {
      title: 'Upload and observe the blink',
      domain: 'hardware',
      body: 'Press the arrow icon to upload. Confirm the onboard LED blinks. If it fails, use the troubleshooting table below *and* manual p.19 before retrying.',
      manualReference: 'Manual pp. 17–19',
    },
  ],
  troubleshooting: [
    {
      symptom: 'Upload fails: "programmer is not responding" (stk500_recv)',
      possibleCauses: ['RX/TX not crossed correctly', 'Wrong USB port selected', 'CH340/FTDI driver missing'],
      suggestions: [
        'Re-check the crossover wiring from p.18',
        'Try the other listed serial port in PlatformIO',
        'Install/reinstall the CH340 or FTDI driver for your OS (manual p.19)',
      ],
    },
    {
      symptom: 'Build succeeds but nothing uploads — no port appears',
      possibleCauses: ['USB cable is charge-only', 'Loose unsoldered pins'],
      suggestions: [
        'Swap to a known data-capable USB cable',
        'Press the temporary pins firmly in their holes during upload, or solder them',
      ],
    },
    {
      symptom: 'LED does not blink after "successful" upload',
      possibleCauses: ['Upload actually failed silently', 'Wrong sketch/board target'],
      suggestions: [
        'Watch the upload log for write/verify errors',
        'Confirm the project targets the AmbaSat-1 board definition',
      ],
    },
  ],
  nextModuleNote: 'The board runs your code. Module 06 makes it sense: mounting is done, now read real values from your sensor over the serial terminal.',
};
