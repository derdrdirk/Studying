#include "Arduino.h"

#ifndef LED_BUILTIN
#define LED_BUILTIN 13
#endif

void setup()
{
  Serial.begin(9600);
  Serial.println("Starting...");
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop()
{
  digitalWrite(LED_BUILTIN, HIGH);

  delay(1000);
  Serial.println("running...");

  digitalWrite(LED_BUILTIN, LOW);

  delay(1000);
}
