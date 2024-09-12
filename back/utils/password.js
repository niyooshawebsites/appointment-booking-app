const bcrypt = require("bcrypt");

const encryptPassword = async (passwword) => {
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(passwword, saltRounds);
  return encryptedPassword;
};

const decryptPassword = async (password, encryptedPassword) => {
  const decryptedPassword = await bcrypt.compare(password, encryptedPassword);
  return decryptedPassword;
};

module.exports = { encryptPassword, decryptPassword };
