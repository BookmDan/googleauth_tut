const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));


// PORT
app.get('/', (req, res) => {
  res.render('index');
  // res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})