import time
from my_adafruit_connection import AdafruitConnection
from my_serial import UART
from my_data import Data
from my_fsm import fsm_query


if True:
    timer = 1
    my_server = AdafruitConnection()
    my_data = Data()
    my_serial = UART()

while True:
    fsm_query()
    if my_serial.port_error == False:
        my_serial.ReadSerial()
        my_data.get_all_data(feed_list=my_serial.feed_list, value_list=my_serial.value_list)

    timer -= 1
    if timer <= 0:
        # every 30s, do something
        my_data.calculate() #
        if my_server.client.is_connected() == True:
            # send a random data every 30s
            my_server.publish_data(my_data=my_data)
        else:
            print("publish data fail")
        timer = 3000
    time.sleep(0.01)