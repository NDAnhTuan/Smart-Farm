import statistics


class SensorData:
    def __init__(self) -> None:
        # data get from sensors
        self.temperature = list()
        self.humidity = list()
        self.brightness = list()
        self.soil_moisture = list()
        # is_data_valid = true --> can send data
        # is_data_valid = false --> can not send data
        self.is_data_valid = False
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
    
    def get_data(self, cmd):
        
        pass
    def calculate(self):
        try:
            pass
        except:
            pass

    
    