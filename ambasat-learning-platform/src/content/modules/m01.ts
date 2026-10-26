import type { LessonContent } from '../../types';

export const m01: LessonContent = {
  moduleId: 'm01',
  why: 'You cannot solder, debug or operate hardware you cannot name. This module builds the mental map of the board — which chip computes, which senses motion, which talks to Earth — so that later instructions ("the pad near the transceiver") mean something on first reading.',
  coreConcepts: [
    {
      heading: 'The three headline components',
      body: 'The manual names three main components on the AmbaSat-1 PCB (p.4):\n\n- **Microcontroller Unit (MCU)** — the brain; runs every line of firmware you upload.\n- **Tri-axis SMD** — gyroscope + accelerometer + magnetometer; determines trajectory and can drive power-saving behaviour.\n- **LoRaWAN transceiver** — the radio; speaks to The Things Network\'s 16,000+ community gateways, no specialist receiver gear needed.',
      diagramPlaceholder: 'Annotated AmbaSat-1 PCB top view: MCU, IMU, transceiver, LED, antenna pad, sensor pads, programming pin pads',
    },
    {
      heading: 'What is in the box',
      body: 'The MK-II kit contains (manual p.5):\n\n1. **AmbaSat-1 PCB** — with delicate parts pre-soldered\n2. **CH340/FTDI programmer** — USB bridge for code + power during development\n3. **Your chosen sensor** — on a ready-to-mount daughterboard\n4. **Solar board & cells** — partially assembled\n5. **Battery holder** — for earth-bound testing\n6. **Sticker** — "is Sticky!"\n7. **Reading materials** — dashboard access info\n8. **Launch certificate**\n9. **Bag of components** — pins, antenna wire, etc.\n\nThe MK-II is the accessible revision: delicate SMD parts arrive pre-soldered, cutting assembly time by hours versus the MK-I "Engineering Kit".',
    },
    {
      heading: 'One board, three jobs',
      body: 'The PCB is simultaneously the satellite\'s structure, its wiring and its thermal/mechanical home for every IC. That triple role is why seemingly small choices — where solder lands, how flush the rear is — matter later when the solar board mounts and the whole thing must fit a 3U container.',
    },
  ],
  interactive: {
    title: 'Board anatomy explorer',
    plannedExperience:
      'A clickable top-view diagram of the AmbaSat-1 PCB: select the MCU, IMU, transceiver, LED, antenna pad, sensor pads and programming-pin pads to open their component pages.',
    visualizationType: 'board-map',
  },
  handsOn: [
    {
      title: 'Unbox and inventory',
      domain: 'hardware',
      body: 'Lay out the box contents and match each item to the manual\'s list on p.5. Keep the anti-static packaging — the manual recommends it for transporting your satellite later.',
    },
    {
      title: 'Locate the big three',
      domain: 'hardware',
      body: 'On the motherboard, find the MCU, the tri-axis IMU and the LoRaWAN transceiver. Also find the onboard LED — it becomes your first test signal.',
    },
    {
      title: 'Find the programming-pin pads',
      domain: 'hardware',
      body: 'Locate the six labelled pads (GND, SS, VIN, RX, TX, DTR) — this is where the temporary pins go in Module 04, and where the programmer and battery pack connect.',
      manualReference: 'Manual p.15',
    },
  ],
  troubleshooting: [
    {
      symptom: 'Cannot tell the chips apart',
      possibleCauses: ['SMD parts look near-identical at this scale'],
      suggestions: [
        'Compare against the manual\'s board images and component pages',
        'Ask a mentor — misidentifying parts now causes wrong soldering later',
      ],
    },
  ],
  nextModuleNote: 'Now that you can name the parts, Module 02 asks the better question: why were they chosen this way?',
};
