const costs = require("./champion_costs.json");
const champTraits = require("./champion_traits.json");
const traits = require("./traits.json");
const sequelize = require(`../config/connection`)

const costMap = costs.reduce((collector, item) => (collector[item.name] = item.cost, collector), {});
// console.log(costMap);

const traitsMap = traits.reduce((collector, item) => {
    collector[item.id] = item.name
    return collector
}, {});


// console.log(traitsMap);

const champions = champTraits.reduce((col, item) => {
    if (col[item.name]) {
        col[item.name].traits.push(traitsMap[item.trait_id]);
    } else {
        col[item.name] = { traits: [traitsMap[item.trait_id]] }
    }
    return col;
}, {});

Object.keys(costMap).forEach(hero => champions[hero].cost = Number(costMap[hero]))

const finalForm = Object.entries(champions).map(([champion, values]) => {
    const returnObj = {
        champion,
        cost: values.cost
    };
    values.traits.forEach((trait, index)=> returnObj[`trait${index+1}`] = trait)
    return returnObj
});

// console.log(finalForm);
const champ = () => {
    return finalForm;
};
exports.champ = champ;
// const jsonstringFinalForm = JSON.stringify(finalForm)
// const jsonfinalForm = finalForm.map((o) => JSON.stringify(o))
// console.log(jsonfinalForm)

// const seedfinalForm = () => finalForm.bulkCreate(finalForm)
// module.exports = seedfinalForm

//save it in a json file,
//set up model,
//seed the table
//work on other shit
