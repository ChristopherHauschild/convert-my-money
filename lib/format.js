const formatBRL = (number) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(number);
  return formatter;
};

const formatUSD = (number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number);
  return formatter;
};

const formatGBP = (number) => {
  const formatter = number.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  });
  return formatter;
};

const formatJPY = (number) => {
  const formatter = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    minimumFractionDigits: 2,
  }).format(number);
  return formatter;
};

const formatEUR = (number) => {
  const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(number);
  return formatter;
};

module.exports = { formatBRL, formatUSD, formatJPY, formatEUR, formatGBP };
