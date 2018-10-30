// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

const isInvalidDate = (date) => {
    return (new Date(date) === "Invalid Date") || isNaN(new Date(date));
}

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  const date_string = req.params.date_string;
  let date = null;
  let unixFormat = parseInt(date_string * 1);
  
  if (!date_string) {
    date = new Date();
  } else if (isNaN(unixFormat)) {
    date = new Date(date_string);
  } else if (Number.isInteger(unixFormat)) {
    date = new Date(unixFormat);
  }
  
  if (isInvalidDate(date)) res.json({"error" : "Invalid Date" });
  
  
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});