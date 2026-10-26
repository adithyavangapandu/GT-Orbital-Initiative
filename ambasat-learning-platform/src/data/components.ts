import type { KitComponent } from '../types';

const MANUAL = 'AmbaSat-1 How To Guide (MK-II Kit) v1.03';

/**
 * Hardware inventory of the MK-II kit, as described by the manual.
 * Component-specific detail (part numbers, datasheets) that the manual does
 * not state is marked with `notes` as "Additional research required" rather
 * than guessed.
 */
export const components: KitComponent[] = [
  {
    id: 'c-pcb',
    slug: 'pcb',
    name: 'AmbaSat-1 PCB (Motherboard)',
    category: 'structure',
    tagline: 'The 35 mm² motherboard every other component lives on.',
    preAssembled: true,
    whatIsIt:
      'The AmbaSat-1 printed circuit board — the "motherboard" of the satellite. On the MK-II kit the fiddliest surface-mount parts (microcontroller, IMU, LoRaWAN transceiver, LED) arrive already soldered to it.',
    whyNecessary:
      'It is the mechanical and electrical backbone of the satellite: it carries power, routes signals between the processor, sensors and radio, and physically holds the antenna, sensor daughterboard and solar board.',
    designRationale:
      'The MK-II board trades the MK-I "Engineering Kit" soldering challenge for approachability: pre-soldered delicate components cut assembly time by hours and remove the most error-prone steps, which is why it exists for education. The layout still forces one classic engineering constraint — the rear must finish flush so the solar board can mount flat inside the 3U launch container.',
    howItWorks:
      'Copper traces inside the board connect pads and components: power rails distribute energy from the battery/solar source, and signal lines carry sensor data to the microcontroller and telemetry to the transceiver.',
    howItConnects:
      'Accepts the antenna at the transceiver pad, six temporary programming pins for the CH340 programmer, the sensor daughterboard across the top-right connection points, and later the solar board on the rear. The onboard LED is a built-in test output.',
    whatCanGoWrong:
      'Solder bridges can short adjacent pads (the manual highlights shorts near the transceiver that would stop it functioning). Excess solder or pin stubs on the rear prevent the flush fit the solar board needs. Static discharge can damage the pre-soldered ICs before you ever power the board.',
    howWeTest:
      'Visual inspection for bridges and cold joints, multimeter continuity checks for shorts, and the AmbaSat-LED firmware test — a blinking green LED proves the board accepts code and that power flows correctly.',
    relatedModules: ['meet-the-ambasat', 'engineering-tradeoffs', 'hardware-assembly', 'integration-and-mission-review'],
    manualReferences: [
      { sourceDocument: MANUAL, page: 5, description: 'MK-II kit contents; delicate components pre-soldered to the PCB.', verificationStatus: 'verified' },
      { sourceDocument: MANUAL, page: 20, section: 'Step Four', description: 'Flush rear finish required for solar board mounting; every millimetre counts.', verificationStatus: 'verified' },
      { sourceDocument: MANUAL, page: 12, section: 'Step One', description: 'Short-circuit risk areas around the transceiver pads.', verificationStatus: 'verified' },
    ],
    contentStatus: 'starter',
    notes: 'Exact PCB revision and layer stackup are not specified in the manual — Additional research required.',
  },
  {
    id: 'c-mcu',
    slug: 'microcontroller',
    name: 'Microcontroller Unit (MCU)',
    category: 'compute',
    tagline: 'The brains of the satellite — runs every line of code you upload.',
    preAssembled: true,
    whatIsIt:
      'The processor soldered to the AmbaSat-1 motherboard. Your compiled firmware is uploaded to it through the CH340 programmer and it executes everything: sensor polling, data packaging and radio control.',
    whyNecessary:
      'Without the MCU the kit is inert hardware. It decides when to read the sensor, how to format the telemetry packet, and when to tell the transceiver to transmit.',
    designRationale:
      'The manual notes firmware is written in C/C++ (the board is also Arduino-compatible), which points to a small, low-power microcontroller-class part rather than a Linux-class processor — the right trade for a battery/solar-powered satellite with limited memory. The manual itself warns "there’s only limited memory available" when new firmware replaces the LED example.',
    howItWorks:
      'You compile C/C++ into machine code with PlatformIO, then the programmer transfers the image over serial lines (TX/RX, with DTR for reset control) into the MCU’s flash memory. On power-up the MCU runs the firmware loop.',
    howItConnects:
      'Talks to the sensor daughterboard over the board’s shared connection points, drives the onboard LED, and commands the LoRaWAN transceiver. Receives code and power through the six programming pins from the CH340/FTDI programmer.',
    whatCanGoWrong:
      'Uploads can fail if the programmer wiring is wrong (the classic stk500_recv() error). A firmware bug can leave the satellite doing nothing observable — which is why the LED example exists as a first smoke test. Flash memory is limited, so one program replaces another.',
    howWeTest:
      'The AmbaSat-LED example: build, upload, and watch the onboard LED blink. Then the sensor example workspace prints live readings in the serial terminal, proving the MCU can drive its peripherals.',
    relatedModules: ['meet-the-ambasat', 'first-firmware', 'reading-sensor-data', 'wireless-communication'],
    manualReferences: [
      { sourceDocument: MANUAL, page: 4, section: 'AmbaSat-1 Main Components', description: 'MCU described as the processor/brain where code is uploaded and run.', verificationStatus: 'verified' },
      { sourceDocument: MANUAL, page: 3, description: 'C/C++ primary language; Arduino-compatible.', verificationStatus: 'verified' },
      { sourceDocument: MANUAL, page: 27, description: 'Uploading a new build replaces the running program — limited memory.', verificationStatus: 'verified' },
    ],
    contentStatus: 'starter',
    notes: 'The manual does not name the MCU part number — Additional research required (see the AmbaSat-1 GitHub repository).',
  },
  {
    id: 'c-imu',
    slug: 'imu',
    name: 'Tri-Axis IMU (Gyro · Accel · Mag)',
    category: 'sensing',
    tagline: 'Tracks the satellite’s motion and orientation on all three axes.',
    preAssembled: true,
    whatIsIt:
      'A pre-soldered surface-mount device combining a gyroscope, accelerometer and magnetometer — the satellite’s sense of motion.',
    whyNecessary:
      'The manual lists it as one of the three main components: it helps determine AmbaSat-1’s trajectory and supports earth-bound tasks too, such as enabling power-saving behaviour when solar power is unavailable.',
    designRationale:
      'Integrating three motion sensors into one SMD package keeps the 35 mm² board small and avoids extra wiring — a space and reliability trade typical of integrated IMUs versus three discrete sensors.',
    howItWorks:
      'The accelerometer measures linear acceleration, the gyroscope measures rotation rate, and the magnetometer senses the local magnetic field — together the firmware can estimate orientation and movement.',
    howItConnects:
      'Pre-mounted on the motherboard and read by the MCU over the board’s internal bus. Not user-soldered on the MK-II.',
    whatCanGoWrong:
      'Static discharge during handling can damage pre-soldered SMD parts — the manual’s anti-static precautions exist for exactly these devices. Orientation data can also be misread if firmware does not initialise it correctly (software-side concern).',
    howWeTest:
      'Indirectly exercised by the sensor/flight firmware. The manual does not define a dedicated IMU test step — Additional research required for a dedicated verification procedure.',
    relatedModules: ['meet-the-ambasat', 'reading-sensor-data'],
    manualReferences: [
      { sourceDocument: MANUAL, page: 4, section: 'AmbaSat-1 Main Components', description: 'Tri-axis SMD gyroscope, accelerometer, magnetometer; trajectory and power-saving uses.', verificationStatus: 'verified' },
    ],
    contentStatus: 'starter',
    notes: 'IMU part number, bus details and dedicated test procedure are not specified in the manual — Additional research required.',
  },
  {
    id: 'c-transceiver',
    slug: 'transceiver',
    name: 'LoRaWAN Transceiver',
    category: 'communications',
    tagline: 'The radio that reaches 16,000+ community gateways — and orbit.',
    preAssembled: true,
    whatIsIt:
      'The pre-soldered LoRaWAN radio chip on the motherboard. It transmits the satellite’s telemetry packets and, per the manual, can reach The Things Network’s community gateways over 700 km line-of-sight.',
    whyNecessary:
      'It is the satellite’s only link home. Every measurement the sensor produces is worthless on-orbit unless this chip can deliver it to a ground receiver.',
    designRationale:
      'LoRaWAN was chosen because sub-gigahertz long-range links achieve orbit-class ranges at very low power, and because TTN provides tens of thousands of free community gateways — no specialist or expensive receiving equipment needed. The trade: low bandwidth and regional frequency regulations you must respect.',
    howItWorks:
      'The MCU hands the radio a formatted telemetry packet; the transceiver modulates it onto your region’s LoRaWAN band (e.g. 868 MHz EU, 915 MHz US) through the wire antenna to any TTN gateway in range.',
    howItConnects:
      'Driven by the MCU; its output feeds the wire antenna. Packets are picked up by TTN gateways and routed to your AmbaSat dashboard — the satellite side of the end-to-end telemetry chain.',
    whatCanGoWrong:
      'Powering the board with no antenna attached can push the radio beyond safe limits and "fry the chip" — the manual makes antenna-first its Step One for this reason. A wrong antenna length reflects power back into the transmitter. Solder shorts near its pads stop it functioning. Wrong regional frequency settings break the link and may breach regulations.',
    howWeTest:
      'End-to-end: after keys are entered in the flight code and the board is powered by the battery pack, received packets appearing in the AmbaSat Dashboard prove the transceiver and antenna chain work.',
    relatedModules: ['meet-the-ambasat', 'hardware-assembly', 'wireless-communication', 'mission-control-dashboard'],
    manualReferences: [
      { sourceDocument: MANUAL, page: 4, section: 'AmbaSat-1 Main Components', description: 'LoRaWAN chip using TTN; 16,000+ ground stations; no specialist receiver equipment needed.', verificationStatus: 'verified' },
      { sourceDocument: MANUAL, page: 29, description: 'LoRaWAN = Long Range Wide Area Network; sub-GHz; 700 km+ line-of-sight range.', verificationStatus: 'verified' },
      { sourceDocument: MANUAL, page: 12, section: 'Step One', description: 'Never power the board without the antenna attached.', verificationStatus: 'verified' },
    ],
    contentStatus: 'starter',
    notes: 'Transceiver part number is not stated in the manual — Additional research required.',
  },
  {
    id: 'c-antenna',
    slug: 'antenna',
    name: 'Wire Antenna',
    category: 'communications',
    tagline: 'A single trimmed wire — cut wrong and it can destroy the radio.',
    preAssembled: false,
    whatIsIt:
      'A single insulated wire supplied in the kit that you strip, solder to the pad near the transceiver, and trim to a precise length.',
    whyNecessary:
      'It radiates the transceiver’s RF energy. The manual is blunt: never power the board without it, or the transmitter can push power beyond safe limits and destroy the chip.',
    designRationale:
      'A simple monopole wire keeps the kit cheap, light and student-buildable. Its length must match the resonant frequency of your region’s LoRaWAN plan — 86.8 mm for Europe’s 868 MHz, 91.5 mm for US 915 MHz — a real RF trade-off between frequency, size and efficiency.',
    howItWorks:
      'Radio-frequency current from the transceiver oscillates in the wire; at the resonant length the wire radiates efficiently instead of reflecting energy back into the transmitter.',
    howItConnects:
      'Soldered to the antenna pad beside the transceiver, resting in or beside the designated hole — without protruding far through the board or shorting the nearby pads.',
    whatCanGoWrong:
      'Too short → signal reflects back and can damage the transmitter. Too long → off-resonance inefficiency. Protruding wire or solder bridges near the pads → shorts that stop the transceiver. Too much heat while soldering → melted insulation. A weak/cold joint → the antenna can break free (unfixable in orbit).',
    howWeTest:
      'Measure the trimmed length against the regional plan, tug-test the joint gently, inspect for bridges, and confirm packets arrive at the dashboard in the end-to-end test.',
    relatedModules: ['hardware-assembly', 'wireless-communication'],
    manualReferences: [
      { sourceDocument: MANUAL, page: 12, section: 'Step One', description: 'Antenna-first rule, trimming to regional base frequency, insulation strip, short risks.', verificationStatus: 'verified' },
      { sourceDocument: MANUAL, page: 14, description: 'Regional frequency plans govern ground testing; launch-program units get EU frequency + antenna work by AmbaSat engineers.', verificationStatus: 'verified' },
    ],
    contentStatus: 'starter',
  },
  {
    id: 'c-sensor',
    slug: 'sensor-daughterboard',
    name: 'Sensor Daughterboard',
    category: 'sensing',
    tagline: 'Your mission payload — one of eight sensors you choose yourself.',
    preAssembled: false,
    whatIsIt:
      'A small plug-on board carrying your chosen sensor — supplied ready for mounting on the motherboard. Options in the kit range: humidity+temperature (01), temperature (02), gas & pressure (03), ambient light (04), TVOC (05), UV (06), CO₂ emissions (07), or GPS (08, earthbound only).',
    whyNecessary:
      'The sensor is the mission: it is the instrument whose data everything else exists to collect and transmit. The manual frames the choice as yours — "this is YOUR satellite".',
    designRationale:
      'A modular daughterboard means one motherboard design serves eight different missions — a cost and flexibility trade. The GPS option is explicitly earthbound-only, an honest constraint worth remembering when planning a "real" mission.',
    howItWorks:
      'The daughterboard’s sensor element converts a physical quantity (light, gas concentration, temperature…) into an electrical signal the MCU samples over the shared connection pads, then formats into telemetry.',
    howItConnects:
      'Mounts across the top-right corner of the motherboard; its last four connection points align with the board’s pads and are pinned and soldered — flush on the rear, conical on top.',
    whatCanGoWrong:
      'Stickers left under the board prevent flush seating. Misaligned connection points mean bad or no contact. Excess rear solder ruins the flush fit the solar board needs later. Cold joints make intermittent readings.',
    howWeTest:
      'The manual’s Step Five: open the sensor’s example workspace, build, upload, and watch live readings in the PlatformIO serial terminal — e.g. sensor 03 reporting office conditions.',
    relatedModules: ['meet-the-ambasat', 'engineering-tradeoffs', 'hardware-assembly', 'reading-sensor-data', 'mission-control-dashboard'],
    manualReferences: [
      { sourceDocument: MANUAL, page: 3, description: 'The eight sensor options and the "design your own sensor" possibility.', verificationStatus: 'verified' },
      { sourceDocument: MANUAL, page: 6, description: 'Chosen sensor supplied on a ready-to-mount daughterboard.', verificationStatus: 'verified' },
      { sourceDocument: MANUAL, page: 20, section: 'Step Four', description: 'Mounting method: tape, four pins, flush rear / conical top solder finish.', verificationStatus: 'verified' },
      { sourceDocument: MANUAL, page: 26, section: 'Step Five', description: 'Sensor test workspace + serial terminal verification.', verificationStatus: 'verified' },
    ],
    contentStatus: 'starter',
  },
  {
    id: 'c-programmer',
    slug: 'programmer',
    name: 'CH340/FTDI Programmer',
    category: 'interface',
    tagline: 'The USB bridge that carries your firmware onto the satellite.',
    preAssembled: true,
    whatIsIt:
      'A small USB adapter supplied with the kit that connects your computer to the satellite’s six programming pins for coding and testing.',
    whyNecessary:
      'The MCU has no USB port of its own — the programmer is the only way to upload firmware, and it powers the board during development and testing.',
    designRationale:
      'A removable programmer is a deliberate trade: development hardware stays off the flight hardware, keeping the satellite cheaper, lighter and simpler. Windows users may need a CH340 driver (manual links a SparkFun guide).',
    howItWorks:
      'It bridges USB to the board’s serial programming interface. Its pins DTR, RXD, TXD, VCC, CTS and GND mate with the board’s GND, SS, VIN, RX, TX, DTR programming pins (G–G, VCC–VIN, RXD–TX, TXD–RX, DTR–DTR).',
    howItConnects:
      'USB side → your computer running VS Code + PlatformIO. Pin side → the six temporary programming pins on the AmbaSat-1 PCB.',
    whatCanGoWrong:
      'Miswired pin pairs cause the classic stk500_recv() "programmer not responding" error. Missing USB or a dead port yields "Please specify upload port". Windows machines may need the CH340 driver before the port appears at all.',
    howWeTest:
      'A successful PlatformIO upload (green SUCCESS) and the blinking onboard LED prove the programmer path end-to-end.',
    relatedModules: ['prepare-your-workstation', 'hardware-assembly', 'first-firmware', 'reading-sensor-data'],
    manualReferences: [
      { sourceDocument: MANUAL, page: 5, description: 'CH340/FTDI programmer connects via USB; Windows may need a CH340 driver (SparkFun guide linked).', verificationStatus: 'verified' },
      { sourceDocument: MANUAL, page: 17, section: 'Step Three', description: 'Pin-to-pin wiring between programmer and PCB.', verificationStatus: 'verified' },
      { sourceDocument: MANUAL, page: 19, section: 'Errors & Fault Finding', description: 'Upload-port and stk500_recv() failures and fixes.', verificationStatus: 'verified' },
    ],
    contentStatus: 'starter',
  },
  {
    id: 'c-pins',
    slug: 'programming-pins',
    name: 'Programming Pin Header',
    category: 'interface',
    tagline: 'Six temporary pins — your satellite’s development port.',
    preAssembled: false,
    whatIsIt:
      'Six through-hole pins you solder to the PCB’s labelled contact points: GND, SS, VIN, RX, TX and DTR.',
    whyNecessary:
      'They are the physical connector the CH340 programmer plugs into — and they also let the battery pack power the assembled board for final untethered testing.',
    designRationale:
      'They are deliberately temporary: the manual says they are removed before launch (and before the solar board is attached), which is why you solder them lightly. Temporary connectors are a classic trade — access now, mass and space saved later.',
    howItWorks:
      'Each pin carries one signal or power line between the programmer and the MCU: ground, supply (VIN), the TX/RX serial pair, DTR for reset control and SS.',
    howItConnects:
      'Soldered into the six labelled pads on the board edge; mated to the programmer wires during development, and to the battery pack for ground testing.',
    whatCanGoWrong:
      'Too much solder makes later removal hard and risks bumpiness on the rear surface. Loose or cold joints cause intermittent uploads — a listed cause of the stk500_recv() error. Removing them carelessly can lift pads.',
    howWeTest:
      'If firmware uploads succeed, the pins are doing their job. For removal practice, copper wick or a spring-loaded solder sucker cleans the joints.',
    relatedModules: ['hardware-assembly', 'first-firmware', 'integration-and-mission-review'],
    manualReferences: [
      { sourceDocument: MANUAL, page: 15, section: 'Step Two', description: 'Six pins GND/SS/VIN/RX/TX/DTR, light soldering, temporary — removed before launch.', verificationStatus: 'verified' },
    ],
    contentStatus: 'starter',
  },
  {
    id: 'c-solar',
    slug: 'solar-board',
    name: 'Solar Board & Cells',
    category: 'power',
    tagline: 'The on-orbit power supply — mounted last, tested first.',
    preAssembled: false,
    whatIsIt:
      'A rear-mounted board carrying partially assembled solar cells (cells in place) that powers the satellite in sunlight.',
    whyNecessary:
      'On orbit there is no USB port and no spare battery swap — the solar board is what turns the kit from a bench experiment into a satellite that can keep running in space.',
    designRationale:
      'Shipping the cells partially assembled keeps the most fragile work controlled, while mounting the board on the rear of the PCB drives the whole "flush solder" discipline of the build — gaps would let the cells flex and crack inside the tight 3U container.',
    howItWorks:
      'Solar cells convert sunlight into electrical power for the satellite. The manual notes a multimeter is needed to test the solar board’s voltage output once the cells are fully connected.',
    howItConnects:
      'Mounts onto the rear of the AmbaSat-1 PCB — the surface you kept flush while soldering the sensor. For rocket-kit builders, AmbaSat recommends returning the board for final checks and assembly before launch.',
    whatCanGoWrong:
      'Non-flush solder on the rear creates gaps → cells flex and break. The manual does not cover user-side wiring of the cells in detail — treat cell completion as a guided/factory step (Additional research required).',
    howWeTest:
      'Multimeter voltage check of the board’s output after the cells are fully connected (per the manual’s optional-tools note).',
    relatedModules: ['engineering-tradeoffs', 'hardware-assembly', 'integration-and-mission-review'],
    manualReferences: [
      { sourceDocument: MANUAL, page: 6, description: 'Partially assembled solar board ships with the MK-II; recommended return to AmbaSat for final checks before launch.', verificationStatus: 'verified' },
      { sourceDocument: MANUAL, page: 8, description: 'Multimeter needed to test solar board voltage output once cells are fully connected.', verificationStatus: 'verified' },
      { sourceDocument: MANUAL, page: 20, description: 'Rear flush requirement exists because the solar board mounts there.', verificationStatus: 'verified' },
    ],
    contentStatus: 'starter',
  },
  {
    id: 'c-battery',
    slug: 'battery-holder',
    name: 'Battery Holder',
    category: 'power',
    tagline: 'The ground-testing power supply for untethered runs.',
    preAssembled: true,
    whatIsIt:
      'A battery pack supplied with the kit that powers the assembled satellite without the USB programmer.',
    whyNecessary:
      'It lets you prove the whole chain — sensor → MCU → radio → gateway → dashboard — untethered, and can power the sensor on Earth where sunlight is limited.',
    designRationale:
      'A simple holder is the ground-test counterpart to the flight solar board: same board power rails, no solar dependency indoors — a pragmatic test-environment trade.',
    howItWorks:
      'Two wires feed the board: red to VIN and black to GND. Once connected, the satellite runs its flight firmware standalone and transmits over LoRaWAN.',
    howItConnects:
      'Connects to the board’s power pins (the programming-pin area used for testing), replacing the programmer as the power source for final checks.',
    whatCanGoWrong:
      'Reversed polarity (red/black swapped) risks damaging the board. Powering before the antenna is attached can still fry the transceiver — the antenna-first rule applies to battery power too.',
    howWeTest:
      'The manual’s final step: connect red→VIN, black→GND, and confirm data appears in your AmbaSat Dashboard.',
    relatedModules: ['meet-the-ambasat', 'mission-control-dashboard', 'integration-and-mission-review'],
    manualReferences: [
      { sourceDocument: MANUAL, page: 6, description: 'Battery holder enables earth-bound testing and can power the sensor where sunlight is limited.', verificationStatus: 'verified' },
      { sourceDocument: MANUAL, page: 32, description: 'Connect red→VIN, black→GND, then watch data in the AmbaSat Dashboard.', verificationStatus: 'verified' },
    ],
    contentStatus: 'starter',
  },
];

export const getComponent = (slug: string) => components.find((c) => c.slug === slug);
