import express from 'express'
import fetch from 'node-fetch'

//de url van de dataset:
const url = "https://raw.githubusercontent.com/ajzbc/kanye.rest/master/quotes.json"

//importeer de modules vanuit de map
import {removeQuestionMarksModule} from './modules/removeQuestionMarks.js'
import {removeCapitalsModule} from './modules/removeCapitals.js'
import {removeDotsModule} from './modules/removeDots.js'
import {removeExclamationMarksModule} from './modules/removeExclamationMarks.js'

const app = express()

const port = 3000

app.use(express.static('static'))
app.set('view engine', 'ejs')

let outcome1 = []
let outcome2 = []
let outcome3 = []
let outcome4 = []

function parseData() {
  return fetch(url) //Deze werkt ook als Promise
    .then(res => res.json()) //convert de parameter naar een JSON string met de JSON.stringify() method
    .then(res => { outcome1 = removeQuestionMarksModule(res); return outcome1 }) //eerste output pakt de res op, gooit de function eroverheen en gooit outcome1 eruit
    .then(res => { outcome2 = removeCapitalsModule(outcome1); return outcome2 }) //tweede output pakt de uitkomst op van de eerste then, gooit de functie eroverheen en gooit outcome2 eruit
    .then(res => { outcome3 = removeDotsModule(outcome2); return outcome3 })
    .then(res => { outcome4 = removeExclamationMarksModule(outcome3); return outcome4 })
    .catch((error) => { // voor als er iets mis gaat
      console.log(error)
    });
};

  app.get('/', (req, res) => res.render('index.ejs', {
    datading: outcome4 //laat outcome4 zien. Dit zijn alle functies in 1
  }))

parseData()

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
 })
