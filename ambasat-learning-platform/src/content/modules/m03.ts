import type { LessonContent } from '../../types';

export const m03: LessonContent = {
  moduleId: 'm03',
  why: 'The manual front-loads setup for a reason: every assembly failure in later steps traces back to a bad bench — a dry iron tip, a shaky lamp, a cluttered mat. A disciplined workstation is the cheapest reliability upgrade you will ever install.',
  coreConcepts: [
    {
      heading: 'ESD: the invisible killer',
      body: 'Ambient static builds through normal movement and can silently destroy the sensitive ICs on your board — the manual warns of "unforeseen behaviour such as spontaneous resets and corrupted programmes" or outright failure (p.9). Mitigation is mechanical, not hopeful: grounded wrist strap, anti-static mat, sensible clothing.',
      callout: {
        kind: 'safety',
        title: 'Safety',
        text: 'Always use an anti-static wrist strap and an anti-static mat when handling the AmbaSat PCB (manual p.9).',
      },
    },
    {
      heading: 'The seven-step pre-flight bench check',
      body: 'Before any soldering, the manual prescribes (pp. 10–11):\n\n1. Clear the workspace — nothing but essentials\n2. Good ambient lighting\n3. Quality soldering iron\n4. Bright focused task light at the joint\n5. Fine solder — 1.00 mm or less\n6. Fine non-magnetic tweezers\n7. Damp sponge or brass wool for tip care\n8. "Third hand" helping tool\n\nShort, adjustable-temperature irons are explicitly recommended — they ease handling of small parts.',
    },
    {
      heading: 'Workshop discipline',
      body: 'Additional guidance (p.10): keep a paper-lidded parts tin, organise tools, use quality tools ("a poor solder iron will ruin your experience"), never rush, and breathe normally — steady breathing makes a steadier hand. That last point is not folklore; it is technique.',
    },
    {
      heading: 'Software-side workstation',
      body: 'The bench has a digital half: VS Code + PlatformIO is the required toolchain (Step 2 of the guide, p.17), and a serial monitor is needed for sensor tests. Setting it up *now* avoids stalling mid-build.',
    },
  ],
  interactive: {
    title: 'Workstation inspection',
    plannedExperience:
      'An interactive bench scene: spot which stations pass the manual\'s checks and which hide ESD, lighting or tool hazards.',
    visualizationType: 'workstation-check',
  },
  handsOn: [
    {
      title: 'Audit your bench',
      domain: 'hardware',
      body: 'Run the manual\'s eight-point checklist (pp. 10–11) against your actual workspace. Photograph or note what fails and fix each item before proceeding.',
    },
    {
      title: 'Install the toolchain',
      domain: 'software',
      body: 'Install VS Code and the PlatformIO plugin per manual Step 2 (p.17). Open it once and confirm the PlatformIO icon appears.',
    },
    {
      title: 'Prepare the ESD kit',
      domain: 'hardware',
      body: 'Have the wrist strap, anti-static mat and fine solder (≤1.00 mm) physically at the bench. Confirm strap grounding per your mat\'s instructions.',
    },
  ],
  troubleshooting: [
    {
      symptom: 'No wrist strap / anti-static mat available',
      possibleCauses: ['Shared or borrowed workspace'],
      suggestions: [
        'Do not handle the bare PCB without ESD protection — borrow the org\'s kit or work at a supervised bench',
        'Keep the board in its anti-static packaging until the bench is ready',
      ],
    },
    {
      symptom: 'PlatformIO plugin will not install',
      possibleCauses: ['Blocked extension marketplace', 'Old VS Code version'],
      suggestions: [
        'Update VS Code first, then retry the extension install',
        'See troubleshooting page and manual p.17 instructions',
      ],
    },
  ],
  nextModuleNote: 'Bench ready? Module 04 is the first hands-on assembly: trim the antenna, fit the temporary pins, and mount your sensor.',
};
