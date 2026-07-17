 
import requests

def ApiTest(query):
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "qwen3:8b",
            "prompt": f"/no_think\n{query}",
            "stream": False
        }
    )

    # print(response.status_code)
    # print(response.text)

print(ApiTest("what is reactjs"))