import type { LessonContent } from '../../types';

export const m00: LessonContent = {
  moduleId: 'm00',
  why: 'Every engineering program starts by pinning down the mission. Before you touch the soldering iron you need to know what this satellite actually is, what it can realistically do, and which parts of the journey are yours versus the professionals\'. This module sets that frame so everything after it has context.',
  coreConcepts: [
    {
      heading: 'Your satellite, your code',
      body: 'AmbaSat-1 is an open-source, sprite-class educational satellite — a "chipsat" about 35 mm², made possible by modern semiconductor density. You write or adapt its firmware in **C/C++** (it is also Arduino-compatible), choose one of eight sensors, and the result is a satellite you can legitimately call *yours*.\n\nThe manual\'s framing is worth keeping: this is "YOUR satellite, purpose built and coded by you."',
      callout: {
        kind: 'info',
        title: 'The eight sensor options',
        text: '01 Humidity+Temp · 02 Temperature · 03 Gas & Pressure · 04 Ambient Light · 05 TVOC · 06 UV · 07 CO₂ · 08 GPS (earthbound only) — Manual p.3.',
      },
    },
    {
      heading: 'How sprites reach orbit',
      body: 'Completed kits that go forward are packed roughly **200 at a time into a 3U launch container** and deployed into a **~310 km Low Earth Orbit** in the thermosphere — chosen because atmospheric data is reliable there and mission length fits academic timescales.\n\nCommunications run over **LoRaWAN** to The Things Network\'s community gateways, with a proven range over 700 km line-of-sight — comfortably past the 310 km target.',
    },
    {
      heading: 'The honest boundary',
      body: 'This course covers everything up to a working, ground-tested satellite. What it does **not** cover — and does not pretend to — is flight qualification. For launch-program satellites, AmbaSat engineers set the European frequency plan per UKSA requirements, handle the antenna, remove the temporary programming pins, and recommend returning the solar board for final checks.',
      callout: {
        kind: 'warning',
        title: 'Keep this straight',
        text: 'A completed MK-II kit is a working educational satellite — not flight-certified hardware. This platform will never claim otherwise.',
      },
    },
  ],
  interactive: {
    title: 'Mission timeline explorer',
    plannedExperience:
      'An interactive timeline showing the kit\'s full journey — unboxing → ground build → ground test → (optional) launch packing → deployment → operations — with your current position highlighted.',
    visualizationType: 'mission-timeline',
  },
  handsOn: [
    {
      title: 'Read the manual introduction',
      body: 'Read the introduction and "What\'s in the Box" sections (pp. 3–6) of the AmbaSat-1 How To Guide. Note anything you do not recognise — the [Component Explorer](/explore/components) covers each part.',
    },
    {
      title: 'Pick your sensor',
      body: 'Choose one of the eight sensor options (manual p.3). Write one sentence about what your satellite will measure and why it is interesting.',
    },
    {
      title: 'Define your mission objective',
      body: 'Write your mission objective in one line, e.g. *"measure how temperature and humidity vary through a day"* or *"log UV exposure at ground level"*. You will refine it as the course proceeds.',
    },
  ],
  troubleshooting: [
    {
      symptom: 'I don\'t know which sensor to pick',
      possibleCauses: ['Eight options is genuinely a lot', 'Mission goal not yet defined'],
      suggestions: [
        'Start from the question, not the part — what do you want to know?',
        'Gas & Pressure (03) and Humidity+Temp (01) are friendly first missions',
        'Check the manual p.3 list and the component page for the sensor daughterboard',
      ],
    },
  ],
  nextModuleNote: 'Next you open the box: Module 01 tours the actual PCB, its three headline components, and every item in the MK-II kit.',
};
