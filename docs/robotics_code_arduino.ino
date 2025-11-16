#include <Servo.h>

Servo sandGate;

void setup() {
  sandGate.attach(10); // Servo on pin 10
  // ...other setup code...
}

void loop() {
  // Example: Dump sand
  dumpSand();
  delay(2000);
}

void dumpSand() {
  sandGate.write(90); // Open gate
  delay(1000);
  sandGate.write(0);  // Close gate
}
// ...rest of Arduino code...
