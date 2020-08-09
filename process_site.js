const axios = require("axios").default;
const cheerio = require("cheerio");

const FetchTotal = async () => {
  const Data = await (await axios.get("https://mygov.in/covid-19")).data;
  const $ = cheerio.load(Data);
  const total_case = $('div[class="iblock t_case"] > div > span').text();
  const total_increase = $(
    'div[class="iblock t_case"] > div > div[class="increase_block"]'
  )
    .text()
    .trim();
  const total_active = $('div[class="iblock active-case"] > div > span')
    .text()
    .trim();
  const total_active_increase = $(
    'div[class="iblock active-case"] > div > div[class="increase_block"]'
  )
    .text()
    .trim();
  const total_discharged = $('div[class="iblock discharge"] > div > span')
    .text()
    .trim();
  const total_discharged_increase = $(
    'div[class="iblock discharge"] > div > div[class="increase_block"]'
  )
    .text()
    .trim();
  const total_deaths = $('div[class="iblock death_case"] > div > span').text();
  const total_deaths_increase = $(
    'div[class="iblock death_case"] > div > div[class="increase_block"]'
  )
    .text()
    .trim();

  return {
    info: {
      author: "Arijit Roy",
      website: "https://iamarijit.tk",
      source: "https://mygov.in/covid-19",
      github: "https://github.com/arijit192",
    },
    result: {
      total_case: total_case,
      total_increase: total_increase,
      total_active: total_active,
      total_active_increase: total_active_increase,
      total_discharged: total_discharged,
      total_discharged_increase: total_discharged_increase,
      total_deaths: total_deaths,
      total_deaths_increase: total_deaths_increase,
    },
  };
};

const FetchStatewise = async () => {
  const result = [];
  const Data = await (await axios.get("https://mygov.in/covid-19")).data;
  const $ = cheerio.load(Data);
  const $statelist = $('div[class="marquee_data view-content"]');
  const $everystate = $statelist.find(".views-row");
  $everystate.each(function (i, elem) {
    const state_name = $(this).find(".st_name").text();
    const $all_counts = $(this).find(".st_all_counts");
    const confirmed = $all_counts.find(".tick-confirmed").children().text();
    const active = $all_counts.find(".tick-active").children().text();
    const discharged = $all_counts.find(".tick-discharged").children().text();
    const death = $all_counts.find(".tick-death").children().text();
    result.push({
      state_name: state_name,
      confirmed: confirmed,
      active: active,
      discharged: discharged,
      death: death,
    });
  });
  return {
    info: {
      author: "Arijit Roy",
      website: "https://iamarijit.tk",
      source: "https://mygov.in/covid-19",
      github: "https://github.com/arijit192",
    },
    result: result,
  };
};

exports.FetchTotal = FetchTotal;
exports.FetchStatewise = FetchStatewise;
