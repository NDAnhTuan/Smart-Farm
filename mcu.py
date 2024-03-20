from event_manager import *
from yolobit import *
button_a.on_pressed = None
button_b.on_pressed = None
button_a.on_pressed_ab = button_b.on_pressed_ab = -1
import time
import sys
import uselect
from aiot_rgbled import RGBLed
from aiot_ir_receiver import *
from machine import Pin, SoftI2C
from aiot_dht20 import DHT20

event_manager.reset()

def on_event_timer_callback_B_H_Y_F_L():
  global fan_status, t_C3_ADn_hi_E1_BB_87u, chu_E1_BB_97i, LUX, lux_waiting, DoAmDat, LUX_count, DHT20_count, dht_waiting, DoAmDat_waiting, DoAmDat_count, NhietDo, DoAmKK, led_status, pump_status
  xuLyLUX()

event_manager.add_timer_event(1000, on_event_timer_callback_B_H_Y_F_L)

def on_event_timer_callback_A_P_F_F_I():
  global fan_status, t_C3_ADn_hi_E1_BB_87u, chu_E1_BB_97i, LUX, lux_waiting, DoAmDat, LUX_count, DHT20_count, dht_waiting, DoAmDat_waiting, DoAmDat_count, NhietDo, DoAmKK, led_status, pump_status
  xuLyTinHieuNhan()

event_manager.add_timer_event(3000, on_event_timer_callback_A_P_F_F_I)

def read_terminal_input():
  spoll=uselect.poll()        # Set up an input polling object.
  spoll.register(sys.stdin, uselect.POLLIN)    # Register polling object.

  input = ''
  if spoll.poll(0):
    input = sys.stdin.read(1)

    while spoll.poll(0):
      input = input + sys.stdin.read(1)

  spoll.unregister(sys.stdin)
  return input

# Xử lý LED
def xuLyLUX():
  global fan_status, t_C3_ADn_hi_E1_BB_87u, chu_E1_BB_97i, lux_waiting, LUX, DoAmDat, DHT20_count, LUX_count, dht_waiting, DoAmDat_waiting, DoAmDat_count, NhietDo, DoAmKK, led_status, pump_status, aiot_ir_rx, aiot_dht20, tiny_rgb
  if lux_waiting == 0:
    LUX = round(translate((pin0.read_analog()), 0, 4095, 0, 100))
    print('!BRIGHT:{LUX}#', end =' ')
    lux_waiting = 1
  else:
    if read_terminal_input() == '!BRIGHT:OK#':
      lux_waiting = 0
      LUX_count = 0
    else:
      LUX_count = (LUX_count if isinstance(LUX_count, (int, float)) else 0) + 1
      if LUX_count == 3:
        display.scroll('##Gateway error!!')
        lux_waiting = 0
        LUX_count = 0

tiny_rgb = RGBLed(pin4.pin, 4)

# Xử lý tín hiệu gateway gửi đến
def xuLyTinHieuNhan():
  global fan_status, t_C3_ADn_hi_E1_BB_87u, chu_E1_BB_97i, lux_waiting, LUX, DoAmDat, DHT20_count, LUX_count, dht_waiting, DoAmDat_waiting, DoAmDat_count, NhietDo, DoAmKK, led_status, pump_status, aiot_ir_rx, aiot_dht20, tiny_rgb
  chu_E1_BB_97i = read_terminal_input()
  if chu_E1_BB_97i == '0':
    pin2.write_analog(round(translate(0, 0, 100, 0, 1023)))
    fan_status = '0'
  if chu_E1_BB_97i == '1':
    pin2.write_analog(round(translate(25, 0, 100, 0, 1023)))
    fan_status = '1'
  if chu_E1_BB_97i == '2':
    pin2.write_analog(round(translate(50, 0, 100, 0, 1023)))
    fan_status = '2'
  if chu_E1_BB_97i == '3':
    pin2.write_analog(round(translate(75, 0, 100, 0, 1023)))
    fan_status = '3'
  if chu_E1_BB_97i == '4':
    pin3.write_analog(round(translate(70, 0, 100, 0, 1023)))
    pump_status = '1'
  if chu_E1_BB_97i == '5':
    pin3.write_analog(round(translate(0, 0, 100, 0, 1023)))
    pump_status = '0'
  if chu_E1_BB_97i == '6':
    pin1.write_digital((1))
    tiny_rgb.show(0, hex_to_rgb('#ff0000'))
    led_status = '1'
  if chu_E1_BB_97i == '7':
    pin1.write_digital((0))
    led_status = '0'

def on_event_timer_callback_x_c_G_K_v():
  global fan_status, t_C3_ADn_hi_E1_BB_87u, chu_E1_BB_97i, LUX, lux_waiting, DoAmDat, LUX_count, DHT20_count, dht_waiting, DoAmDat_waiting, DoAmDat_count, NhietDo, DoAmKK, led_status, pump_status
  xuLyDoAmDat()

event_manager.add_timer_event(1000, on_event_timer_callback_x_c_G_K_v)

