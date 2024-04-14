import statistics
from my_serial import CMD
from my_fsm import received, st_query, ST_IDLE
ST_GETTING = 0
ST_CAL_AND_SENDING = 1


class Data:
    def __init__(self) -> None:
        # state of controlled devices
        self.change_in_device = dict()
        # data get from sensors
        self.temperature = list()
        self.humidity = list()
        self.brightness = list()
        self.soil_moisture = list()

        self.is_data_valid = False  # is_data_valid = true --> can send data
        # is_data_valid = false --> can not send data
        # average value of list
        self.mean_temp = 0
        self.mean_humid = 0
        self.mean_bright = 0
        self.mean_soil = 0
        # Standard deviation value of list
        self.std_temp = 0
        self.std_humid = 0
        self.std_bright = 0
        self.std_soil = 0

    def get_all_data(self, feed_list, value_list):
        while len(feed_list) != 0:
            self.get_single_data(feed_list[0], value_list[0])
            feed_list.pop(0)
            value_list.pop(0)

    def get_single_data(self, cmd, value):
        global received, st_query, ST_IDLE
        if cmd == CMD[0]:
            self.temperature.append(value)
        elif cmd == CMD[1]:
            self.humidity.append(value)
        elif cmd == CMD[2]:
            self.soil_moisture.append(value)
        elif cmd == CMD[3]:
            self.brightness.append(value)
        elif cmd in received.keys():
            self.change_in_device[cmd] = value
            received[cmd] = True

    def calculate(self):
        try:
            self.mean_temp = statistics.mean(self.temperature)
            self.mean_bright = statistics.mean(self.brightness)
            self.mean_soil = statistics.mean(self.soil_moisture)
            self.mean_humid = statistics.mean(self.humidity)

            self.std_bright = statistics.pstdev(self.brightness)
            self.std_humid = statistics.pstdev(self.humidity)
            self.std_soil = statistics.pstdev(self.soil_moisture)
            self.std_temp = statistics.pstdev(self.temperature)

            while self.std_bright > 4:
                # remove outliers
                # recalculate mean
                # recalculate std
                
                pass
            while self.std_humid > 5:
                pass
            while self.std_soil > 5:
                pass
            while self.std_temp > 5:
                pass
            self.temperature.clear()
            self.humidity.clear()
            self.brightness.clear()
            self.soil_moisture.clear()  

        except: 
            
            print("no change in data sensor")
            pass
