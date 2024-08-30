const bcrypt = require("bcrypt");

const encryptPassword = async (passwword) => {
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(passwword, saltRounds);
  return encryptedPassword;
};

module.exports = encryptPassword;
