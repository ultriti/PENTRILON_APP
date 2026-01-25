from selenium import webdriver
import webbrowser

import psutil
import requests
import wikipedia

import re

# def is_edge_running():
#     for proc in psutil.process_iter(['name']):
#         if proc.info['name'] == 'msedge.exe':
#             return True
#     return False

# # Example usage
# if is_edge_running():
#     print("Edge is already running.")
# else:
#     print("Edge is not running.")


def internet_connected(url="http://www.google.com/", timeout=5):
    try:
        requests.get(url, timeout=timeout)
        return True
    except requests.ConnectionError:
        return False


def Search_Wikipedia(query):
    query = query.replace("search","")
    if(internet_connected()):
        result = ""
        
        
        try:
            print("------------>")
            results = wikipedia.summary(query, sentences=2)
            print(results)

        except wikipedia.PageError:
            cleaned = re.sub(
            r"^(what|who|tell me|define)\s+(is|about)?\s*", "", query.strip(), flags=re.I
            )
            print(cleaned)

            cleaned = cleaned.replace("wikipedia", "")
            print("->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
            # Step 3: Fall back to search
            results = wikipedia.search(cleaned or query)
            
        if(results and (results != "")):
            print(results)
        

        return f"{results}"
    else:
        return "connect to internet"


        
        
    

def Edge_search_automation(query="youtube"):
    if internet_connected():
        query_1 = query.replace("open", "")
        query_1 = query_1.replace("search", "")
        query_1 = query_1.replace("from", "")
        query_1 = query_1.replace("browser", "")

        webbrowser.open(f"https://www.bing.com/search?q={query_1}")
        return f"from browser '{query}' has been opened"
    else:
        return "no internet connection"

    # for proc in psutil.process_iter(['name']):
    #     print(proc.info['name'] == 'msedge.exe')

    #     if proc.info['name'] == 'msedge.exe':
    #         webbrowser.open(f"https://www.bing.com/search?q={query}")
    #         return f"Query '{query}' has been opened"
    #     else :
    #         webbrowser.open(f"https://www.bing.com/search?q={query}")
    #         return f"Query '{query}' has been opened"

    # search_box = driver.find_element(By.NAME, "q")  # Bing’s search input
    # search_box.clear()
    # search_box.send_keys("python edge automation")
    # search_box.send_keys(Keys.RETURN)

    # service = Service("C:/path/to/msedgedriver.exe")
    # driver = webdriver.Edge(service=service)

    # driver.get("https://www.bing.com")

    # def search(query):
    #     box = driver.find_element(By.NAME, "q")
    #     box.clear()
    #     box.send_keys(query + Keys.RETURN)

    # # Example usage
    # search("python speech synthesis")
