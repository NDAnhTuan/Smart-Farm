# this is server Connection module by paho-mqtt
from my_parameters import *
import paho.mqtt.client as mqtt
import sys
from my_data import Data


class Server:
    # Some config paras
    AIO_FEEDS = ''
    AIO_USERNAME = ''
    AIO_KEY = ''
    AIO_HOST = str()
    client = None
    buffer = str()
    self_publish = 0
    received = False
    # The callback for when the client receives a CONN_ACK response from the server.

    def published(self, client, userdata, mid):
        print("published successfully mid: ", mid)

    def connected(self, client, user_data, flags, rc):
        # Connected function will be called when the client is connected to server
        if (rc == 0):
            print('Successfully connecting to the server')
        else:
            print("connecting to the server fail")
        for topic in LIST_OF_FEEDS:
            client.subscribe(f'{self.AIO_USERNAME}/feeds/{topic}')

    def publish_data(self, my_data: Data):
        self.client.publish(
            f'{self.AIO_USERNAME}/feeds/{LIST_OF_FEEDS[4]}', my_data.mean_bright)
        self.client.publish(
            f'{self.AIO_USERNAME}/feeds/{LIST_OF_FEEDS[5]}', my_data.mean_humid)
        self.client.publish(
            f'{self.AIO_USERNAME}/feeds/{LIST_OF_FEEDS[6]}', my_data.mean_soil)
        self.client.publish(
            f'{self.AIO_USERNAME}/feeds/{LIST_OF_FEEDS[3]}', my_data.mean_temp)
        return

    def subscribed(self, client, user_data, mid, granted_qos):
        # This method is called when the client subscribes to a new feed.
        print('Subscribed successfully to {0} with QoS {1}'.format(
            mid, granted_qos[0]))

    # The callback for when a  message is received from the server.

    def message(self, client, user_data, msg):
        # The feed_id parameter identifies the feed, and the payload parameter has
        # the new value.
        data = msg.payload
        # decode payload from bytes to string
        data = data.decode('utf-8')
        print(f'Feed {msg.topic} received new value: {data}')
        if msg.topic.split('/')[2] in LIST_OF_FEEDS[0:3]:
            print("in message")
            if self.self_publish == 0:
                if "fan" in msg.topic:
                    cmd = data
                elif "hose" in msg.topic:
                    cmd = int(data) + 4
                elif "light" in msg.topic:
                    cmd = int(data) + 6
                self.buffer = f'!control:{cmd}#'
                print(self.buffer)
                self.received = True
            elif self.self_publish > 0:
                self.self_publish -= 1

    def update_change_in_device(self, my_data: Data):
        for x in my_data.change_in_device:
            if x == "LED":
                self.client.publish(
                    f'{self.AIO_USERNAME}/feeds/{LIST_OF_FEEDS[2]}', my_data.change_in_device[x])
                self.self_publish += 1
            elif x == "FAN":
                self.client.publish(
                    f'{self.AIO_USERNAME}/feeds/{LIST_OF_FEEDS[0]}', my_data.change_in_device[x])
                self.self_publish += 1
            elif x == "PUMP":
                self.client.publish(
                    f'{self.AIO_USERNAME}/feeds/{LIST_OF_FEEDS[1]}', my_data.change_in_device[x])
                self.self_publish += 1

        my_data.change_in_device.clear()

    def disconnected(self, client, user_data, rc):
        # Disconnected function will be called when the client disconnects.
        print('Disconnected from server')
        sys.exit(1)

    def __init__(self, list_of_feeds: list, host: str, user: str, password: str):
        self.AIO_HOST = host
        self.AIO_USERNAME = user
        self.AIO_KEY = password

        self.client = mqtt.Client()
        # Enter credentials
        self.client.username_pw_set(self.AIO_USERNAME, self.AIO_KEY)

        self.client.on_connect = self.connected
        self.client.on_message = self.message
        self.client.on_subscribe = self.subscribed
        self.client.on_publish = self.published
        self.client.connect(host=self.AIO_HOST, port=1883, keepalive=60)

        self.client.loop_start()
        # client loop forever is suitable for subscribe-only processes


server_gateway = Server(LIST_OF_FEEDS, HOST, USER, PASSWORD)

# for testing
# while True:
#     pass
