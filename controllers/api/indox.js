const axios = require("axios");

const api_key = "RGAPI-f9d1eeda-cb25-4980-a320-b9ce7c6c8e7d";
var summoner_name = "PapaFluff";

function get_puuid(summoner_name) {
  summoner_api_call = `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summoner_name}?api_key=${api_key}`;

  return new Promise((resolve, reject) => {
    axios
      .get(summoner_api_call)
      .then((res) => {
        resolve(res["puuid"]);
      })
      .catch((err) => {
        console.log("WHOLE ERR", err)
        reject(err.message);
      });
  });
}

async function get_match_data(matchId) {
  api_call = `https://americas.api.riotgames.com/tft/match/v1/matches/${matchId}?api_key=${api_key}`;

  return new Promise((resolve, reject) => {
    axios
      .get(api_call)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}

async function get_matches(puuid) {
  api_call = `https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=60&api_key=${api_key}`;

  return new Promise((resolve, reject) => {
    axios
      .get(api_call)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}

try{

  
  get_puuid(summoner_name)
  .then((p) => {
    get_matches(p)
    .then((matches) => {
      for (match of matches) {
          get_match_data(match)
          .then((match_data) => {
            for (player of match_data["info"]["participants"]) {
                if (player["puuid"] === p) {
                  console.log(player["placement"]);
                  for (trait of player["traits"]) {
                    if (trait["tier_current"] > 0) {
                      console.log(trait["name"], trait["tier_current"]);
                    }
                  }
                }
              }
            })
            .catch((err) => {
              console.error("1",err);
            });
          }
        })
      .catch((err) => {
        console.error("2", err);
      });
    })
    .catch((err) => {
    console.error("3", err);
  });
  
}catch(err){
  console.log("ERR", err)
}
