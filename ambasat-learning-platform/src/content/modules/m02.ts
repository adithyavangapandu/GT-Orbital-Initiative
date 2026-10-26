import type { LessonContent } from '../../types';

export const m02: LessonContent = {
  moduleId: 'm02',
  why: 'Engineering is the discipline of trade-offs: every component on this board is a negotiated answer to constraints of size, cost, power, mass and mission. Engineers who can only follow instructions break on the first anomaly; engineers who reason about trade-offs adapt. This module teaches that reasoning using AmbaSat\'s actual design choices.',
  coreConcepts: [
    {
      heading: 'The sprite bet: size for access',
      body: 'A chipsat is possible because semiconductors shrank enough to put CPU, memory, IMU and radio on ~35 mm² of PCB. The trade: far less compute and sensor area than a cubesat, in exchange for fitting ~200 sprites in a single 3U container — mass access to orbit as a consequence of size.',
    },
    {
      heading: 'LoRaWAN over a proprietary radio',
      body: 'The transceiver choice trades raw bandwidth for something that matters more in education: reach. LoRaWAN proves over **700 km line-of-sight** against a ~310 km orbit, and **The Things Network** supplies 16,600+ community gateways — free infrastructure instead of a bespoke ground station.',
      callout: {
        kind: 'engineering',
        title: 'Engineering reasoning',
        text: 'When infrastructure already exists and is free, the winning design is often the one that plugs into it — not the one with the best spec sheet.',
      },
    },
    {
      heading: 'Software-driven power',
      body: 'The tri-axis SMD does more than orientation: the manual notes it can **drive power-saving cycles** — but only if you write the code. That is a recurring AmbaSat pattern: the hardware enables, the firmware decides.',
    },
    {
      heading: 'MK-I vs MK-II: the human factor',
      body: 'The MK-II revision pre-solders the delicate parts and supplies the sensor on a ready daughterboard — the manual says the earlier kit demanded advanced solder skills and hours of SMD work. The trade-off is deliberate: assembly accessibility over the deeper solder practice, so you get to the *mission* faster.',
    },
  ],
  interactive: {
    title: 'Design decision explorer',
    plannedExperience:
      'An interactive table where each design decision (size, radio, pre-assembly, power model) reveals the constraint it answered, the alternative rejected, and the cost accepted.',
    visualizationType: 'tradeoff-matrix',
  },
  handsOn: [
    {
      title: 'Three trade-off one-pagers',
      body: 'Write a short note for three AmbaSat design choices — sprite size, LoRaWAN vs proprietary radio, MK-II pre-assembly — naming the constraint, the alternative, and what was traded away.',
    },
    {
      title: 'Find the power lever',
      body: 'In the flight code structure (or the manual\'s component description, p.4), locate where the IMU could drive power-saving behaviour. What would your firmware need to decide?',
    },
    {
      title: 'Your mission\'s constraint',
      body: 'Name the single hardest constraint on *your* chosen mission (battery life? data rate? sensor range?) and one design decision it forces.',
    },
  ],
  troubleshooting: [
    {
      symptom: 'Trade-offs feel abstract',
      possibleCauses: ['Mission goal still vague', 'Hardware not yet in hand'],
      suggestions: [
        'Return to Module 00 and tighten the mission statement',
        'Work through the component pages — rationale sections are written as trade-off arguments',
      ],
    },
  ],
  nextModuleNote: 'Trade-off reasoning applied: Module 03 sets up a safe, correct workspace before any physical assembly.',
};
