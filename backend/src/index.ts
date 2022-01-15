import express from 'express';
const db = require('../routes/user')

const app = express();

app.get('/', (request, response) =>
  response.json({
    message: 'Server express',
  }),
);

app.listen(3333, () => {
  console.log('Back-end started in 3333 port!');
});

app.get('/get-users', db.getUsers)
