import express from 'express';
import fetch from 'node-fetch';
const url = "https://raw.githubusercontent.com/cmda-tt/course-21-22/main/tech-track-dataset.json";

const app = express()

const port = process.env.PORT || 3000

app.use(express.static('static'));
app.set('view engine', 'ejs');

function parseData() {
  return fetch(url) //Deze werkt ook als Promise
    .then(response => response.json())
    .then(res => {
      let newObj = []
      let answer = removeCapitals(res);
      let answer2 = fillEmptySpots(res);
      newObj = [...answer]
      newObj = [...answer2]
      return newObj;
    })
    .catch((error) => { // voor als er iets mis gaat
      console.log(error);
    });
};

function removeCapitals(obj){ // function removeCapitals aanmaken en obj meegeven
  return obj.map((item) => { // object mappen en daar item vandaan halen
    return item["Wat wil je worden als je groot bent?"] // de item "wat wil je worden.." uit de obj halen
    .toLowerCase(); // de uitkomst van item pakken en dit omzetten naar kleine letters
  });
};

function fillEmptySpots(obj){ // function fillEmptySpots aanmaken en obj meegeven
 return obj.map((item) => { // object mappen en daar item vandaan halen
    let str = item["Wat wil je worden als je groot bent?"]; // de uitkomst van item een string maken en die str noemen
    if (str == "") { // if statement maken dat als str leeg is dan...
      return "leeg"; // het antwoord leeg meegeven als de string leeg is
    } else { // else statement
      return str // de normale uitkomst van str meegeven als het veld niet leeg is
    }
  });
};

parseData();

  app.get('/', (req, res) => res.render('Index', {
    datading: "hier komt het"
  }))



app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
 })
