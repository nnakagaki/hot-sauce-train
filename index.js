const express = require('express')
const path = require('path')
const moveTrain = require('./movetrain.js');
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser');
var app = express();

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.use(bodyParser.urlencoded());

app.post('/move-the-train', (req, res) => {
  const stopNumber = req.body.stopNumber;

  res.status(200).send({
    success: 'true',
    message: 'train moved to stop ' + stopNumber
  })

  moveTrain(stopNumber);
});