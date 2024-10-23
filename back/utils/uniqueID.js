const cryptoJs = require("crypto-js");

const generateUniqueID = (num) => {
  const randValue = Math.random().toString();
  const timeStamps = Date.now().toString();
  const hash = cryptoJs
    .MD5(randValue + timeStamps)
    .toString()
    .toUpperCase();
  return hash.slice(0, num);
};

module.exports = generateUniqueID;
