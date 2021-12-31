import busio
import digitalio
import board
import adafruit_mcp3xxx.mcp3008 as MCP
import time
import RPi.GPIO as GPIO
from adafruit_mcp3xxx.analog_in import AnalogIn
from threading import Timer


spi = busio.SPI(clock=board.SCK, MISO=board.MISO, MOSI=board.MOSI)
cs = digitalio.DigitalInOut(board.D5)
mcp = MCP.MCP3008(spi, cs)
humidity_voltage_raw = AnalogIn(mcp, MCP.P0)
light_voltage_raw = AnalogIn(mcp, MCP.P2)
prog = float(2)


def convert_light(voltage):
  max_range = 350 
  max_range_voltage = 3.3
  return(max_range/max_range_voltage*voltage)

def convert_humidity(voltage):
  max_range = 100 
  min_range_voltage = 2.05
  return(max_range-(((voltage-1.35)*100)/min_range_voltage))


GPIO.setmode(GPIO.BCM)
GPIO.setup(27,  GPIO.OUT)
GPIO.output(27, False)
GPIO.setup(17,  GPIO.OUT)
GPIO.output(17, False)
GPIO.setup(22, GPIO.OUT)
GPIO.output(22, True)
  

while True:
  air_humidity = open('./server/setValues/outputAirHumidity.txt','r')
  temperature = open('./server/setValues/outputTemperature.txt','r')
  set_value_light = open('./server/setValues/light.txt','r')
  set_value_humidity = open('./server/setValues/humidity.txt','r')
  set_value_temperature = open('./server/setValues/temperature.txt','r')
  set_sampling_time = open('./server/setValues/samplingTime.txt','r')
  

  humidity_voltage  = round(humidity_voltage_raw.voltage, 2)
  light_voltage = round(light_voltage_raw.voltage, 2)

  light_raw = convert_light(light_voltage)
  light = round(light_raw, 2)

  humidity_raw = convert_humidity(humidity_voltage)
  humidity = round(humidity_raw, 2)

  lines_temperature_set = set_value_temperature.readlines()
  lines_temperature = temperature.readlines()
  lines_air_humidity = air_humidity.readlines()
  lines_light = set_value_light.readlines()
  lines_humidity = set_value_humidity.readlines()
  lines_set_sampling_time = set_sampling_time.readlines()

  light_threshold = float(lines_light[0])
  humidity_threshold = float(lines_humidity[0])
  temperature_threshold = float(lines_temperature_set[0])
  air_humidity_value = float(lines_air_humidity[0])
  temperature_value = float(lines_temperature[0])
  sampling_time = float(lines_set_sampling_time[0])

  print()
  print('swiatlo zadane: ' + lines_light[0])
  print('wilgoć zadana: ' + lines_humidity[0])
  print('temperatura zadana :' + lines_temperature_set[0])
  print()

  print('temperatura :' + lines_temperature[0])
  print('wilgoć powietrza :' + lines_air_humidity[0])
  print('swiatlo: ' + str(light))
  print('wilgoc: ' + str(humidity))
  
  print(str(light), file=open("./server/setValues/outputLight.txt", "w"))
  print(str(humidity), file=open("./server/setValues/outputHumidity.txt", "w"))
  
  if light < light_threshold:
    GPIO.output(27, True)
    
  else:
    GPIO.output(27, False)

  if humidity < humidity_threshold:
    GPIO.output(17, True)
    time.sleep(0.6)
    GPIO.output(17, False)

  else:
    GPIO.output(17, False)
    
  if temperature_value < temperature_threshold:
    GPIO.output(22, True)
    
  else:
    GPIO.output(22, False)
    
  time.sleep(sampling_time)
