import requests
from bs4 import BeautifulSoup
import json
import json5
import sqlite3

db = sqlite3.connect('tftAlex.db')

page = requests.get("https://www.lolchess.gg/champions/set7/yone")
soup = BeautifulSoup(page.content, 'html.parser')
data_text = soup.findAll('script')[21].text


raw_string = data_text.split('window.guideChampion = ')[1][:-6]
json_string = json5.loads(raw_string)

db.execute('DROP TABLE IF EXISTS traits;')
db.execute('DROP TABLE IF EXISTS champion_costs;')
db.execute('DROP TABLE IF EXISTS champion_traits;')

db.execute('CREATE TABLE IF NOT EXISTS traits (id, name);')
db.execute('CREATE TABLE IF NOT EXISTS champion_costs (name, cost);')
db.execute('CREATE TABLE IF NOT EXISTS champion_traits (name, trait_id);')

# # Champion info
for champ in json_string['champions']:
    db.execute('INSERT INTO champion_costs (name, cost) VALUES (?, ?)', (champ['i18n']['name'], champ['cost']))
    for t in champ['trait_ids'].split(','):
        db.execute('INSERT INTO champion_traits (name, trait_id) VALUES (?, ?)', (champ['i18n']['name'], t))

# # Trait info
for x in json_string['championTraits']:
    db.execute(f"INSERT INTO traits (id, name) VALUES ('{x}', '{json_string['championTraits'][x]['i18n']['name']}')")
    print(x, json_string['championTraits'][x]['i18n']['name'])

db.commit()

