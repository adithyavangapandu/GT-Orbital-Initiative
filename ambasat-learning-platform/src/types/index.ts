/**
 * Shared domain types for the AmbaSat Learning Platform.
 *
 * Educational content lives in typed data files under src/data and
 * src/content so that new modules, components, labs and checkpoints can be
 * added without touching routing or layout code.
 */

/** Where a statement of technical fact stands relative to the source manual. */
export type VerificationStatus = 'verified' | 'unverified' | 'additional-research-required';

export interface ManualReference {
  /** Document the claim comes from, e.g. "AmbaSat-1 How To Guide (MK-II Kit) v1.03". */
  sourceDocument: string;
  /** Printed page number inside the document (footer pagination). */
  page?: number;
  /** Section heading inside the document when a page number is not enough. */
  section?: string;
  /** What this reference supports. */
  description: string;
  verificationStatus: VerificationStatus;
}

export type ModuleStatus = 'available' | 'content-pending';
export type ContentStatus = 'starter' | 'content-pending' | 'published';

export interface Module {
  id: string;
  /** URL segment, e.g. "hardware-assembly". */
  slug: string;
  /** Zero-padded ordering number, e.g. "04". */
  number: string;
  title: string;
  summary: string;
  objectives: string[];
  /** Free-text prerequisites; empty means "no prerequisites". */
  prerequisites: string[];
  estimatedDuration: string;
  /** Slugs into the component explorer. */
  relatedComponents: string[];
  checkpointIds: { knowledge?: string; practical?: string };
  manualReferences: ManualReference[];
  status: ModuleStatus;
  /** Short label used on the My Mission milestone timeline. */
  milestone: string;
}

/** Rich lesson body for a single module. Prose fields are Markdown. */
export interface LessonContent {
  moduleId: string;
  /** "Why are we learning this?" — engineering motivation, Markdown. */
  why: string;
  coreConcepts: LessonBlock[];
  /** Placeholder describing the interactive planned for this module. */
  interactive: InteractivePlaceholder;
  handsOn: HandsOnStep[];
  troubleshooting: TroubleshootingItem[];
  /** Optional note rendered above the next-module navigation. */
  nextModuleNote?: string;
}

export interface LessonBlock {
  heading: string;
  /** Markdown body. */
  body: string;
  callout?: { kind: CalloutKind; title?: string; text: string };
  code?: { language: string; code: string; caption?: string };
  /** When set, a labelled diagram placeholder is rendered instead of an image. */
  diagramPlaceholder?: string;
}

export type CalloutKind = 'info' | 'warning' | 'safety' | 'tip' | 'engineering' | 'pending';

export interface InteractivePlaceholder {
  title: string;
  plannedExperience: string;
  visualizationType: string;
}

export interface HandsOnStep {
  title: string;
  /** Markdown body. */
  body: string;
  warning?: string;
  code?: { language: string; code: string; caption?: string };
  manualReference?: string;
}

export interface TroubleshootingItem {
  symptom: string;
  possibleCauses: string[];
  suggestions: string[];
}

/** A "Learn" article (introductory, non-hands-on reading). */
export interface Article {
  slug: string;
  title: string;
  summary: string;
  objectives: string[];
  /** Ordered sections; bodies are Markdown. */
  sections: LessonBlock[];
  whyItMatters: string;
  relatedLinks: { label: string; to: string }[];
  illustrationPlaceholder: string;
}

export type ComponentCategory =
  | 'compute'
  | 'sensing'
  | 'communications'
  | 'power'
  | 'structure'
  | 'interface';

export interface KitComponent {
  id: string;
  slug: string;
  name: string;
  category: ComponentCategory;
  tagline: string;
  /** True when the part ships pre-soldered/pre-assembled in the MK-II kit. */
  preAssembled: boolean;
  /** "What is it?" */
  whatIsIt: string;
  /** "Why is it necessary?" */
  whyNecessary: string;
  /** "Why this component or design?" — engineering trade-offs. */
  designRationale: string;
  /** "How does it work?" */
  howItWorks: string;
  /** "How does it connect?" — relationships to other subsystems. */
  howItConnects: string;
  /** "What can go wrong?" */
  whatCanGoWrong: string;
  /** "How do we test it?" */
  howWeTest: string;
  /** Slugs of related curriculum modules ("Where do we use it?"). */
  relatedModules: string[];
  manualReferences: ManualReference[];
  contentStatus: ContentStatus;
  /** Optional free-text caveats, e.g. unverified part numbers. */
  notes?: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export type Checkpoint =
  | {
      id: string;
      moduleId: string;
      type: 'knowledge';
      title: string;
      questions: QuizQuestion[];
    }
  | {
      id: string;
      moduleId: string;
      type: 'practical';
      title: string;
      tasks: { id: string; label: string }[];
    };

export interface Lab {
  id: string;
  slug: string;
  number: string;
  title: string;
  description: string;
  /** What the finished interactive lab is intended to do. */
  plannedInteractivity: string;
  associatedModules: string[];
  status: 'interactive' | 'coming-soon';
  visualizationType: string;
}

export type TelemetryPhase = 'deploy' | 'runtime';

export interface TelemetryStage {
  id: string;
  phase: TelemetryPhase;
  title: string;
  summary: string;
  detail: string;
  inputs: string;
  outputs: string;
  hardware: string;
  software: string;
  /** Optional related curriculum module slug. */
  moduleSlug?: string;
  manualReference?: string;
}

export interface MissionMilestone {
  id: string;
  label: string;
  /** Module id whose completion marks this milestone reached. */
  moduleId: string;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
  manualPage?: number;
}

export interface ResourceItem {
  title: string;
  description: string;
  /** External URL; omit for placeholders that are "Content pending". */
  url?: string;
  /** Internal route; takes precedence over url when both exist. */
  to?: string;
  pending?: boolean;
}

export interface ResourceSection {
  id: string;
  title: string;
  items: ResourceItem[];
}
