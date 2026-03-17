const express = require("express");
const app = express();
const port = 5403;

app.get("/", (req, res) => {
  res.send("HUNTER X HUNTERで結婚したいキャラはナックルかレオリオです");
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
