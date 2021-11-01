import express from 'express';
import fetch from 'node-fetch';
// const url = "https://api.kanye.rest";
const url = "https://raw.githubusercontent.com/ajzbc/kanye.rest/master/quotes.json";

const app = express()

const port = 3000;

app.use(express.static('static'));
app.set('view engine', 'ejs');

function parseData() {
  return fetch(url) //Deze werkt ook als Promise
    .then(response => response.json())
    .then(res => { //functies hierin zetten als then
      let newObj = []
      let answer = removeCapitals(res);
      newObj = [...answer]
      console.log('newObj!!:', newObj);
      return newObj;
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

parseData();

  app.get('/', (req, res) => res.render('index.ejs', {
    datading: newObj
  }))



app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
 })