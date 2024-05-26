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
            # print("in get all data")
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

    def remove_outlier(self, cmd):
        sample_std = 0
        arr = []
        match cmd:
            case 'bright':
                arr = self.brightness
                sample_std = 5
                
            case 'humid':
                arr = self.humidity
                sample_std = 10
                
            case 'soil':
                arr = self.soil_moisture
                sample_std = 0.2
                
            case 'temp':
                arr = self.temperature
                sample_std = 0.8

        arr.sort()
        std = statistics.pstdev(arr)

        q1, _, q3 = statistics.quantiles(arr)
        iqr = q3 - q1
        # print(arr)
        while std > sample_std and (arr[0] < q1 - iqr * 1.5 or arr[-1] > q3 + iqr * 1.5):
            if ((q1 - iqr * 1.5) - arr[0]) < (arr[-1] - (q3 + iqr * 1.5)):
                arr.pop(-1)
            else:
                arr.pop(0)
            
            # print(q1)
            # print(q3)
            # print(q1 - iqr * 1.5)
            # print(q3 + iqr * 1.5)
            # print(std)
            # print(arr)
            std = statistics.pstdev(arr)

            q1, _, q3 = statistics.quantiles(arr)
            iqr = q3 - q1

        match cmd:
            case 'bright':
                self.mean_bright = round(statistics.mean(arr), 2)
                self.std_bright = std
                self.brightness = arr
                
            case 'humid':
                self.mean_humid = round(statistics.mean(arr), 2)
                self.std_humid = std
                self.humidity = arr
                
            case 'soil':
                self.mean_soil = round(statistics.mean(arr), 2)
                self.std_soil = std
                self.soil_moisture = arr
                
            case 'temp':
                self.mean_temp = round(statistics.mean(arr), 2)
                self.std_temp = std
                self.temperature = arr


    def calculate(self):
        # print(self.temperature)
        try:
            if len(self.temperature) == 1:
                self.temperature.append(self.temperature[0])
            if len(self.humidity) == 1:
                self.humidity.append(self.humidity[0])
            if len(self.brightness) == 1:
                self.brightness.append(self.brightness[0])
            if len(self.soil_moisture) == 1:
                self.soil_moisture.append(self.soil_moisture[0])
            self.is_data_valid = True

            self.remove_outlier('bright')
            self.remove_outlier('humid')
            self.remove_outlier('soil')
            self.remove_outlier('temp')

            self.temperature.clear()
            self.humidity.clear()
            self.brightness.clear()
            self.soil_moisture.clear()

        except:
            self.is_data_valid = False
            print("no change in data sensor")
            pass


my_data = Data()


# feed_list = ["TEMP", "HUMID", "TEMP", "HUMID", "SOIL", "BRIGHT"]
# value_list = [34, 87,]

# CMD = ["TEMP", "HUMID", "SOIL", "BRIGHT", "LED", "FAN", "PUMP", "control"]
# for test
feed_list = ["TEMP", "TEMP", "TEMP","HUMID", "HUMID", "HUMID","TEMP", "HUMID", "TEMP", "HUMID", "SOIL", "BRIGHT", "TEMP", "TEMP","HUMID", "HUMID", "HUMID","TEMP", "HUMID", "TEMP", "HUMID", "SOIL", "BRIGHT"]
value_list = [0,     29.5,     42,     82,      90,     91,    28,      66,     28,      88,     70,     65,        26,   29.5,     42,     82,        90,    91,    30,     150,       35,     88,        70]
my_data.get_all_data(feed_list, value_list)
my_data.calculate()
