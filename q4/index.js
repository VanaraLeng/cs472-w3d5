const express = require('express');
const app = express();
const path = require('path');
const bparser = require('body-parser');

app.use(bparser.urlencoded());
app.use('/css', express.static(path.join(__dirname, 'css')));

app.get('/', (req, res) => {

  const date_ob = new Date();
  const hour = date_ob.getHours();

  const css = hour > 6 && hour < 18 ? "/css/day.css" : "/css/night.css";

  res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Document</title>
          <link href=${css} rel="stylesheet">
      </head>
      <body>
          <form action="/result" method="post">
              <label for="name">Name</label>
              <input type="text" id="name" name="name">

              <label for="age" name="age">Age</label>
              <input type="text" id="age" name="age">

              <input type="submit" value="Submit Query">
          </form>
      </body>
      </html>
  `);
});

app.post('/result', (req, res) => {
  let name = req.body.name;
  let age = req.body.age;
  res.redirect(`/output?name=${name}&age=${age}`);
});

app.get('/output', (req, res) => {
    let name = req.query.name;
    let age = req.query.age;

    if (!name) {
        name = "person";
    }

    if (!age) {
        age = 0;
    }
    
    res.send(`Welcome ${name}, ${age} years old`);
});

app.listen(3000, () => { 
    console.log('Server is running at port 3000');
});