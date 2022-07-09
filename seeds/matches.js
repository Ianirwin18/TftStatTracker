const seed = require("./tonyfriendmatches.json");
const { Champion } = require("../models");
const fs = require('fs')

const pointsMap = {
    "1": 4,
    "2": 3,
    "3": 2,
    "4": 1,
    "5": -1,
    "6": -2,
    "7": -3,
    "8": -4
}

const hydrated = seed.map(a => {
    const [place, ...champs] = a;
    return {
        place,
        score: pointsMap[place + ""],
        champs
    }
})

console.log(hydrated);


(async () => {
    const champions = await Champion.findAll();
    const championsSerial = champions.map(a => a.get({ plain: true }));
    // console.log(championsSerial);
    const champNameMap = championsSerial.reduce((a, b) => (a[b.champion] = b, a), {});
    const matchChamps = hydrated.reduce((col, match, i) => {
        console.log("INDEX", match)
        const champs = match.champs.map((name) => ({place: match.place, score:match.score, match_id: i+1, champion_id: champNameMap[name].id }));
        return [...col,...champs]
    }, [])

    fs.writeFileSync("./champmatchseed.json", JSON.stringify(matchChamps))
})()


