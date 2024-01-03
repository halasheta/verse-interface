import requests
import sys
import re

API_URL1 = "https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number="
API_URL2 = "https://api.quran.com/api/v4/quran/translations/131?chapter_number="

CHAP_URL = "http://127.0.0.1:8000/quran/chapter/add/"
VERSE_URL = "http://127.0.0.1:8000/quran/verse/add/"

if len(sys.argv) <= 1:
    print("Please call this script using a JWT Bearer from admin user like so,\n" + 
          "python3 scrape.py <token>")    
TOKEN = "Bearer " + sys.argv[1]
headers = {'Authorization': TOKEN}



res = requests.get("http://127.0.0.1:8000/quran/all/")
chap_models = []
if res.status_code != 200:
    print("STATUS {} while retrieving chapters".format(res.status_code))
else:
    models = res.json()
    if len(models) > 0:
        chap_models = models 

    else:
    # Get all chapters & create models
        res = requests.get("https://api.quran.com/api/v4/chapters")
        if res.status_code == 200:
            chap_lst = res.json()["chapters"]
            for c in chap_lst:
                body = {
                    "num": c["id"],
                    "name_ara": c["name_arabic"],
                    "name_eng": c["name_simple"]
                }
                r = requests.post(CHAP_URL, data=body, headers=headers)
                if r.status_code != 201:
                    print("STATUS {}: Error while creating Model for Chapter {}".format(r.status_code, c["id"]))
                else:
                    chap_models.append(r.json())

        else:
            print("STATUS {}: Error while scraping the chapters".format(res.status_code))

for chap in chap_models:
    if len(chap["verses"]) == 0:
        # Fetch Arabic verses
        verses, trans_verses = [], []
        res = requests.get(API_URL1 + str(chap["num"]))
        if res.status_code == 200:
            verses = res.json()["verses"]
        else:
            print("STATUS {}: Error while scraping the verses of Chapter {}".format(res.status_code, chap["num"]))

        # Fetch English verses
        res = requests.get(API_URL2 + str(chap["num"]))
        if res.status_code == 200:
            trans_verses = res.json()["translations"]
        else:
            print("STATUS {}: Error while scraping the translated verses of Chapter {}".format(res.status_code, chap["num"]))

        # Create models
        for i in range(len(verses)):
            num = verses[i]["verse_key"].split(":")[-1]
            clean_trans = re.sub(r'<(.*?)+>[\d]*', "", trans_verses[i]["text"])
            body = {
                "num": num,
                "chapter": chap["id"],
                "text_ara": verses[i]["text_uthmani"],
                "text_eng": clean_trans
            }
     
            r = requests.post(VERSE_URL, data=body, headers=headers)
            if r.status_code != 201:
                print("STATUS {}: Error while creating Model for Verse {}".format(r.status_code, verses[i]["verse_key"]))
                print(r.text)

        print("Completed Verse models for Chapter {}".format(chap["num"]))

    
