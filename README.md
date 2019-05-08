# rasproximity
Give a man a Pi, a wirelessly controlled door lock, and an iPhone.

What do you get?

A proximity based auto-unlocking door.

# What?
The door on my dorm room is unlocked via a card tap (NFC).

It is also unlockable via a web interface.

I have a Raspberry Pi 3 provided by my institute (I never used it personally...).

# Why?
Because I am not a simpleton, I want my door to unlock for me. Why should I have to take my wallet out of my pocket?

(Also because why not, it was fun!)

# How?
Currently it is written in 2 languages: Python3 & Node.JS.

Node.JS runs [puppeteer](https://github.com/GoogleChrome/puppeteer) to automate logging in to the door controller service and to submit unlock door requests.

Python3 uses [bluetooth-proximity](https://github.com/FrederikBolding/bluetooth-proximity) to generate a constant stream of Bluetooth RSSI (Received Signal Strength Indication) data from a given set of Bluetooth MAC addresses. (Without pairing/connecting! There are no delays!)

# Setup:
- [bluetooth-proximity](https://github.com/FrederikBolding/bluetooth-proximity) and dependencies.
- [node-pty](https://github.com/Microsoft/node-pty) and dependencies.
- For installation of puppeteer on a Raspberry Pi see [this](https://github.com/GoogleChrome/puppeteer/issues/550#issuecomment-463665922) link.
- To get an iPhone to be detected in BLE run these following commands on your Pi:
> hciconfig hci0 up

> hciconfig hci0 leadv 0


# Extra Info:
- This project was honestly a bit harder than expected (to get minute things working) but didn't take more than a day to fully develop.
- I wanted to stick with one language, but
  1) I don't understand Bluetooth deeply enough. The only connectionless RSSI program that worked with iOS (without having to open the Bluetooth settings, to let the device be "found".) was written in Python2.7, and forked to work with Python3.
  2) [Puppeteer](https://github.com/GoogleChrome/puppeteer) in Node.JS is ***far*** more stable and fluid than selenium and BeautifulSoup4.
  - So I just combined the two instead using [node-pty](https://github.com/Microsoft/node-pty).
- I am *very* sure improvements can be made.
- This development is highly specialized. It may not work for your device/institution/service.
