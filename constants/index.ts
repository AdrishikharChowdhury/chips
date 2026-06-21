export const navigationLinks = [
  {
    href: "/library",
    label: "Library",
  },

  {
    img: "/icons/user.svg",
    selectedImg: "/icons/user-fill.svg",
    href: "/my-profile",
    label: "My Profile",
  },
];

export const adminSideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: "/admin",
    text: "Home",
  },
  {
    img: "/icons/admin/users.svg",
    route: "/admin/users",
    text: "All Users",
  },
  {
    img: "/icons/admin/book.svg",
    route: "/admin/books",
    text: "All Books",
  },
  {
    img: "/icons/admin/bookmark.svg",
    route: "/admin/book-requests",
    text: "Borrow Requests",
  },
  {
    img: "/icons/admin/user.svg",
    route: "/admin/account-requests",
    text: "Account Requests",
  },
];

export const FIELD_NAMES = {
  fullName: "Full name",
  email: "Email",
  universityId: "University ID Number",
  password: "Password",
  universityCard: "Upload University ID Card",
};

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  universityId: "number",
  password: "password",
};

export const sampleComponents = [
  {
    id: 1,
    title: "ESP32-WROOM-32",
    author: "Espressif Systems",
    genre: "Microcontroller / WiFi",
    rating: 4.6,
    total_copies: 20,
    available_copies: 10,
    description:
      "A dual-core Xtensa LX6 microcontroller with integrated WiFi and Bluetooth, ideal for IoT applications and embedded systems prototyping.",
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/3/33/Espressif_ESP-WROOM-32_Wi-Fi_%26_Bluetooth_Module.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A dual-core Xtensa LX6 microcontroller with integrated WiFi and Bluetooth, ideal for IoT applications and embedded systems prototyping.",
  },
  {
    id: 2,
    title: "Raspberry Pi 5 — 8GB",
    author: "Raspberry Pi Foundation",
    genre: "SBC / ARM64",
    rating: 4.9,
    total_copies: 99,
    available_copies: 50,
    description:
      "A high-performance single-board computer featuring a quad-core Cortex-A76 CPU, VideoCore VII GPU, and dual 4K HDMI output.",
    cover:
      "https://cdn11.bigcommerce.com/s-2fbyfnm8ev/products/2203/images/10339/RPi5-8GB__16699.1756650290.386.513.jpg?c=2",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A high-performance single-board computer featuring a quad-core Cortex-A76 CPU, VideoCore VII GPU, and dual 4K HDMI output.",
    isLoaned: true,
  },
  {
    id: 3,
    title: "LM358P Op-Amp",
    author: "Texas Instruments",
    genre: "Analog / Operational Amplifier",
    rating: 4.7,
    total_copies: 9,
    available_copies: 5,
    description:
      "A dual low-power operational amplifier with wide supply range, suitable for sensor signal conditioning and active filter circuits.",
    cover:
      "https://sigma.octopart.com/cdn-cgi/image/width=600,fit=contain,quality=85,format=auto/158888970/image/Texas-Instruments-LM358P.png",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A dual low-power operational amplifier with wide supply range, suitable for sensor signal conditioning and active filter circuits.",
  },
  {
    id: 4,
    title: "STM32F103C8T6",
    author: "STMicroelectronics",
    genre: "ARM Cortex-M3 MCU",
    rating: 4.5,
    total_copies: 78,
    available_copies: 50,
    description:
      "A 32-bit ARM Cortex-M3 microcontroller running at 72 MHz with 64 KB Flash, 20 KB SRAM, and multiple communication peripherals.",
    cover:
      "https://stm32-base.org/assets/img/boards/STM32F103C8T6_Blue_Pill-2.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A 32-bit ARM Cortex-M3 microcontroller running at 72 MHz with 64 KB Flash, 20 KB SRAM, and multiple communication peripherals.",
  },
  {
    id: 5,
    title: "HC-SR04 Ultrasonic Sensor",
    author: "Cytron Technologies",
    genre: "Sensor / Distance",
    rating: 4.7,
    total_copies: 23,
    available_copies: 23,
    description:
      "An ultrasonic distance sensor providing 2 cm to 400 cm non-contact measurement with 3 mm accuracy, widely used in robotics.",
    cover:
      "https://www.tinyosshop.com/image/cache/data/sensors/Ultrasonic/SR04-1-800x800.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "An ultrasonic distance sensor providing 2 cm to 400 cm non-contact measurement with 3 mm accuracy, widely used in robotics.",
  },
  {
    id: 6,
    title: "SSD1306 OLED Display",
    author: "Solomon Systech",
    genre: "Display / I²C / SPI",
    rating: 4.8,
    total_copies: 56,
    available_copies: 56,
    description:
      "A 128x64 monochrome OLED display driver with embedded controller, supporting both I²C and SPI interfaces for embedded projects.",
    cover:
      "https://docs.sunfounder.com/projects/umsk/en/latest/_images/27_OLED.png",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A 128x64 monochrome OLED display driver with embedded controller, supporting both I²C and SPI interfaces for embedded projects.",
  },
  {
    id: 7,
    title: "L298N Motor Driver",
    author: "STMicroelectronics",
    genre: "Driver / H-Bridge",
    rating: 4.8,
    total_copies: 25,
    available_copies: 3,
    description:
      "A dual H-bridge motor driver capable of driving two DC motors or one stepper motor with up to 2A per channel.",
    cover:
      "https://docs.sunfounder.com/projects/sf-components/en/latest/_images/l298n_introduce.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A dual H-bridge motor driver capable of driving two DC motors or one stepper motor with up to 2A per channel.",
  },
  {
    id: 8,
    title: "MCP3008-I/P",
    author: "Microchip Technology",
    genre: "ADC / SPI",
    rating: 4.8,
    total_copies: 10,
    available_copies: 5,
    description:
      "A 10-bit 8-channel analog-to-digital converter with SPI interface, ideal for reading multiple analog sensors with a digital controller.",
    cover:
      "https://roboticsdna.in/wp-content/uploads/2019/07/MCP3008-IC-ADC-Analog-to-Digital.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A 10-bit 8-channel analog-to-digital converter with SPI interface, ideal for reading multiple analog sensors with a digital controller.",
  },
  {
    id: 9,
    title: "Arduino Uno R3",
    author: "Arduino",
    genre: "Microcontroller Board",
    rating: 4.8,
    total_copies: 50,
    available_copies: 25,
    description:
      "An open-source microcontroller board based on the ATmega328P, featuring 14 digital I/O pins, 6 analog inputs, and USB connectivity for embedded projects.",
    cover:
      "https://cdn-learn.adafruit.com/assets/assets/000/002/207/original/learn_arduino_uno_r3_web.jpg?1396780454",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "An open-source microcontroller board based on the ATmega328P, featuring 14 digital I/O pins, 6 analog inputs, and USB connectivity for embedded projects.",
  },
  {
    id: 10,
    title: "BMP280",
    author: "Bosch Sensortec",
    genre: "Sensor / Pressure / Temperature",
    rating: 4.6,
    total_copies: 30,
    available_copies: 30,
    description:
      "A high-precision barometric pressure and temperature sensor module with I²C/SPI interface, ideal for weather stations and altitude sensing.",
    cover:
      "https://cdn-learn.adafruit.com/assets/assets/000/093/019/medium800/adafruit_products_BMP280_top_angle.jpg?1594316875",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A high-precision barometric pressure and temperature sensor module with I²C/SPI interface, ideal for weather stations and altitude sensing.",
  },
  {
    id: 11,
    title: "74HC595",
    author: "Texas Instruments",
    genre: "Digital / Shift Register",
    rating: 4.7,
    total_copies: 40,
    available_copies: 40,
    description:
      "An 8-bit serial-in, parallel-out shift register with latched outputs, commonly used to expand digital outputs on microcontrollers.",
    cover:
      "https://cdn-learn.adafruit.com/assets/assets/000/092/546/original/adafruit_products_74HC595.jpg?1593196787",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "An 8-bit serial-in, parallel-out shift register with latched outputs, commonly used to expand digital outputs on microcontrollers.",
  },
  {
    id: 12,
    title: "WS2812B NeoPixel",
    author: "WorldSemi",
    genre: "LED / Addressable RGB",
    rating: 4.9,
    total_copies: 100,
    available_copies: 100,
    description:
      "An intelligent control RGB LED with integrated driver IC, featuring daisy-chainable single-wire communication for individual pixel control.",
    cover:
      "https://cdn.sparkfun.com/assets/parts/1/5/0/6/3/16347-SMD_LED_-_RGB_WS2812B__Whole_Reel_-01.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "An intelligent control RGB LED with integrated driver IC, featuring daisy-chainable single-wire communication for individual pixel control.",
  },
  {
    id: 13,
    title: "IRF520",
    author: "Infineon Technologies",
    genre: "MOSFET / Power Driver",
    rating: 4.5,
    total_copies: 35,
    available_copies: 35,
    description:
      "An N-channel power MOSFET module capable of switching loads up to 100V / 9.2A, commonly used for motor and solenoid control with microcontrollers.",
    cover:
      "https://ewall.com.pk/images/product_imgs/494/d93b041788568b71b3daaeff12b91bf74ddc38ad.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "An N-channel power MOSFET module capable of switching loads up to 100V / 9.2A, commonly used for motor and solenoid control with microcontrollers.",
  },
  {
    id: 14,
    title: "1N4007",
    author: "onsemi",
    genre: "Diode / Rectifier",
    rating: 4.6,
    total_copies: 200,
    available_copies: 200,
    description:
      "A general-purpose silicon rectifier diode rated for 1000V reverse voltage and 1A forward current, widely used in power supply circuits.",
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/a/ad/1N4007_Diode_1480378_79_80_HDR_Enhancer_cr.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A general-purpose silicon rectifier diode rated for 1000V reverse voltage and 1A forward current, widely used in power supply circuits.",
  },
  {
    id: 15,
    title: "DHT22",
    author: "Aosong Electronics",
    genre: "Sensor / Temperature / Humidity",
    rating: 4.7,
    total_copies: 45,
    available_copies: 45,
    description:
      "A precision digital temperature and humidity sensor with single-wire interface, offering ±0.5°C accuracy and 2–100% RH range for environmental monitoring.",
    cover:
      "https://cdn11.bigcommerce.com/s-2fbyfnm8ev/images/stencil/1280x1280/products/302/1446/1451806-11-433x4331__93626.1539996096.jpg?c=2",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A precision digital temperature and humidity sensor with single-wire interface, offering ±0.5°C accuracy and 2–100% RH range for environmental monitoring.",
  },
];
