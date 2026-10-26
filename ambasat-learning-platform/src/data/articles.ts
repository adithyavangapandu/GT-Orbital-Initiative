import type { Article } from '../types';

/**
 * Introductory "Learn" articles — general satellite background, separate from
 * the hands-on build curriculum. Content is original summary material; the
 * manual is the source of truth for anything kit-specific.
 */
export const articles: Article[] = [
  {
    slug: 'what-is-a-satellite',
    title: 'What Is a Satellite?',
    summary: 'The minimum viable definition: an object put into orbit to do a job — and what jobs satellites actually do.',
    objectives: [
      'Define a satellite in engineering terms',
      'Name the basic subsystems almost every satellite shares',
      'Give examples of real satellite missions',
    ],
    illustrationPlaceholder: 'Annotated satellite diagram: payload, bus, power, comms, orbit path',
    sections: [
      {
        heading: 'A working definition',
        body: 'A satellite is any object placed into orbit around a larger body to perform a function. What makes a satellite a *spacecraft* rather than space debris is that it was built for a purpose: observing Earth, relaying communications, navigation, science, or — in our case — education.\n\nAlmost every satellite, whatever its size, is organised the same way: a **payload** (the instrument that does the mission) carried by a **bus** (everything that keeps the payload alive and working).',
      },
      {
        heading: 'The subsystems nearly every satellite shares',
        body: 'Strip any satellite down and you find the same supporting cast:\n\n- **Power** — solar cells and/or batteries that keep everything running.\n- **Onboard computer** — the brain that runs flight software.\n- **Communications** — a radio link to the ground.\n- **Attitude determination & control** — knowing and controlling which way the craft points.\n- **Structure & thermal** — the frame and the management of extreme temperatures.\n\nThe AmbaSat-1 squeezes versions of these onto a 35 mm² PCB: an MCU for compute, a tri-axis IMU for attitude sensing, a LoRaWAN transceiver for comms, and solar cells plus a battery option for power.',
        callout: {
          kind: 'engineering',
          title: 'Engineering lens',
          text: 'When engineers say "subsystem" they mean a function, not necessarily a separate box. On AmbaSat-1 several functions share one PCB — integration is itself a design choice.',
        },
      },
      {
        heading: 'What satellites are for',
        body: 'Earth observation, weather, GPS navigation, broadband internet, disaster response, science — and increasingly, education. Kits like AmbaSat-1 exist because the cost and size of satellite hardware have collapsed far enough that a student team can hold one.',
      },
    ],
    whyItMatters:
      'You cannot design or operate something you cannot define. This vocabulary — payload vs bus, subsystem functions — is the grammar every later module speaks.',
    relatedLinks: [
      { label: 'Next: Small Satellites, CubeSats, and AmbaSats', to: '/learn/smallsats-cubesats-ambasats' },
      { label: 'Start the build curriculum', to: '/curriculum' },
    ],
  },
  {
    slug: 'smallsats-cubesats-ambasats',
    title: 'Small Satellites, CubeSats, and AmbaSats',
    summary: 'From school-bus satellites to a satellite that fits on a postage stamp — the size classes and what each costs you.',
    objectives: [
      'Order the common satellite size classes',
      'Explain the CubeSat "U" unit',
      'Place the AmbaSat-1 sprite/chipsat on the spectrum',
    ],
    illustrationPlaceholder: 'Scale chart: CubeSat 1U vs 3U vs AmbaSat-1 sprite at 35 mm',
    sections: [
      {
        heading: 'The shrinking satellite',
        body: 'Early satellites were room-sized and cost national budgets. Semiconductor miniaturisation flipped that: today useful spacecraft range from fridge-size "smallsats" down to handheld classes.\n\n- **CubeSat** — built from 10 cm "U" units (1U, 3U, 6U…). A real engineering platform, but a CubeSat program still costs serious money and can take years.\n- **Sprite / chipsat** — centimetre-scale, single-PCB spacecraft. The AmbaSat-1 is a 35 mm² sprite.',
      },
      {
        heading: 'Where the AmbaSat-1 sits',
        body: 'AmbaSat-1 sits at the smallest end of the practical spectrum: a single PCB carrying an MCU, IMU, LoRaWAN radio and a pluggable sensor. The manual’s own comparison is instructive — the closest commercial equivalent is a CubeSat, which is more capable but "expensive and can take years to put together".\n\nRoughly 200 sprites ride in one 3U container — the *container* is CubeSat-shaped even though the satellites inside are sprites.',
        callout: {
          kind: 'info',
          title: 'Key distinction',
          text: 'Sprite = the satellite itself (35 mm²). 3U container = the dispenser that carries ~200 of them to orbit.',
        },
      },
      {
        heading: 'What size buys you',
        body: 'Smaller means cheaper and faster to build — but tighter power, memory, antenna and compute budgets. That is why the AmbaSat design choices in this course (pre-soldered SMD parts, LoRaWAN, temporary programming pins) all trace back to size constraints.',
      },
    ],
    whyItMatters:
      'Every trade-off you meet later — antenna length, flush solder, tiny memory — makes sense once you know which class of satellite you are building.',
    relatedLinks: [
      { label: 'Next: From the Laboratory to Orbit', to: '/learn/lab-to-orbit' },
      { label: 'Meet the actual hardware', to: '/explore/components' },
    ],
  },
  {
    slug: 'lab-to-orbit',
    title: 'From the Laboratory to Orbit',
    summary: 'What a satellite’s life looks like between your soldering iron and space — and which parts the kit does not cover.',
    objectives: [
      'Sketch the path from bench to launch to on-orbit operations',
      'Distinguish ground testing from flight operations',
      'Identify which steps remain professional/industrial',
    ],
    illustrationPlaceholder: 'Timeline: assembly → ground test → launch packing → deployment → operations',
    sections: [
      {
        heading: 'The ground phase — what you do',
        body: 'Everything in this course happens in the ground phase: assemble the board, flash firmware, verify the sensor on the bench, transmit over LoRaWAN to The Things Network, and watch data arrive on the dashboard. The battery holder exists precisely for this — untethered earth-bound testing.',
      },
      {
        heading: 'The gap — what professionals do',
        body: 'Between a working kit and a deployed satellite sits professional preparation. The manual itself tells you the boundary: for launch-program satellites, AmbaSat engineers set the European frequency plan per UKSA requirements, replace or tune the antenna, remove the temporary programming pins, and recommend returning the solar board for final checks.\n\nThis is the honest version of "students can reach orbit": the kit is educational, and flight qualification remains a professional process.',
        callout: {
          kind: 'warning',
          title: 'Keep this straight',
          text: 'Completing the kit does not qualify it for launch. Radio licensing, launch integration and final checks are handled outside this course.',
        },
      },
      {
        heading: 'The flight phase — where it ends up',
        body: 'Sprites that go forward are packed ~200 at a time into a 3U container, launched as rideshare, and deployed into a ~310 km Low Earth Orbit in the thermosphere — chosen because atmospheric data is reliable there and mission lengths suit academic schedules.',
      },
    ],
    whyItMatters:
      'Knowing where your responsibility ends and the professionals’ begins keeps both your expectations and your engineering honest.',
    relatedLinks: [
      { label: 'Next: How Satellite Systems Work Together', to: '/learn/systems-work-together' },
      { label: 'Module 09 — Integration and Mission Review', to: '/curriculum/integration-and-mission-review' },
    ],
  },
  {
    slug: 'systems-work-together',
    title: 'How Satellite Systems Work Together',
    summary: 'The satellite as a system of systems: how compute, sensing, power, comms and structure depend on each other.',
    objectives: [
      'Draw the dependency web between a satellite’s subsystems',
      'Explain why a failure in one part cascades',
      'Read the AmbaSat-1 as an integrated system, not a parts list',
    ],
    illustrationPlaceholder: 'Block diagram: sensor → MCU → radio → antenna → ground station, with power feeding all',
    sections: [
      {
        heading: 'Nothing works alone',
        body: 'A satellite is a dependency graph. The sensor produces data only if the MCU requests it; the MCU runs only if power is stable and firmware is loaded; the radio transmits only if the antenna is correctly attached; the dashboard shows data only if a gateway heard the packet.\n\nChange one node and others must adapt — that interdependence *is* systems engineering.',
      },
      {
        heading: 'Read it on the AmbaSat-1',
        body: 'Trace a single measurement on the kit:\n\n1. Battery or solar board feeds the power rails.\n2. MCU firmware polls the sensor daughterboard.\n3. The sensor returns a reading over the shared pads.\n4. Firmware packages it into a LoRaWAN packet with your device keys.\n5. The transceiver pushes it through the wire antenna.\n6. A TTN gateway receives it and the network routes it onward.\n7. Your dashboard renders it.\n\nEach arrow is an interface — and each interface is a place things can fail, which is exactly why the course teaches testing at every stage.',
        callout: {
          kind: 'tip',
          title: 'Engineering habit',
          text: 'When something fails, find the interface. Most bugs in a build like this live where two subsystems meet.',
        },
      },
    ],
    whyItMatters:
      'This system view is the whole course in miniature — the Telemetry Journey lab visualises exactly this chain, and the curriculum walks it link by link.',
    relatedLinks: [
      { label: 'See the chain animated', to: '/lab/telemetry-journey' },
      { label: 'Start building', to: '/curriculum' },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
