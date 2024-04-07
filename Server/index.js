const server = require("./src/app.js");
const { conn } = require("./src/db.js");

conn.sync({ alter: true }).then(() => {
  server.listen(3001, () => {
    console.log("Server listening at 3001");
  });
});