# Xử lý độ ẩm đất (máy bơm)
def xuLyDoAmDat():
  global fan_status, t_C3_ADn_hi_E1_BB_87u, chu_E1_BB_97i, lux_waiting, LUX, DoAmDat, DHT20_count, LUX_count, dht_waiting, DoAmDat_waiting, DoAmDat_count, NhietDo, DoAmKK, led_status, pump_status, aiot_ir_rx, aiot_dht20, tiny_rgb
  if dht_waiting == 0:
    DoAmDat = round(translate((pin1.read_analog()), 0, 4095, 0, 100))
    print('!SOIL:{DoAmDat}#', end =' ')
    DoAmDat_waiting = 1
  else:
    if read_terminal_input() == '!SOIL:OK#':
      DoAmDat_waiting = 0
      DoAmDat_count = 0
    else:
      DoAmDat_count = (DoAmDat_count if isinstance(DoAmDat_count, (int, float)) else 0) + 1
      if DoAmDat_count == 3:
        display.scroll('##Gateway error!!')
        DoAmDat_waiting = 0
        DoAmDat_count = 0

aiot_ir_rx = IR_RX(Pin(pin5.pin, Pin.IN)); aiot_ir_rx.start();

def on_ir_receive_callback(t_C3_ADn_hi_E1_BB_87u, addr, ext):
  global fan_status, chu_E1_BB_97i, LUX, lux_waiting, DoAmDat, LUX_count, DHT20_count, dht_waiting, DoAmDat_waiting, DoAmDat_count, NhietDo, DoAmKK, led_status, pump_status
  if aiot_ir_rx.get_code() == IR_REMOTE_0:
    pin2.write_analog(round(translate(0, 0, 100, 0, 1023)))
    fan_status = '0'
  if aiot_ir_rx.get_code() == IR_REMOTE_1:
    pin2.write_analog(round(translate(25, 0, 100, 0, 1023)))
    fan_status = '1'
  if aiot_ir_rx.get_code() == IR_REMOTE_2:
    pin2.write_analog(round(translate(50, 0, 100, 0, 1023)))
    fan_status = '2'
  if aiot_ir_rx.get_code() == IR_REMOTE_3:
    pin2.write_analog(round(translate(75, 0, 100, 0, 1023)))
    fan_status = '3'
  if aiot_ir_rx.get_code() == IR_REMOTE_4:
    pin3.write_analog(round(translate(70, 0, 100, 0, 1023)))
    pump_status = '1'
  if aiot_ir_rx.get_code() == IR_REMOTE_5:
    pin3.write_analog(round(translate(0, 0, 100, 0, 1023)))
    pump_status = '0'
  if aiot_ir_rx.get_code() == IR_REMOTE_6:
    pin1.write_digital((1))
    tiny_rgb.show(0, hex_to_rgb('#ff0000'))
    led_status = '1'
  if aiot_ir_rx.get_code() == IR_REMOTE_7:
    pin1.write_digital((0))
    led_status = '0'
  aiot_ir_rx.clear_code()

aiot_ir_rx.on_received(on_ir_receive_callback)

def on_event_timer_callback_Q_S_w_l_W():
  global fan_status, t_C3_ADn_hi_E1_BB_87u, chu_E1_BB_97i, LUX, lux_waiting, DoAmDat, LUX_count, DHT20_count, dht_waiting, DoAmDat_waiting, DoAmDat_count, NhietDo, DoAmKK, led_status, pump_status
  xuLyNhietDo_DoAmKK()

event_manager.add_timer_event(1000, on_event_timer_callback_Q_S_w_l_W)

aiot_dht20 = DHT20(SoftI2C(scl=Pin(22), sda=Pin(21)))

# Xử lý nhiệt độ và độ ẩm không khí
def xuLyNhietDo_DoAmKK():
  global fan_status, t_C3_ADn_hi_E1_BB_87u, chu_E1_BB_97i, lux_waiting, LUX, DoAmDat, DHT20_count, LUX_count, dht_waiting, DoAmDat_waiting, DoAmDat_count, NhietDo, DoAmKK, led_status, pump_status, aiot_ir_rx, aiot_dht20, tiny_rgb
  if dht_waiting == 0:
    aiot_dht20.read_dht20()
    NhietDo = aiot_dht20.dht20_temperature()
    DoAmKK = aiot_dht20.dht20_humidity()
    print('!TEMP:{NhietDo}#', end =' ')
    print('!HUMID:{DoAmKK}#', end =' ')
    dht_waiting = 1
  else:
    if read_terminal_input() == '!TEMP:OK#':
      dht_waiting = 0
      LUX_count = 0
    else:
      LUX_count = (LUX_count if isinstance(LUX_count, (int, float)) else 0) + 1
      if LUX_count == 3:
        display.scroll('##Gateway error!!')
        lux_waiting = 0
        LUX_count = 0
    if read_terminal_input() == '!HUMID:OK#':
      lux_waiting = 0
      LUX_count = 0
    else:
      LUX_count = (LUX_count if isinstance(LUX_count, (int, float)) else 0) + 1
      if LUX_count == 3:
        display.scroll('##Gateway error!!')
        lux_waiting = 0
        LUX_count = 0

if True:
  display.scroll('IoT')
  lux_waiting = 0
  DHT20_count = 0
  LUX_count = 0
  DoAmDat_count = 0
  fan_status = '0'
  led_status = '0'
  pump_status = '0'

while True:
  event_manager.run()
  display.scroll('OK')
  time.sleep_ms(10)


fan_status = '1'
