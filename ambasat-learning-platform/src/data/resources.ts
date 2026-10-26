import type { ResourceSection } from '../types';

/** External URLs below appear verbatim in the manual; internal routes resolve to real pages. */
export const resourceSections: ResourceSection[] = [
  {
    id: 'manual',
    title: 'AmbaSat Manual',
    items: [
      {
        title: 'AmbaSat-1 How To Guide (MK-II Kit) v1.03',
        description:
          'The source document for this course — supplied with the course materials. Page references appear throughout the modules and component pages.',
        pending: true,
      },
      {
        title: 'AmbaSat website',
        description: 'Project homepage referenced in the manual’s introduction.',
        url: 'https://ambasat.com',
      },
    ],
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    items: [
      {
        title: 'Course: Module 00 — Your Mission Begins',
        description: 'Orientation module for the build curriculum.',
        to: '/curriculum/your-mission-begins',
      },
      {
        title: 'What is a Satellite?',
        description: 'Introductory background article in the Learn section.',
        to: '/learn/what-is-a-satellite',
      },
      {
        title: 'Recommended starter toolkit (manual link)',
        description: 'The soldering/multimeter kit recommended in the manual for first-timers.',
        url: 'https://www.amazon.co.uk/Soldering-Multimeter-NO-Soldering-Welding-Cutter/dp/B07F2XNTWV/',
      },
    ],
  },
  {
    id: 'hardware',
    title: 'Hardware Reference',
    items: [
      {
        title: 'Component Explorer',
        description: 'Every part of the MK-II kit, what it does, and how it fails.',
        to: '/explore/components',
      },
      {
        title: 'LoRaWAN frequency plans',
        description: 'Regional frequency plans — required before trimming the antenna (manual Step One link).',
        url: 'https://www.thethingsindustries.com/docs/reference/frequency-plans',
      },
      {
        title: 'CH340 driver installation guide',
        description: 'SparkFun tutorial linked by the manual for Windows users.',
        url: 'https://learn.sparkfun.com/tutorials/how-to-install-ch340-drivers/all',
      },
    ],
  },
  {
    id: 'software',
    title: 'Software Reference',
    items: [
      {
        title: 'Visual Studio Code',
        description: 'The IDE used throughout the manual.',
        url: 'https://code.visualstudio.com/',
      },
      {
        title: 'AmbaSat-1 GitHub repository',
        description: 'Open-source workspaces: LED example, sensor examples, and Flight Code.',
        url: 'https://github.com/ambasat/AmbaSat-1',
      },
      {
        title: 'PlatformIO IDE',
        description: 'The VS Code extension that builds and uploads firmware (install from the VS Code marketplace).',
        pending: true,
      },
    ],
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    items: [
      {
        title: 'Manual — Errors & Fault Finding',
        description: 'Upload-port and stk500_recv() errors with their fixes (Manual p.19).',
        to: '/curriculum/first-firmware',
      },
      {
        title: 'AmbaSat-1 forum',
        description: 'Community support forum listed in the manual.',
        url: 'https://ambasat.com/forum3/public/',
      },
      {
        title: 'AmbaSat support',
        description: 'support@ambasat.com — direct support address from the manual.',
        url: 'mailto:support@ambasat.com',
      },
    ],
  },
  {
    id: 'links',
    title: 'Useful Engineering Links',
    items: [
      {
        title: 'The Things Network',
        description: 'The community LoRaWAN network that carries AmbaSat packets.',
        url: 'https://www.thethingsnetwork.org',
      },
      {
        title: 'TTN frequency-plan docs',
        description: 'LoRaWAN regional rules referenced for ground testing (manual link).',
        url: 'https://www.thethingsnetwork.org/docs/lorawan/frequency-plans/',
      },
    ],
  },
  {
    id: 'github',
    title: 'GitHub Repositories',
    items: [
      {
        title: 'ambasat/AmbaSat-1',
        description: 'Official open-source firmware and examples used by the manual.',
        url: 'https://github.com/ambasat/AmbaSat-1',
      },
      {
        title: 'GT Orbital Initiative website source',
        description: 'The repository that hosts this platform.',
        url: 'https://github.com/adithyavangapandu/GT-Orbital-Initiative',
      },
    ],
  },
  {
    id: 'org',
    title: 'Orbital Initiative Documentation',
    items: [
      {
        title: 'About Orbital Initiative',
        description: 'The student organization behind this platform.',
        to: '/about',
      },
      {
        title: 'Curriculum map (manual → modules)',
        description: 'How the AmbaSat manual maps onto the ten-module course (docs/curriculum-map.md in the repo).',
        pending: true,
      },
      {
        title: 'Orbital Initiative home',
        description: 'Main organization website.',
        url: 'https://adithyavangapandu.github.io/GT-Orbital-Initiative/',
      },
    ],
  },
];
