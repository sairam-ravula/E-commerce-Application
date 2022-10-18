const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/api");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello Tejaswari!");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Application has been started on port : ${PORT}`);
});
