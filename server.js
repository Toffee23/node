const express = require('express');
const session = require('express-session');
const passport = require('passport');
const productRoutes = require('./routes/productRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
require('./auth');

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}
const app = express();

// set up view engine 
app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser());
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes); 
app.use("/api/v1/product", productRoutes);

mongoose.connect("mongodb://localhost:27017/ecommerce")
.then(() => console.log ("Connected to MongoDB..."))
.catch((err) => console.error("Could not connect to MongoDB..."))

app.use(express.json());

app.get("/", (req, res) => {
   res.send('<a href="/auth/google">Authenticate with Google</a>');
});

 app.get('/auth/google',  
    passport.authenticate('google',  { scope: 'profile' })
 );

  app.get('/', (req, res) => {
   res.render('home');
 });

 app.get('/auth/google/redirect',  passport.authenticate('google'), (req, res) => {
   res.send('you reached the redirect URL');
 });

 app.get('/auth/failure', (req, res) => {
    res.send('something went wrong...');
 });


app.get("/protected", isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
 });

 app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye');
 });

 
//PORT
const port = process.env.PORT|| 3000;
app.listen(port, () => console.log("Listening on port 3000..."));
