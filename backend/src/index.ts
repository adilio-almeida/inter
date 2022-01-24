import 'express-async-errors'
import express from 'express';
import { globalErros } from './middlewares/globalErros';
import { Connection, createConnection } from 'typeorm';
import routes from './routes';

createConnection().then(connection => {
  const app = express();
  app.use(express.json())
  app.use(routes);

  app.use(globalErros);

  app.listen(3333, () => {
    console.log('Back-end started in 3333 port!');
  });
}).catch((error => {
  console.log('deu pau', error);
}))
