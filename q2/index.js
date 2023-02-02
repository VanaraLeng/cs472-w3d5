const express = require('express');
const app = express();
const path = require('path');
const bparser = require('body-parser');

app.use(bparser.urlencoded());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/result', (req, res) => {
  let name = req.body.name;
  let age = req.body.age;
  console.log(name);
  res.send(`Welcome ${name}, ${age} years old`);
})

app.listen(3000, () => { 
    console.log('Server is running at port 3000');
})