from bt_proximity import BluetoothRSSI
import time

BT_ADDR = 'MAC_ADDRESS_HERE'

def main():
    btrssi = BluetoothRSSI(addr=BT_ADDR)
    while True:
        rssi = btrssi.request_rssi()
        if rssi:
            print (rssi[0])
        time.sleep(1)

if __name__ == '__main__':
    main()
