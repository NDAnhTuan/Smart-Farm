import time
from my_adafruit_connection import AdafruitConnection
from my_serial import UART
from my_data import Data
from my_fsm import fsm_query, fsm_control


if True:
    timer = 3000
    my_server = AdafruitConnection()
    my_data = Data()
    my_serial = UART()

while True:
    fsm_query(my_serial)
    fsm_control(my_server=my_server, my_serial=my_serial)
    if my_serial.port_error == False:
        my_serial.ReadSerial()
        my_data.get_all_data(feed_list=my_serial.feed_list,
                             value_list=my_serial.value_list)

    if len(my_data.change_in_device) != 0:
        # print(my_data.change_in_device)
        if my_server.client.is_connected() == True:
            my_server.update_change_in_device(my_data=my_data)
        else:
            my_data.change_in_device.clear()
            print("publish data fail")

    timer -= 1
    if timer <= 0:
        # every 30s, do something
        my_data.calculate()
        if my_server.client.is_connected() == True:
            # send a random data every 30s
            my_server.publish_data(my_data=my_data)
        else:
            print("publish data fail")
        timer = 3000
    time.sleep(0.01)
