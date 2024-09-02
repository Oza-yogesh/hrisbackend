const mongoose = require("mongoose");

const databaseConnection = mongoose
  .connect(process.env.LOCAL_DB_URL)
  .then(
    () => console.info("database connected!"),
    () => console.info("database not connected!")
  )
  .catch((error) => console.error(error));

const dbConfig = (req, res, next) => {
  req.databaseConnection = databaseConnection;
  next();
};

module.exports = dbConfig;
