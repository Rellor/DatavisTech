const express = require('express')
const app = express()

const port = 3000;

const datafile = require('./tech-track-dataset.json');

app.use(express.static('static'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => res.render('index.ejs', {
datading: datafile
}))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
