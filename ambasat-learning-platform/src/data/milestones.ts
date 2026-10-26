import type { MissionMilestone } from '../types';

/**
 * Mission timeline on the My Mission dashboard. `moduleId` is the module whose
 * completion marks the milestone reached; entries follow the curriculum order.
 */
export const milestones: MissionMilestone[] = [
  { id: 'ms-0', label: 'Mission objective defined', moduleId: 'm00' },
  { id: 'ms-1', label: 'Hardware understood', moduleId: 'm01' },
  { id: 'ms-2', label: 'Design tradeoffs understood', moduleId: 'm02' },
  { id: 'ms-3', label: 'Workstation prepared', moduleId: 'm03' },
  { id: 'ms-4', label: 'Hardware assembled', moduleId: 'm04' },
  { id: 'ms-5', label: 'Firmware running', moduleId: 'm05' },
  { id: 'ms-6', label: 'Sensor measurements collected', moduleId: 'm06' },
  { id: 'ms-7', label: 'Telemetry link configured', moduleId: 'm07' },
  { id: 'ms-8', label: 'Dashboard operational', moduleId: 'm08' },
  { id: 'ms-9', label: 'Final project demonstrated', moduleId: 'm09' },
];
