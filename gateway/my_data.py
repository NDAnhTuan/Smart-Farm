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

            self.temperature.sort()
            self.brightness.sort()
            self.soil_moisture.sort()
            self.humidity.sort()

            q1,_,q3 = statistics.quantiles(self.brightness)
            iqr = q3 - q1

            while self.std_bright > 5 and (self.brightness[0] < q1 - iqr * 1.5 or self.brightness[-1] > q3 + iqr * 1.5):
                if ((q1 - iqr * 1.5) - self.brightness[0]) < (self.brightness[-1] - (q3 + iqr * 1.5)):
                    self.brightness.pop(-1)
                else:
                    self.brightness.pop(0)
                self.std_bright = statistics.pstdev(self.brightness)

                q1,_,q3 = statistics.quantiles(self.brightness)
                iqr = q3 - q1
                
            self.mean_bright = statistics.mean(self.brightness)

            q1,_,q3 = statistics.quantiles(self.humidity)
            iqr = q3 - q1

            while self.std_humid > 10 and (self.humidity[0] < q1 - iqr * 1.5 or self.humidity[-1] > q3 + iqr * 1.5):
                if ((q1 - iqr * 1.5) - self.humidity[0]) < (self.humidity[-1] - (q3 + iqr * 1.5)):
                    self.humidity.pop(-1)
                else:
                    self.humidity.pop(0)
                self.std_humid = statistics.pstdev(self.humidity)
                
                q1,_,q3 = statistics.quantiles(self.humidity)
                iqr = q3 - q1
                
            self.mean_humid = statistics.mean(self.humidity)

            q1,_,q3 = statistics.quantiles(self.soil_moisture)
            iqr = q3 - q1

            while self.std_soil > 0.2 and (self.soil_moisture[0] < q1 - iqr * 1.5 or self.soil_moisture[-1] > q3 + iqr * 1.5):
                if ((q1 - iqr * 1.5) - self.soil_moisture[0]) < (self.soil_moisture[-1] - (q3 + iqr * 1.5)):
                    self.soil_moisture.pop(-1)
                else:
                    self.soil_moisture.pop(0)
                self.std_soil = statistics.pstdev(self.soil_moisture)
                
                q1,_,q3 = statistics.quantiles(self.soil_moisture)
                iqr = q3 - q1
                
            self.mean_soil = statistics.mean(self.soil_moisture)

            q1,_,q3 = statistics.quantiles(self.temperature)
            iqr = q3 - q1

            while self.std_temp > 0.8 and (self.temperature[0] < q1 - iqr * 1.5 or self.temperature[-1] > q3 + iqr * 1.5):
                if ((q1 - iqr * 1.5) - self.temperature[0]) < (self.temperature[-1] - (q3 + iqr * 1.5)):
                    self.temperature.pop(-1)
                else:
                    self.temperature.pop(0)
                self.std_temp = statistics.pstdev(self.temperature)
                
                q1,_,q3 = statistics.quantiles(self.temperature)
                iqr = q3 - q1
                
            self.mean_temp = statistics.mean(self.temperature)

        except: 
            
            print("no change in data sensor")
            pass

my_data = Data()