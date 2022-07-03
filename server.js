const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.set('view engine', 'ejs');
// pass in json data
app.use(express.json());
// app.use(express.static('public'));
app.use(cookieParser());
 
// PORT
app.get('/', (req, res) => {
  res.render('index');
  // res.send('Hello World!')
})


app.get('/login', (req, res) => {
  res.render('login');
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})