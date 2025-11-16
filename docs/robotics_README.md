# Automatic Pothole Fixing Robot (README.md)

## 🤖 Pothole-Fixing Robot (Arduino + Raspberry Pi Live Stream)
An autonomous robot that detects road potholes using IR and ultrasonic sensors, aligns itself, and dumps sand using a servo. The robot also features live video streaming using a Raspberry Pi 3 B+ with 5MP Camera.

### 📸 System Overview
- Detects potholes using IR sensor layout
- Measures pothole depth using ultrasonic sensor
- Aligns itself precisely using 4-motor differential control
- Dumps sand via a servo gate
- Streams live video using Raspberry Pi 3 B+

### 🔧 Hardware Used
#### Arduino-Based Robot:
- Arduino Uno + L293D Motor Driver Shield (pluggable)
- 4× DC Motors (M1–M4)
- 4× IR Sensors (for alignment)
- 1× Ultrasonic Sensor (HC-SR04 for depth)
- 1× Servo Motor (for sand gate)
- Power supply/battery

#### Raspberry Pi for Live Streaming:
- Raspberry Pi 3 B+
- 5MP Pi Camera Module
- Wi-Fi/Ethernet for video stream

### ⚙️ Features
- Detects potholes using IR sensor layout
- Measures pothole depth using ultrasonic sensor
- Aligns itself precisely using 4-motor differential control
- Dumps sand via a servo gate
- Streams live video using Raspberry Pi 3 B+

### 🧠 Arduino Code Breakdown
#### Sensor Pins:
| Name               | Pin |
|--------------------|-----|
| IR_LEFT            | A0  |
| IR_CENTER_LEFT     | A1  |
| IR_CENTER_RIGHT    | A2  |
| IR_RIGHT           | A3  |
| Ultrasonic TRIG    | A4  |
| Ultrasonic ECHO    | A5  |

#### Motors (L293D Shield):
- M1 → IN1 & IN2
- M2 → IN3 & IN4
- M3 → IN5 & IN6
- M4 → IN7 & IN8
- ENA → PWM for M1 & M2
- ENB → PWM for M3 & M4

#### Servo:
- Connected to Pin 10 on the L293D shield (servo port)

#### Motor Control Functions (From `Upper_sensors.ino`)
- moveForward();  // All 4 motors move forward
- moveBackward(); // All 4 motors move backward
- turnLeft();     // Left motors backward, right motors forward
- turnRight();    // Left motors forward, right motors backward
- stopMoving();   // All motors stopped
- dumpSand();     // Activates servo to dump sand

### 📺 Raspberry Pi Live Stream Setup (Step-by-step)
1. Enable Camera on Raspberry Pi:
   - `sudo raspi-config` → Interface Options → Camera → Enable
   - `sudo reboot`
2. Create the Streaming Script:
   - `nano ~/start_stream.sh`
   - Paste the following code:
```bash
#!/bin/bash
WIDTH=800
HEIGHT=600
FPS=12
PORT=8080
libcamera-vid -t 0 \
  --width $WIDTH --height $HEIGHT \
  --framerate $FPS \
  --inline \
  --codec h264 \
  -o - | \
ffmpeg -i - \
  -c:v copy \
  -f mpegts \
  udp://0.0.0.0:$PORT?pkt_size=1316
```
   - Make it executable: `chmod +x ~/start_stream.sh`
3. Run the Stream:
   - `./start_stream.sh`
4. View the Stream:
   - On a client in the same network, open VLC and go to: `udp://<RPI_IP>:8080`
5. (Optional) Autostart on Boot:
   - `crontab -e` and add: `@reboot /home/pi/start_stream.sh`

### 📂 Project Files
- `Upper_sensors.ino` – Arduino logic for only sensor-based detection
- `4x293D.ino` – Arduino logic for sensor-based detection and motor control
- `start_stream.sh` – Raspberry Pi script for video streaming
- `README.md` – Full documentation and setup instructions

### 🪛 License
This project is licensed under the MIT License — free to use, modify, and distribute with attribution.

### 🙋‍♂️ Author
Created by **ABHIROOP**. Feel free to fork, star ⭐ and contribute!
