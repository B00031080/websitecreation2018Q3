const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/mysecret', (req, res) => res.send('You are now on my secret page. If you are not me I will have to kill you.'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));