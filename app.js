const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, Jenkins! This is my updated application.');
});

app.get('/test', (req, res) => {
  res.send('This is a test route.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
