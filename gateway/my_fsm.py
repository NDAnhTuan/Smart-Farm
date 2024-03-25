from my_serial import UART
# the state of communication
ST_IDLE = 0
ST_SENDING = 1
ST_WAITING = 2
#some variables
st_query = ST_IDLE
timer_query = 1000 # 10s
timer_wait_query = 300 # 3s
received = {
    "LED": False,
    "FAN": False,
    "PUMP": False
}
cnt_query = 0
def fsm_query(my_serial: UART):
    global st_query, timer_query,timer_wait_query, received, cnt_query
    print(st_query)
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
            timer_query = 1000
            st_query = ST_IDLE
    elif st_query == ST_WAITING:
        timer_wait_query -= 1
        if timer_wait_query <= 0:
            cnt_query += 1
            st_query = ST_SENDING
        elif False not in list(received.values()):
            cnt_query = 0
            timer_query = 1000
            st_query = ST_IDLE
        elif cnt_query == 3:
            cnt_query = 0
            timer_query = 1000
            st_query = ST_IDLE
            print("There is something wrong in serial")
        pass
    else:
        pass