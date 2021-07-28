const express = require("express");
const cors = require("cors");
const routes = require('./routes/index');
const app = express();

//routes
app.use('/', routes );

app.use(function(req, res) {
  res.setHeader('Content-Type', 'text/html')
  });

app.use(cors({
  origin: 'http://localhost'
}));

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


