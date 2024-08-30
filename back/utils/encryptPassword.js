const bcrypt = require("bcrypt");

const encryptPassword = (passwword) => {
  const saltRounds = 10;
  const encryptedPassword = bcrypt.hash(passwword, saltRounds);
  return encryptedPassword;
};

module.exports = encryptPassword;
