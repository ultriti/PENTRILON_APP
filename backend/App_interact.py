# import speech_recognition as sr
import datetime
from google import genai

import os
import requests

os.environ["GEMINI_API_KEY"] = "AIzaSyATULBEhaRvkXx5sAsYTaMl1Wv0-KSFTHc"

# def ApiTest(Query):
#     # client = genai.Client()
    
#     # # Detect complex topics that need more space
#     # complex_topics = ["comparison", "tutorial", "guide", "vs", "explain", "difference"]
#     # is_complex = any(topic in Query.lower() for topic in complex_topics)
    
#     # max_tokens = 750 if is_complex else 350  # 500/2000 word equivalents
    
#     # response = client.models.generate_content(
#     #     model="gemini-2.5-flash",
#     #     contents=f"{Query}\n\n**Limit: {500 if not is_complex else 2000} words max.** Respond concisely in bullet points with ## headers.",
#     #     config={
#     #         "max_output_tokens": max_tokens,
#     #         "temperature": 0.3
#     #     }
#     # )
#     # return response.text
#     response = await fetch("http://localhost:11434/api/generate", {
#     method: "POST",
#     headers: {
#         "Content-Type": "application/json"
#     },
#     body: JSON.stringify({
#         model: "qwen3:8b",
#         prompt: "Write a React login page",
#         stream: false
#     })
#     });

#     const data = await response.json();

#     console.log(data.response);


import requests

def ApiTest(query):
    print("ollama model")
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "qwen3:8b",
            "prompt": f"/no_think\n{query}",
            "stream": False
        }
    )

    # print(response.status_code)
    print(response.text)
    return response.json()["response"]

    
    
# import requests

# def ApiTest(query):
#     response = requests.post(
#         "http://localhost:11434/api/generate",
#         json={
#             "model": "qwen3:8b",
#             "prompt": f"/no_think\n{query}",
#             "stream": False
#         }
#     )

#     # print(response.status_code)
#     # print(response.text)

# print(ApiTest("what is reactjs"))
    
def AI_interaction(query_1, file=None):


    if "hello" in query_1 and file:
        File_Name = file.filename
        File_Type = file.mimetype

        print(f"hello, this {File_Name} named {File_Type} type what to do")
        return f"hello, this {File_Name} named {File_Type} type what to do"

    elif "hello"  in query_1 or "hi" in  query_1 or "hey" in query_1:
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
    
    elif query_1:
        try: 
            text = ApiTest(query_1)
            return text
        except Exception as e:
            print("error", e)
            return "response not found"
        

    else:
        return "response not found"
