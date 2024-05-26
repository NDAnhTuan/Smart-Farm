import time
import my_os
import my_ai
from my_processes import *
if True:
    time.sleep(2)
    timer = 3000
    # processes run every 10 ms
    my_os.operation_system.add_process(process_fsm_control, 0, 1)
    my_os.operation_system.add_process(process_fsm_query, 0, 1)
    my_os.operation_system.add_process(process_publish_device, 0, 1)
    my_os.operation_system.add_process(process_read_serial, 0, 1)
    # processes run every 30 s
    my_os.operation_system.add_process(process_publish_data, 3000, 3000)
    # processes run every 1 hour
    my_os.operation_system.add_process(
        my_ai.temperature_model.retrain, 360000, 360000)
    my_os.operation_system.add_process(
        my_ai.humidity_model.retrain, 360000, 360000)
    my_os.operation_system.add_process(
        my_ai.brightness_model.retrain, 360000, 360000)
    my_os.operation_system.add_process(
        my_ai.soil_model.retrain, 360000, 360000)
    cnt = 0
while True:
    my_os.operation_system.dispatch_process()
    if cnt % 100 == 0:
        print("#", cnt/100)
    time.sleep(0.01)

    cnt += 1
