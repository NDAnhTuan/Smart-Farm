import serial.tools.list_ports
import time

COM4 = "COM4"
COM5 = "COM5"
COM7 = "COM7"
NONE = "None"
COM_WSL = "/dev/ttyS0"

class UART:
    ser = NONE
    mess = ""
    port_error = False

    def __init__(self) -> None:
        #self.ser =serial.Serial(port=self.getPort(), baudrate=115200)
        
        self.ser = serial.Serial(port=COM_WSL, baudrate=9600)
        print(self.ser)
        if self.ser == NONE:
            self.port_error = True

    def getPort(self):
        ports = serial.tools.list_ports.comports()
        N = len(ports)
        commPort = "None"
        for i in range(0, N):
            port = ports[i]
            strPort = str(port)
            if "USB Serial Device" in strPort:
                splitPort = strPort.split(" ")
                commPort = (splitPort[0])
        return commPort

    def ProcessData(self, data, my_server):
        data = data.replace("!", "")
        data = data.replace("#", "")
        feed, value = data.split(":")
        print([feed, value])
        text = ''
        address = ''
        if feed == "temp":
            text = f'Publishing {value} to {my_server.AIO_FEED_NAMES[4]}.'
            address = f'{my_server.AIO_USERNAME}/feeds/{my_server.AIO_FEED_NAMES[4]}'
        elif feed == "humid":
            text = f'Publishing {value} to {my_server.AIO_FEED_NAMES[3]}.'
            address = f'{my_server.AIO_USERNAME}/feeds/{my_server.AIO_FEED_NAMES[3]}'
        elif feed == "bright":
            text = f'Publishing {value} to {my_server.AIO_FEED_NAMES[2]}.'
            address = f'{my_server.AIO_USERNAME}/feeds/{my_server.AIO_FEED_NAMES[2]}'
        if text != '':
            print(text)
            my_server.client.publish(address, value)

        #     # client.publish("bbc-temp", splitData[2])
        #     print(splitData[2])

    def ReadSerial(self, my_server):
        bytesToRead = self.ser.inWaiting()
        if (bytesToRead > 0):
            self.mess = self.mess + self.ser.read(bytesToRead).decode("UTF-8")
            while ("#" in self.mess) and ("!" in self.mess):
                start = self.mess.find("!")
                end = self.mess.find("#")
                self.ProcessData(self.mess[start:end + 1], my_server)
                if (end == len(self.mess)):
                    self.mess = ""
                else:
                    self.mess = self.mess[end+1:]


# for testing
# temp = UART()
# while True:
#     temp.ReadSerial()
#     time.sleep(1)
