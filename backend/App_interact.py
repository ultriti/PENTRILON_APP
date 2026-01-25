# import speech_recognition as sr
import datetime


def AI_interaction(query_1, file=None):


    if "hello" in query_1 and file:
        File_Name = file.filename
        File_Type = file.mimetype

        print(f"hello, this {File_Name} named {File_Type} type what to do")
        return f"hello, this {File_Name} named {File_Type} type what to do"

    elif "hello" in query_1:
        print("hello sir, how may i help you")
        return "hello sir, how may i help you"

    elif "how are you" in query_1:
        print("I'm doing great, thank you for asking")
        return "I'm doing great, What about  you, sir"

    elif "date today" in query_1:
        today = datetime.date.today()
        print(f"Today's date is: {today}")
        return f"Today's date is: {today}"

    elif "what is today's date" in query_1:
        today = datetime.date.today()
        print(f"Today's date is: {today}")
        return f"Today's date is: {today}"

    elif "what date is it today" in query_1:
        today = datetime.date.today()
        print(f"Today's date is: {today}")
        return f"Today's date is: {today}"

    elif "what's the date today" in query_1:
        today = datetime.date.today()
        print(f"Today's date is: {today}")
        return f"Today's date is: {today}"

    else:
        return "response not found"
