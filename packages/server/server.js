const express = require("express");
const app = express();
const cors = require("cors");
const config = require("config");
//const PORT = 8080;
const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = config.get("PORT")  || 8003;
app.set("env", NODE_ENV);
app.set("etag", false);

app.use(cors());
require("./startup/routes")(app);
// secure proxy
require("./startup/secure")(app);

// app.get("/api", (req, res) => {
//   res.json({ message: "Like this video!", people: ["Arpan", "Jack", "Barry"] });
// });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
