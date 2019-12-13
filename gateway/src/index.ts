import express from 'express';
import * as request from 'request-promise';
const app = express();
const port = 8080;
app.get('/api/v1/hey', (req, res) => res.send('Hello World!'));

app.get('/api/v1/book/:id', async (req, res) => {
  const headers = { headers: { authorization: req.get('authorization') } };
  request
    .get('http://auth-service.default.svc.cluster.local', headers)
    .then(data => {
      request
        .get(
          `http://book-service.default.svc.cluster.local/api/v1/book/${req.params.id}`
        )
        .then(book => res.json(book))
        .catch(err => res.status(404).send('Book Not Found'));
    })
    .catch(err => res.status(403).send('Access Denied'));
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
