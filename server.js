const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

// Google Auth
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '692461028963-u7nr33cbuuj79apd9194nu9pc13iqlio.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

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

// line 14-23 in login.ejs
app.post('/login', (req, res) => {
  let token = req.body.token;

  //console.log(token);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  
    });
    const payload = ticket.getPayload();
    //for database stuff
    const userid = payload['sub'];
    console.log(payload)
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }
  verify()
    .then(() => {
      res.cookie('session-token', token);
      res.send('success');
    }).
    catch(console.error);
})

app.get('/profile', (req, res) => {
  let user = req.user;
res.render('profile', { user });
})

app.get('/logout', (req, res) => {
  res.clearCookie('session-token');
  res.redirect('/login');
})

app.get('/protectedroute', (req, res) => {
  res.render('protectedroute.ejs');
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})