const express = require('express');
const app = express();
const port = 3000;

app.all ('/', (req, res) => {
  res.send("balls")
  console.log("a")
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
