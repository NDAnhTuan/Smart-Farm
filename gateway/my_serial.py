import serial.tools.list_ports
import time

COM4 = "COM4"
COM5 = "COM5"
COM7 = "COM7"
NONE = "None"
COM_WSL = "/dev/ttyS0"

CMD = ["TEMP", "HUMID", "SOIL", "BRIGHT", "LED", "FAN", "PUMP", "control"]
VALID_VALUE ={
    "LED": ['0', '1'],
    "FAN": ['0', '1', '2', '3'],
    "PUMP": ['0', '1']
}
class UART:
    ser = NONE
    mess = ""
    port_error = False
    feed_list = list()
    value_list = list()
    check_connection = False
    def __init__(self) -> None:
        #self.ser =serial.Serial(port=self.getPort(), baudrate=115200)
        try:
            self.ser = serial.Serial(port=COM5, baudrate=115200)
            print(self.ser)
            if self.ser == NONE:
                self.port_error = True
        except:
            self.ser = NONE
            self.port_error = True
            print("Error in serial")
        

    def getPort(self):
        ports = serial.tools.list_ports.comports()
        N = len(ports)
        commPort = "None"
        for i in range(0, N):
            port = ports[i]
            strPort = str(port)
            #print(strPort)
            if "USB-SERIAL CH340" in strPort:
                splitPort = strPort.split(" ")
                commPort = (splitPort[0])
        return commPort

    def ProcessData(self, data):
        data = data.replace("!", "")
        data = data.replace("#", "")
        feed, value = data.split(":")
        if feed in ["TEMP", "HUMID", "SOIL", "BRIGHT"]:
            value = float(value)
        print([feed, value])
        if feed not in CMD:
            self.send_data(f"!{feed}:1#")
        elif feed in ["HUMID", "SOIL", "BRIGHT"] and value < 0:
            self.send_data(f"!{feed}:2#")
        elif feed in ["LED", "FAN", "PUMP"] and value not in VALID_VALUE[feed]:
            self.send_data(f"!{feed}:2#")
        elif feed == "control":
            self.check_connection = True
        else:
            self.send_data(f"!{feed}:0#")
            self.feed_list.append(feed)
            self.value_list.append(value)
        
    def ReadSerial(self):
        bytesToRead = self.ser.inWaiting()
        if (bytesToRead > 0):
            self.mess = self.mess + self.ser.read(bytesToRead).decode("UTF-8")
            print(self.mess)
            self.mess.replace(' ','')
            while ("#" in self.mess) and ("!" in self.mess):
                start = self.mess.find("!")
                end = self.mess.find("#")
                self.ProcessData(self.mess[start:end+1])
                if (end == len(self.mess)):
                    self.mess = ""
                else:
                    self.mess = self.mess[end+1:]
    
    def send_data(self, mess):
        self.ser.write(mess.encode())
        return
    def query(self, cmd:str):
        mess = f"!{cmd}:3#".encode()
        self.ser.write(mess)

# # for testing
# temp = UART()
# while True:
#     temp.ReadSerial()
#     time.sleep(0.01)
