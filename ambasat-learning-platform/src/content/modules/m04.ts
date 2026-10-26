import type { LessonContent } from '../../types';

export const m04: LessonContent = {
  moduleId: 'm04',
  why: 'This is the module where your satellite becomes physical. Three manual steps converge here: the antenna (Step 1), the temporary programming pins, and the sensor daughterboard (Step 4). Order matters — antenna first, and the sensor goes on the **rear** face so the solar board can later cover the front.',
  coreConcepts: [
    {
      heading: 'Step 1 — the antenna comes first',
      body: 'Assembly starts with the antenna because the satellite is useless without it: it is the only path by which your data reaches Earth. Cut and strip the supplied wire to the length for your region\'s base frequency (manual pp. 12–14):\n\n- **86.8 mm** — 868 MHz (Europe)\n- **91.5 mm** — 915 MHz (USA)\n- Other regional plans per the manual table\n\nThe bare wire then solders to the gold antenna pad — use the *minimum* solder that bonds it; excess solder ruins the joint.',
      callout: {
        kind: 'warning',
        title: 'Trim before you solder',
        text: 'Do not solder an untrimmed wire. Wrong length = wrong effective frequency.',
      },
      diagramPlaceholder: 'Antenna wire: strip → cut to regional length → solder to gold pad (manual pp.12–14)',
    },
    {
      heading: 'Temporary programming pins',
      body: 'Six pins — **GND, SS, VIN, RX, TX, DTR** — fit through the labelled holes on the board\'s edge (manual pp. 15–16). Their job is temporary: they carry the programmer (and later the battery pack) during development. In orbit configuration, AmbaSat engineers **remove them** and wire the solar board directly to the pads.\n\nThey slide easily for prototyping; solder them only if you want them fixed.',
    },
    {
      heading: 'Sensor mounting: rear face, flush fit',
      body: 'The daughterboard mounts on the **rear** of the motherboard at the position shown in the manual (pp. 20–25) — placed so the solar board can later span the front. Solder the castellated edge connectors; a **flush** fit matters because the solar board must sit cleanly over it. Then join the required pads as the sensor\'s manual section directs.',
    },
  ],
  interactive: {
    title: 'Assembly sequence explorer',
    plannedExperience:
      'Step through antenna → pins → sensor on a 3D-ish board view, with correct/incorrect positioning feedback at each step.',
    visualizationType: 'assembly-sequence',
  },
  handsOn: [
    {
      title: 'Cut the antenna to spec',
      body: 'Strip the antenna wire and cut to your region\'s length (EU: 86.8 mm / 868 MHz, US: 91.5 mm / 915 MHz, others per manual pp. 12–14). Solder to the gold pad with minimal solder.',
      manualReference: 'Manual pp. 12–14, Step 1',
    },
    {
      title: 'Fit the six programming pins',
      body: 'Push the six pins into the labelled holes (GND, SS, VIN, RX, TX, DTR). Leave unsoldered for prototyping or solder lightly to secure — remember they are temporary.',
      manualReference: 'Manual pp. 15–16',
    },
    {
      title: 'Mount the sensor daughterboard',
      body: 'Position the sensor on the rear face as shown in the manual, solder the castellated edges flush, and complete the required pad joins for your sensor type.',
      manualReference: 'Manual pp. 20–25, Step 4',
    },
  ],
  troubleshooting: [
    {
      symptom: 'Antenna soldered at wrong length',
      possibleCauses: ['Cut after soldering', 'Wrong region\'s frequency used'],
      suggestions: [
        'Desolder carefully, re-cut to the manual table value, resolder minimally',
        'If the pad lifts, stop and get mentor help — pad damage is hard to repair',
      ],
    },
    {
      symptom: 'Sensor board does not sit flush',
      possibleCauses: ['Excess solder on castellated edges', 'Wrong orientation'],
      suggestions: [
        'Check rear-face orientation against the manual diagram before reheating',
        'Wick excess solder and reflow one edge at a time',
      ],
    },
    {
      symptom: 'Pins feel loose / unreliable connection',
      possibleCauses: ['Pins fitted but not soldered'],
      suggestions: [
        'This is expected in prototyping — press firmly when connecting the programmer',
        'Solder the pins if repeated uploads disconnect them',
      ],
    },
  ],
  nextModuleNote: 'Hardware assembled — Module 05 makes it blink: your first firmware build and upload.',
};
