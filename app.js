const express = require('express')
const app = express()

const port = 3000;

const datafile = require('./tech-track-dataset.json');

app.use(express.static('static'));
app.set('view engine', 'ejs');

function showdata() {
  const vraag = "Wat wil je worden als je groot bent?"

  const uitkomst = datafile.map(antwoord =>
   antwoord[vraag].toLowerCase()
 )
 console.log(uitkomst);
 app.get('/', (req, res) => res.render('index.ejs', {
 datading: uitkomst
 }))
}

showdata()

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
