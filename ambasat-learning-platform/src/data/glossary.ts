import type { GlossaryEntry } from '../types';

/** Terms used across the platform; structured for future inline tooltips. */
export const glossary: GlossaryEntry[] = [
  { term: 'Sprite / Chipsat', definition: 'A centimetre-scale, single-PCB class of satellite. AmbaSat-1 is a 35 mm² sprite.', manualPage: 3 },
  { term: 'CubeSat / "U"', definition: 'A satellite built from 10 cm cube units. ~200 AmbaSat sprites fit in one 3U launch container.', manualPage: 4 },
  { term: 'MCU', definition: 'Microcontroller Unit — the processor on the motherboard that runs uploaded firmware.', manualPage: 4 },
  { term: 'IMU', definition: 'Inertial Measurement Unit — on AmbaSat-1, a tri-axis gyroscope + accelerometer + magnetometer.', manualPage: 4 },
  { term: 'LoRaWAN', definition: 'Long Range Wide Area Network — sub-gigahertz radio protocol with 700 km+ proven line-of-sight range.', manualPage: 29 },
  { term: 'TTN', definition: 'The Things Network — a community-run network of 16,000+ LoRaWAN gateways that routes device data to applications.', manualPage: 29 },
  { term: 'Transceiver', definition: 'The radio chip that both transmits and receives — on AmbaSat-1, the LoRaWAN radio.', manualPage: 4 },
  { term: 'Gateway', definition: 'A ground receiver that hears LoRaWAN packets and forwards them into the network.', manualPage: 29 },
  { term: 'Telemetry', definition: 'Measurements collected by the satellite and transmitted to the ground — sensor readings in this kit.' },
  { term: 'NWKSKEY / APPSKEY / DEVADDR', definition: 'Your device’s LoRaWAN credentials: network session key, application session key, and device address. Entered into the flight code.', manualPage: 29 },
  { term: 'LEO', definition: 'Low Earth Orbit — AmbaSat-1 sprites deploy to ~310 km LEO, inside the thermosphere.', manualPage: 4 },
  { term: 'Frequency plan', definition: 'The legally allocated LoRaWAN band for your region — 868 MHz in Europe, 915 MHz in the US. Antenna length depends on it.', manualPage: 12 },
  { term: 'Daughterboard', definition: 'A small add-on board that mounts onto the main PCB — how your chosen sensor attaches.', manualPage: 6 },
  { term: 'SMD', definition: 'Surface-Mount Device — a component soldered directly onto pads, like the pre-fitted IMU and transceiver.' },
  { term: 'PlatformIO', definition: 'The VS Code extension used to build (compile) and upload AmbaSat firmware.', manualPage: 11 },
  { term: 'CH340 / FTDI programmer', definition: 'USB adapter that bridges your computer to the board’s six programming pins for code upload and power.', manualPage: 5 },
  { term: 'Firmware', definition: 'The compiled program that runs on the MCU — uploaded once, executed on every power-up.' },
  { term: '3U container', definition: 'The CubeSat-shaped dispenser that carries ~200 sprites to orbit.', manualPage: 4 },
  { term: 'AmbaSat Dashboard', definition: 'The web application (login shipped with the kit) where your satellite’s received data appears.', manualPage: 6 },
  { term: 'Flux/flush solder', definition: 'A solder joint level with the board surface — required on the rear so the solar board can mount without gaps.', manualPage: 20 },
];
