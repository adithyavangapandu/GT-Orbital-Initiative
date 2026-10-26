import type { LessonContent } from '../../types';

export const m06: LessonContent = {
  moduleId: 'm06',
  why: 'A sensor you cannot read is dead weight. Step 5 of the manual closes the loop opened in Module 04: the sensor is soldered, now prove it produces data. The serial terminal test is also your first experience of *telemetry on the bench* — the same readings will later travel by radio.',
  coreConcepts: [
    {
      heading: 'Sensor test via serial terminal',
      body: 'With the programmer still wired as in Module 05, run the manual\'s sensor test (Step 5, pp. 26–28): open the sensor\'s test sketch, build, upload, then watch the readings stream into the serial monitor. Each of the eight sensors has its own section and expected output.',
      callout: {
        kind: 'tip',
        title: 'Exercise the sensor',
        text: 'Make the value change — cover the light sensor, warm the temperature sensor, breathe near the gas sensor. Static-looking data can hide a dead channel.',
      },
    },
    {
      heading: 'From raw values to meaning',
      body: 'Serial output is the firmware\'s truth, not yet a mission product. Start asking the questions engineers ask: what are the units? What is a sane range? How often does it sample? These answers feed directly into the payload you will design in Module 07.',
    },
    {
      heading: 'Data flow preview',
      body: 'What you are watching is the first five runtime stages of the Telemetry Journey — execute → request → sense → (soon) package → transmit. The Engineering Lab\'s [Telemetry Journey](/lab/telemetry-journey) shows where your serial readings would go next.',
    },
  ],
  interactive: {
    title: 'Sensor serial console',
    plannedExperience:
      'A simulated serial terminal where you "upload" a sensor sketch and watch realistic readings stream — with prompts to perturb the sensor and predict the change.',
    visualizationType: 'serial-console',
  },
  handsOn: [
    {
      title: 'Run the sensor test sketch',
      domain: 'software',
      body: 'Build and upload your sensor\'s test sketch (manual Step 5, pp. 26–28), open the serial monitor, and confirm live readings.',
      manualReference: 'Manual pp. 26–28',
    },
    {
      title: 'Perturb and verify',
      domain: 'hardware',
      body: 'Deliberately change the physical stimulus (light, temperature, breath, motion) and confirm the reading moves in the expected direction. Record one example before/after pair.',
    },
    {
      title: 'Record a calibration note',
      body: 'Write down what "normal" looks like for your sensor in your environment — baseline value, units, and sample rate. This is the start of your calibration record.',
    },
  ],
  troubleshooting: [
    {
      symptom: 'Serial monitor shows nothing',
      possibleCauses: ['Baud rate mismatch', 'Board not running the test sketch', 'Loose programmer connection'],
      suggestions: [
        'Match the baud rate the sketch sets (check `Serial.begin`)',
        'Re-upload and watch the upload log for verify errors',
        'Re-seat the programmer on the temporary pins',
      ],
    },
    {
      symptom: 'Readings present but frozen / nonsensical',
      possibleCauses: ['Sensor pads incompletely joined', 'Wrong sensor sketch variant'],
      suggestions: [
        'Re-check the daughterboard solder joins against manual pp. 20–25',
        'Confirm the sketch matches your exact sensor number (01–08)',
      ],
    },
  ],
  nextModuleNote: 'Data on the bench works. Module 07 sends it over the air: LoRaWAN, keys, payload format, and the flight code.',
};
