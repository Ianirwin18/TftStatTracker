const router = require("express").Router();
const { Match, MatchChampion } = require("../../models");

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

router.post("/creatematch", async (req, res) => {
  console.log(req.body);
  try {
    const match = await Match.create({
      place: req.body.placement,
      score: pointsMap[req.body.placement],
      user_id: req.body.user_id || null,
    });

    const { champIds } = req.body;

    await Promise.all(
      champIds.map(async (champId, index) =>
        MatchChampion.create({
          match_id: match.dataValues.id,
          champion_id: champId,
        })
      )
    );
    res.json("good!");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
