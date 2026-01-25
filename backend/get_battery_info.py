import psutil
# import speech_recognition as sr
# import pyttsx3




def convert_time(seconds):
    minutes, seconds = divmod(seconds, 60)
    hours, minutes = divmod(minutes, 60)
    return f"{hours:02d}:{minutes:02d}:{seconds:02d}"

battery = psutil.sensors_battery()

def fullybattery():
    def battery_percent():
        if(battery.percent >= 90):
        
            print(f"The current deaktop battery level is at {battery.percent} percent.")
            print("Battery is almost fully charged!") 
            return f"The current deaktop battery level is at {battery.percent} percent.",f"Battery is almost fully charged!"
         
        elif(battery.percent <= 90):
            print(f"The current deaktop battery level is at {battery.percent} percent.")
            print("Battery is not fully vharged charged!")
            return f"The current deaktop battery level is at {battery.percent} percent.",f"Battery is not fully vharged charged!"
        
        elif(battery.percent <= 30):
            print(f"The current deaktop battery level is at {battery.percent} percent.")
            print("Battery is about to dead  charged!")
            return f"The current deaktop battery level is at {battery.percent} percent.", f"Battery is about to dead charged! . plug in the charger"
    
    battery_percent_text, charging_ = battery_percent()

    while True:
        def battery_plgged():
            print(battery.power_plugged == True)
            if(battery.power_plugged == True):
                print("Battery is plugged in.")
                return f"The device is currently Plugged In, {battery_percent_text}, {charging_}" 
        
            else:
                print("Battery is not plugged in.")
                return f"The device is currently Unplugged, {battery_percent_text}, {charging_}"
            

        return battery_plgged()
        break
    
    # def battry_time():
    #     print(f"Battery left: {convert_time(battery.secsleft)}")
    #     return f"The estimated remaining battery time is {convert_time(battery.secsleft)}"

    # battry_time()