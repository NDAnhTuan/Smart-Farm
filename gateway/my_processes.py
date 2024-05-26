from my_fsm import fsm_query, fsm_control
from my_serial import my_serial
from my_server import server_gateway
from my_data import my_data


def process_fsm_query():
    fsm_query(my_serial)


def process_fsm_control():
    fsm_control(my_server=server_gateway, my_serial=my_serial)


def process_read_serial():
    if my_serial.port_error == False:
        my_serial.ReadSerial()
        my_data.get_all_data(feed_list=my_serial.feed_list,
                             value_list=my_serial.value_list)


def process_publish_device():
    if len(my_data.change_in_device) != 0:
        # print(my_data.change_in_device)
        if server_gateway.client.is_connected() == True:
            server_gateway.update_change_in_device(my_data=my_data)
        else:
            my_data.change_in_device.clear()
            print("publish data fail")


def process_publish_data():
    my_data.calculate()
    if server_gateway.client.is_connected() == True and my_data.is_data_valid == True:
        # send data every 30s
        server_gateway.publish_data(my_data=my_data)
    else:
        print("publish data fail")
