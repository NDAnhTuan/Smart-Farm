import time
import my_os
from my_processes import *
if True:
    time.sleep(2)
    timer = 3000
    # processes run every 10 ns
    my_os.operation_system.add_process(process_fsm_control, 0, 1)
    my_os.operation_system.add_process(process_fsm_query, 0, 1)
    my_os.operation_system.add_process(process_publish_device, 0, 1)
    my_os.operation_system.add_process(process_read_serial, 0, 1)
    # processes run every 30 s
    my_os.operation_system.add_process(process_publish_data, 3000, 3000)

    cnt = 0
while True:
    my_os.operation_system.dispatch_process()
    if cnt % 100 == 0:
        print("#", cnt/100)
    time.sleep(0.01)
    
    cnt += 1


# while True:
#     fsm_query(my_serial)
#     fsm_control(my_server=server_gateway, my_serial=my_serial)
#     if my_serial.port_error == False:
#         my_serial.ReadSerial()
#         my_data.get_all_data(feed_list=my_serial.feed_list,
#                              value_list=my_serial.value_list)

#     if len(my_data.change_in_device) != 0:
#         # print(my_data.change_in_device)
#         if server_gateway.client.is_connected() == True:
#             server_gateway.update_change_in_device(my_data=my_data)
#         else:
#             my_data.change_in_device.clear()
#             print("publish data fail")

#     timer -= 1
#     if timer <= 0:
#         # every 30s, do something
#         my_data.calculate()
#         if server_gateway.client.is_connected() == True:
#             # send a random data every 30s
#             server_gateway.publish_data(my_data=my_data)
#         else:
#             print("publish data fail")
#         timer = 3000
#     time.sleep(0.01)
