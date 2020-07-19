const average = (a, b) => {
  const result = (parseFloat(a) + parseFloat(b)) / 2;
  return result.toFixed(2);
};

module.exports = { average };
