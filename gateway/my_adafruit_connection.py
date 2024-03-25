# this is Adafruit Connection module by paho-mqtt
import paho.mqtt.client as mqtt
import sys
from my_data import Data


class AdafruitConnection:
    # Some config paras
    AIO_FEED_NAMES = ['aiot-brightness',
                      'aiot-humidity',
                      'aiot-soil-moisture',
                      'aiot-temperature',
                      'aiot-led',
                      'aiot-pump',
                      'aiot-fan',
                      'aiot-connection']
    AIO_USERNAME = 'lamphat'
    AIO_KEY = ''
    AIO_HOST = 'io.adafruit.com'
    client = None
    buffer = str()
    self_publish = 0
    received = False
    # The callback for when the client receives a CONN_ACK response from the server.

    def connected(self, client, user_data, flags, rc):
        # Connected function will be called when the client is connected to Adafruit IO.
        if (rc == 0):
            print('Successfully connecting to the server')
        else:
            print("connecting to the server fail")
        for topic in self.AIO_FEED_NAMES:
            client.subscribe(f'{self.AIO_USERNAME}/feeds/{topic}')

    def subscribed(self, client, user_data, mid, granted_qos):
        # This method is called when the client subscribes to a new feed.
        print('Subscribed successfully to {0} with QoS {1}'.format(
            self.AIO_FEED_NAMES[mid-1], granted_qos[0]))

    # The callback for when a  message is received from the server.

    def message(self, client, user_data, msg):
        # The feed_id parameter identifies the feed, and the payload parameter has
        # the new value.
        data = msg.payload
        # decode payload from bytes to string
        data = data.decode('utf-8')
        print(f'Feed {msg.topic} received new value: {data}')
        feed = msg.topic.split('/')
        if feed[2] in self.AIO_FEED_NAMES[4:6+1]:
            if self.self_publish == 0:
                if feed[2] == 'aiot-fan':
                    cmd = data
                elif feed[2] == 'aiot-led':
                    cmd = int(data) + 4
                else:
                    cmd = int(data) + 6
                self.buffer = f'!control:{cmd}#'
                print(self.buffer)
                self.received = True
            elif self.self_publish > 0:
                self.self_publish -= 1

    def disconnected(self, client, user_data, rc):
        # Disconnected function will be called when the client disconnects.
        print('Disconnected from Adafruit IO!')
        sys.exit(1)

    def publish_data(self, my_data: Data):
        self.client.publish(
            f'{self.AIO_USERNAME}/feeds/{self.AIO_FEED_NAMES[0]}', my_data.mean_bright)
        self.client.publish(
            f'{self.AIO_USERNAME}/feeds/{self.AIO_FEED_NAMES[1]}', my_data.mean_humid)
        self.client.publish(
            f'{self.AIO_USERNAME}/feeds/{self.AIO_FEED_NAMES[2]}', my_data.mean_soil)
        self.client.publish(
            f'{self.AIO_USERNAME}/feeds/{self.AIO_FEED_NAMES[3]}', my_data.mean_temp)
        return

    def update_change_in_device(self, my_data: Data):
        for x in my_data.change_in_device:
            if x == "LED":
                self.client.publish(
                    f'{self.AIO_USERNAME}/feeds/{self.AIO_FEED_NAMES[4]}', my_data.change_in_device[x])
                self.self_publish += 1
            elif x == "FAN":
                self.client.publish(
                    f'{self.AIO_USERNAME}/feeds/{self.AIO_FEED_NAMES[6]}', my_data.change_in_device[x])
                self.self_publish += 1
            elif x == "PUMP":
                self.client.publish(
                    f'{self.AIO_USERNAME}/feeds/{self.AIO_FEED_NAMES[5]}', my_data.change_in_device[x])
                self.self_publish += 1

        my_data.change_in_device.clear()

    def __init__(self):
        self.client = mqtt.Client()
        # Enable TLS and use port 8883
        self.client.tls_set_context()
        # Enter Adafruit IO credentials
        self.client.username_pw_set(self.AIO_USERNAME, self.AIO_KEY)

        self.client.on_connect = self.connected
        self.client.on_message = self.message
        self.client.on_subscribe = self.subscribed
        self.client.connect(host=self.AIO_HOST, port=8883, keepalive=60)

        self.client.loop_start()
        # client loop forever is suitable for subscribe-only processes


# for testing
# import random
# temp = AdafruitConnection()
# while True:
#     value = random.randint(0, 1)
#     print(f'Publishing {value} to {temp.AIO_FEED_NAMES[0]}.')
#     temp.client.publish(f'{temp.AIO_USERNAME}/feeds/{temp.AIO_FEED_NAMES[0]}', value)
#     time.sleep(10)
