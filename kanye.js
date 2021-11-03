import express from 'express';
import fetch from 'node-fetch';
// const url = "https://api.kanye.rest";
const url = "https://raw.githubusercontent.com/ajzbc/kanye.rest/master/quotes.json";

const app = express()

const port = 3000;

app.use(express.static('static'));
app.set('view engine', 'ejs');

let newObj = []

function parseData() {
  return fetch(url) //Deze werkt ook als Promise
    .then(response => response.json())
    .then(res => { //functies hierin zetten als then
      let answer = removeQuestionMarks(res);
      let answer2 = removeCapitals(res);
      newObj = [...answer]
      newObj = [...answer2]
      console.log('newObj!!:', newObj);
      return newObj;
      latenZien = newObj
    })

    .catch((error) => { // voor als er iets mis gaat
      console.log(error);
    });
};

function removeCapitals(obj){
  return obj.map((item) => {
    return item.toLowerCase();
  });
};

function removeQuestionMarks(obj){
  return obj.map((item) => {
    return item.replaceAll("?", "");
    console.log('no?:', newObj);
  });
};

  app.get('/', (req, res) => res.render('index.ejs', {
    datading: newObj
  }))

parseData();

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
 })
