const express = require("express");

const format = require("../lib/format");
const calcs = require("../lib/calcs");

const api = require("../api/api-service");
const { allQuotation } = require("../api/api-service");
const { formatGBP, formatUSD } = require("../lib/format");

const router = express.Router();

router.get("/", async (req, res) => {
  res.render("home", {});
});

router.get("/quotation", async (req, res) => {
  const { by, from, quantity } = req.query;
  let high = "";
  let low = "";
  let titleBy = "";
  let titleFrom = "";

  let convert = "";

  const value = parseFloat(quantity);

  const codeFrom = await api.quotationByCode(from);
  const allCode = await api.allQuotation();

  const USD = await allCode.USD;
  const GBP = await allCode.GBP;
  const EUR = await allCode.EUR;
  const JPY = await allCode.JPY;

  if (by === "BRL-BRL") titleBy = "Real";
  if (by === "USD-BRL") titleBy = "Dólar Americano";
  if (by === "GBP-BRL") titleBy = "Libra Esterlina";
  if (by === "EUR-BRL") titleBy = "Euro";
  if (by === "JPY-BRL") titleBy = "Yene";

  if (from === "USD-BRL") {
    high = await codeFrom.USD.high;
    low = await codeFrom.USD.low;
    titleFrom = "Dólar";
    convert = format.formatUSD(value / parseFloat(calcs.average(high, low)));
  }
  if (from === "GBP-BRL") {
    high = await codeFrom.GBP.high;
    low = await codeFrom.GBP.low;
    titleFrom = "Libra";
    convert = format.formatGBP(value / parseFloat(calcs.average(high, low)));
  }
  if (from === "EUR-BRL") {
    high = await codeFrom.EUR.high;
    low = await codeFrom.EUR.low;
    titleFrom = "Euro";
    convert = format.formatEUR(value / parseFloat(calcs.average(high, low)));
  }
  if (from === "JPY-BRL") {
    high = await codeFrom.JPY.high;
    low = await codeFrom.JPY.low;
    titleFrom = "Yene";
    convert = format.formatJPY(value / parseFloat(calcs.average(high, low)));
  }

  res.render("quotation", {
    by,
    from,
    titleBy,
    titleFrom,
    average: calcs.average(high, low),
    origin: format.formatBRL(value),
    convert,
    USDAverage: format.formatUSD(parseFloat(calcs.average(USD.high, USD.low))),
    USDHigh: format.formatUSD(parseFloat(USD.high)),
    USDHighNum: parseFloat(USD.high),
    USDLowNum: parseFloat(USD.low),
    USDLow: format.formatUSD(parseFloat(USD.low)),
    GBPAverage: format.formatGBP(parseFloat(calcs.average(GBP.high, GBP.low))),
    GBPHigh: format.formatGBP(parseFloat(GBP.high)),
    GBPHighNum: parseFloat(GBP.high),
    GBPLowNum: parseFloat(GBP.low),
    GBPLow: format.formatGBP(parseFloat(GBP.low)),
    EURAverage: format.formatEUR(parseFloat(calcs.average(EUR.high, EUR.low))),
    EURHigh: format.formatEUR(parseFloat(EUR.high)),
    EURHighNum: parseFloat(EUR.high),
    EURLowNum: parseFloat(EUR.low),
    EURLow: format.formatEUR(parseFloat(EUR.low)),
    JPYAverage: format.formatJPY(parseFloat(calcs.average(JPY.high, JPY.low))),
    JPYHigh: format.formatJPY(parseFloat(JPY.high)),
    JPYHighNum: parseFloat(JPY.high),
    JPYLowNum: parseFloat(JPY.low),
    JPYLow: format.formatJPY(parseFloat(JPY.low)),
  });
});

router.get("/graphic", async (req, res) => {
  const allCode = await api.allQuotation();

  const USD = await allCode.USD;
  const GBP = await allCode.GBP;
  const EUR = await allCode.EUR;
  const JPY = await allCode.JPY;

  res.render("graphic", {
    USDHigh: format.formatUSD(parseFloat(USD.high)),
    USDHighNum: parseFloat(USD.high),
    USDLowNum: parseFloat(USD.low),
    USDLow: format.formatUSD(parseFloat(USD.low)),
    GBPHigh: format.formatGBP(parseFloat(GBP.high)),
    GBPHighNum: parseFloat(GBP.high),
    GBPLowNum: parseFloat(GBP.low),
    GBPLow: format.formatGBP(parseFloat(GBP.low)),
    EURHigh: format.formatEUR(parseFloat(EUR.high)),
    EURHighNum: parseFloat(EUR.high),
    EURLowNum: parseFloat(EUR.low),
    EURLow: format.formatEUR(parseFloat(EUR.low)),
    JPYHigh: format.formatJPY(parseFloat(JPY.high)),
    JPYHighNum: parseFloat(JPY.high),
    JPYLowNum: parseFloat(JPY.low),
    JPYLow: format.formatJPY(parseFloat(JPY.low)),
  });
});

module.exports = router;
