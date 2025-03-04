const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");

// Local imports
const connectDb = require("./db");
const cricketRoutes = require("./controllers/cricket.controller");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routing
app.use("/cricket", cricketRoutes);

// Configure view engine
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  engine({
    extname: "hbs", // file extension for handlebars files
    layoutsDir: path.join(__dirname, "views/layouts"), // path to the layouts directory
    defaultLayout: "main", // This refers to the `main.hbs` layout file
  })
);

app.set("view engine", ".hbs");

connectDb()
  .then(() => {
    console.log("DB connection succeeded.");
    app
      .listen(3000, () => {
        console.log("Server started at 3000.");
      })
      .on("error", (err) => console.log("Server ignition failed:", err));
  })
  .catch((err) => console.log("Error in connecting DB:", err));
