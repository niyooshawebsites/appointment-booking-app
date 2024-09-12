const bcrypt = require("bcrypt");

const encryptPassword = async (passwword) => {
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(passwword, saltRounds);
  return encryptedPassword;
};

const decryptPassword = async (encryptedPassword, password) => {
  const decryptedPassword = await bcrypt.compare(encryptedPassword, password);
  return decryptedPassword;
};

module.exports = { encryptPassword, decryptPassword };
