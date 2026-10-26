# Curriculum map — manual → course

Source of truth: *AmbaSat-1 How To Guide, MK-II Kit, v1.03*. Page numbers below are
manual pages; they are also recorded per-module in `src/data/modules.ts`
(`manualReferences`) and inside each component's reference list.

| Module | Title | Manual basis |
| --- | --- | --- |
| 00 Your Mission Begins | Mission framing, what the kit is/isn't | pp. 3, 7–8 (intro, sprite concept, launch overview) |
| 01 Meet the AmbaSat | Board tour + kit contents | pp. 4–5 (3 headline components, box list) |
| 02 Engineering Tradeoffs | Design reasoning from real choices | pp. 3–4 (sprite/LoRaWAN rationale), p. 6 (MK-I vs MK-II) |
| 03 Prepare Your Workstation | ESD safety + bench + toolchain | pp. 9–11 (ESD, tools, workshop discipline), p. 17 |
| 04 Hardware Assembly | Antenna → temp pins → sensor mount | Step 1 pp. 12–14; pins pp. 15–16; Step 4 pp. 20–25 |
| 05 First Firmware | Toolchain, wiring, LED test, upload errors | Step 2 pp. 17–18; Step 3 errors p. 19 |
| 06 Reading Sensor Data | Sensor serial-terminal test | Step 5 pp. 26–28 |
| 07 Wireless Communication | LoRaWAN/TTN, keys, flight code, battery | Step 6 pp. 29–31; pp. 3–4 (LoRaWAN/TTN) |
| 08 Mission Control Dashboard | Dashboard, packet decode, TTN console | pp. 29–32 (dashboard + key workflow) |
| 09 Integration & Mission Review | System review + launch-prep boundary | p. 8 & launch-prep passages (UKSA config, pin removal, solar board return) |

## Learn articles

| Article | Manual basis |
| --- | --- |
| What is a satellite? | p. 3 + general primers (marked as supplementary where beyond manual) |
| Sprite satellites & AmbaSat | pp. 3–4, 7–8 |
| The eight sensors | p. 3 |
| Communications: LoRaWAN & TTN | pp. 3–4, 29 |

## Component explorer ↔ manual

| Component | Manual basis |
| --- | --- |
| PCB | p. 4–5, 20–25 |
| Microcontroller (MCU) | p. 4 |
| Tri-axis IMU | p. 4 |
| LoRaWAN transceiver | p. 4 |
| Antenna | pp. 12–14 |
| Sensor daughterboard | p. 3 (options), pp. 20–28 |
| CH340/FTDI programmer | pp. 5, 17–19 |
| Programming pins (×6) | pp. 15–16, 31 |
| Solar board + cells | pp. 5, launch-prep note |
| Battery holder | pp. 5, 31 |

## Gaps / flagged items

- Exact part numbers (radio chip, MCU, IMU IC, sensor ICs): **Additional research
  required** — the manual names functions, not always part numbers. Flagged
  `needs-verification` in `components.ts`.
- TTN console device-registration flow beyond the manual: *Content pending*.
- Orbit-ops detail (TLE tracking, pass prediction): out of manual scope — listed in
  `docs/future-features.md`.
