import express from 'express';
import fetch from 'node-fetch';
const url = "https://raw.githubusercontent.com/cmda-tt/course-21-22/main/tech-track-dataset.json";

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
      console.log('newObj:', newObj);
      return newObj;
    })
    .then(res => { //functies hierin zetten als then
      let newObj = []
      let answer2 = fillEmptySpots(res);
      newObj = [...answer2]
      console.log('newObj2:', newObj);
      return newObj;
    })
    .catch((error) => { // voor als er iets mis gaat
      console.log(error);
    });
};

function removeCapitals(obj){
  return obj.map((item) => {
    return item["Wat wil je worden als je groot bent?"].toLowerCase();
  });
};

function fillEmptySpots(obj){
 return obj.map((item) => {
    let str = item["Wat wil je worden als je groot bent?"];
    if (str == "") {
      return "leeg";
      console.log('str:',str);
    } else {
      return str
    }
  });
};

parseData();

  app.get('/', (req, res) => res.render('index.ejs', {
    datading: "hier komt het"
  }))



app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
 })
