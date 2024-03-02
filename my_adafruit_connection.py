# this is Adafruit Connection module by paho-mqtt
import paho.mqtt.client as mqtt
import time
import sys


class AdafruitConnection:
    # Some config paras
    AIO_FEED_NAMES = ['iot-pump', 'iot-led', 'iot-brightness',
                      'iot-humidity', 'iot-temperature', 'iot-ai']
    AIO_USERNAME = 'kido2k3'
    AIO_KEY = 'aio_xaXF90SoDr4xIkhtgtaAoe55O9Z1'
    client = None

    # The callback for when the client receives a CONN_ACK response from the server.
    def connected(self, client, user_data, flags, rc):
        # Connected function will be called when the client is connected to Adafruit IO.
        print('Connected to Adafruit IO!')
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

    def disconnected(self, client, user_data, rc):
        # Disconnected function will be called when the client disconnects.
        print('Disconnected from Adafruit IO!')
        sys.exit(1)

    def __init__(self):
        self.client = mqtt.Client()
        # Enable TLS and use port 8883
        self.client.tls_set_context()
        # Enter Adafruit IO credentials
        self.client.username_pw_set(self.AIO_USERNAME, self.AIO_KEY)

        self.client.on_connect = self.connected
        self.client.on_message = self.message
        self.client.on_subscribe = self.subscribed

        self.client.connect(host='io.adafruit.com', port=8883, keepalive=60)

        self.client.loop_start()
        # client loop forever is suitable for subscribe-only processes

        # wait 2s for the connection to AFruit server before pub-sub tasks
        time.sleep(2)

# for testing
# import random
# temp = AdafruitConnection()
# while True:
#     value = random.randint(0, 1)
#     print(f'Publishing {value} to {temp.AIO_FEED_NAMES[0]}.')
#     temp.client.publish(f'{temp.AIO_USERNAME}/feeds/{temp.AIO_FEED_NAMES[0]}', value)
#     time.sleep(10)
