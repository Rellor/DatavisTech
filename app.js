import express from 'express';
import fetch from 'node-fetch';
const url = "https://raw.githubusercontent.com/cmda-tt/course-21-22/main/tech-track-dataset.json";

const app = express()

const port = 3000;

app.use(express.static('static'));
app.set('view engine', 'ejs');

function parseData() {
  return new Promise((resolve, reject) => {
    fetch(url).then((response) => {
      if (response.ok) resolve(response.json());
      else throw new Error("Something went wrong");
    });
  })
    .then((res) => { //functies hierin zetten als then
      let answer = removeCapitals(res);
      return answer;
    })
    // .then((res) => { //functies hierin zetten als then
    //   let answer2 = fillEmptySpots(res);
    //   console.log('answer2:', answer2);
    //   return answer2;
    // })
    .catch((error) => { // voor als er iets mis gaat
      console.log(error);
    });
};

function removeCapitals(obj){
  return obj.map((item) => {
    let str = item["Wat wil je worden als je groot bent?"].toLowerCase();
          console.log(str);
  });
};

// function fillEmptySpots(obj){
//  return obj.map((item) => {
//     let str = item["Wat wil je worden als je groot bent?"];
//     if (str.length < 1) {
//       return "leeg";
//       console.log('str:',str);
//     } else {
//       return str
//     }
//   });
// };

parseData();

  app.get('/', (req, res) => res.render('index.ejs', {
    datading: "hier komt het"
  }))



app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
 })
