const seed = require("./mattmatches.json");
const { Champion } = require("../models");
const fs = require("fs");

const getMatchSeed = async (filename, userId) => {
  const seed = require(filename);

  const pointsMap = {
    1: 4,
    2: 3,
    3: 2,
    4: 1,
    5: -1,
    6: -2,
    7: -3,
    8: -4,
  };

  const hydrated = seed.map((a, i) => {
    const [place, ...champs] = a;
    return {
      place,
      score: pointsMap[place + ""],
      champs,
      matchId: parseInt(`${userId}${i + 1}`),
    };
  });

  const champions = await Champion.findAll();
  const championsSerial = champions.map((a) => a.get({ plain: true }));
  // console.log(championsSerial);
  const champNameMap = championsSerial.reduce(
    (a, b) => ((a[b.champion] = b), a),
    {}
  );
  const matchChamps = hydrated.reduce((col, match, i) => {
    // console.log("INDEX", match);
    const champs = match.champs.map((name, index) => ({
      place: match.place,
      score: match.score,
      matchId: match.matchId,
      championId: champNameMap[name].id,
    }));
    return [...col, ...champs];
  }, []);
  const userMatch = hydrated.map((match) => {
    return {
      user_id: userId,
      id: match.matchId,
      place: match.place,
      score: match.score,
    };
  });
  return { matchChamps, userMatch };
};

module.exports = getMatchSeed;



