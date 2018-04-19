// Express Setup
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];  
const db = require('knex')(config);

app.get('/api/letters', (req, res) => {
  db('letters').select().from('letters').then(letters => {
    res.send(letters);
  }).catch(error => {
    res.status(500).json({ error });
  });
});

app.post('/api/letters', (req, res) => {
  console.log("got to app.post");
  db('letters').insert({content: req.body.content}).then(letters => {
    res.status(200).json({id:letters[0]});
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

app.delete('/api/letters/:id', (req, res) => {
  let id = parseInt(req.params.id);
  db('letters').where('id',id).del().then(tickets => {
    res.sendStatus(200);    
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

app.listen(3000, () => console.log('Server listening on port 3000!'))
