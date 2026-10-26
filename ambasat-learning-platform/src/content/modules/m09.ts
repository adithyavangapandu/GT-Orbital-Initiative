import type { LessonContent } from '../../types';

export const m09: LessonContent = {
  moduleId: 'm09',
  why: 'The difference between "I built a thing" and "I ran a mission" is review: did every subsystem pass, is the satellite integrated, and do you understand what stands between your bench and orbit? This module runs that review and lays out the real launch-preparation boundary.',
  coreConcepts: [
    {
      heading: 'Integration checklist',
      body: 'Walk the satellite as a system, not a pile of steps:\n\n1. Antenna cut to regional spec, minimal solder on the pad (Step 1)\n2. Sensor flush-mounted on the rear, correct pads joined (Step 4)\n3. LED test passed (Step 2)\n4. Sensor test passed on serial (Step 5)\n5. Flight code built, keys loaded, packets reaching dashboard (Step 6)\n6. Battery wiring verified: red → VIN, black → GND\n\nAnything unverified goes back on the workbench — a mission review that waves through gaps is paperwork, not engineering.',
    },
    {
      heading: 'What launch prep actually looks like',
      body: 'For satellites that go forward, the manual is explicit about who finishes the job: **AmbaSat engineers** configure the European frequency plan per UKSA requirements, handle the antenna, **remove the temporary programming pins**, and recommend returning the solar board for final checks. Roughly 200 sprites then pack into a 3U container for deployment at ~310 km.',
      callout: {
        kind: 'warning',
        title: 'The boundary, stated plainly',
        text: 'Your completed kit is a working satellite and a real engineering achievement — it is not, by itself, flight-qualified. Nothing in this course implies otherwise.',
      },
    },
    {
      heading: 'Your mission review',
      body: 'Real programs close with a review against the original objective. Re-read your Module 00 mission statement and answer honestly: does the data you collect answer the question you posed? What would you change in a Mk-II of your own design?',
    },
  ],
  interactive: {
    title: 'Mission readiness review',
    plannedExperience:
      'An interactive review board that walks each subsystem (antenna, sensor, firmware, radio, power, operations) and produces a readiness summary you could present to a mentor.',
    visualizationType: 'mission-review',
  },
  handsOn: [
    {
      title: 'Run the integration checklist',
      domain: 'hardware',
      body: 'Physically inspect and re-verify each of the six checklist items on your own satellite. Photograph the result for your build log.',
    },
    {
      title: 'Write your mission review',
      body: 'One page: mission objective (Module 00), what you built, what you measured, what failed and how you fixed it, and your honest readiness assessment.',
    },
    {
      title: 'Present to a mentor',
      body: 'Walk a mentor or teammate through your satellite and your review. Mentor verification of practical skills is part of the program — this platform flags where it is required.',
    },
  ],
  troubleshooting: [
    {
      symptom: 'A checklist item fails during review',
      possibleCauses: ['Something regressed since it first passed'],
      suggestions: [
        'Treat it as a real anomaly: reproduce, isolate the subsystem, fix, re-verify',
        'Use the troubleshooting tables in the earlier module that owns the failing item',
      ],
    },
  ],
  nextModuleNote: 'Course complete — head to the Engineering Lab to keep exploring, and check My Mission for your milestone record.',
};
