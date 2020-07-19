const axios = require("axios");

const allQuotation = async () => {
  try {
    const data = await axios.get("https://economia.awesomeapi.com.br/json/all");

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const quotationByCode = async (code) => {
  try {
    const data = await axios.get(
      `https://economia.awesomeapi.com.br/json/all/${code}`
    );

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { allQuotation, quotationByCode };
