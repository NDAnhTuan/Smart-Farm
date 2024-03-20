import random
import time
from my_adafruit_connection import AdafruitConnection
from my_serial import UART
from my_data import SensorData

if True:
    timer = 100
    my_server = AdafruitConnection()
    my_data = SensorData()

pre_res = None
while True:
    timer -= 1
    if my_server.client.is_connected() == True:
        if timer <= 0:
            timer = 500
            # send a random data every 10s
            value = random.randint(0, 1)
            publish = my_server.client.publish(f'{my_server.AIO_USERNAME}/groups/aiot',value)
            if publish.rc == 0:
                print(f'Publishing {value}')
    else:
        pass
    time.sleep(0.01)

