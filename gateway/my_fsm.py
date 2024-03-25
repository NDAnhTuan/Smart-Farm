from my_serial import UART
# the state of communication
ST_IDLE = 0
ST_SENDING = 1
ST_WAITING = 2
# some variables
st_query = ST_IDLE
timer_query = 1200  # 12s
timer_wait_query = 300  # 3s
received = {
    "LED": False,
    "FAN": False,
    "PUMP": False
}
cnt_query = 0


def fsm_query(my_serial: UART):
    global st_query, timer_query, timer_wait_query, received, cnt_query
    # print(st_query)
    if st_query == ST_IDLE:
        timer_query -= 1
        if timer_query <= 0:
            for id in list(received.keys()):
                received[id] = False
            st_query = ST_SENDING
    elif st_query == ST_SENDING:
        if received["LED"] == False:
            my_serial.query("LED")
        if received["FAN"] == False:
            my_serial.query("FAN")
        if received["PUMP"] == False:
            my_serial.query("PUMP")
        if False in list(received.values()):
            timer_wait_query = 300
            st_query = ST_WAITING
        else:
            timer_query = 1200
            st_query = ST_IDLE
    elif st_query == ST_WAITING:
        timer_wait_query -= 1
        if timer_wait_query <= 0:
            cnt_query += 1
            st_query = ST_SENDING
        elif False not in list(received.values()):
            cnt_query = 0
            timer_query = 1200
            st_query = ST_IDLE
        elif cnt_query == 3:
            cnt_query = 0
            timer_query = 1200
            st_query = ST_IDLE
            print("There is something wrong in serial")
        pass
    else:
        pass


# some variables
st_control = ST_IDLE
timer_wait_control = 150  # 1.5s
cnt_control = 0


def fsm_control(my_server, my_serial: UART):
    global st_control, timer_wait_control, cnt_control

    if st_control == ST_IDLE:
        if my_server.received == True:
            st_control = ST_SENDING
    elif st_control == ST_SENDING:
        my_serial.check_connection = False
        my_serial.send_data(my_server.buffer)
        if my_serial.check_connection == True:
            my_server.received = False
            st_control = ST_IDLE
            cnt_control = 0
        else:
            timer_wait_control = 150
            st_control = ST_WAITING
    elif st_control == ST_WAITING:
        timer_wait_control -= 1
        if my_serial.check_connection == True:
            cnt_control = 0
            my_server.received = False
            st_control = ST_IDLE
        elif timer_wait_control <= 0:
            cnt_control += 1
            st_control = ST_SENDING
        elif cnt_control >= 3:
            print("THERE IS SOME WRONG IN SERIAL")
            my_server.received = False
            st_control = ST_IDLE
            cnt_control = 0
    else:
        pass
