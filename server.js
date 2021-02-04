const app = require("./app");

const port = process.env.PORT || 8080;
const host = process.env.HOST || "127.0.0.1";

app.listen(port, host, () => {
  console.log("Server ready at http://" + host + ":" + port);
});
