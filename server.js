const app = require("./app");
const port = process.env.PORT || 5000;
const ConnectDb = require("./config/db");
const dotenv = require('dotenv')
dotenv.config();

const StartServer = async() => {

  await ConnectDb(process.env.DB_Link);

  app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
  });
};

StartServer();
