const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const mongoose = require('mongoose');
const morgan = require('morgan'); // used to see requests
const app = express();
const db = require('./models');
const PORT = process.env.PORT || 3001;

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// Setting CORS so that any website can
// Access our API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

//log all requests to the console
app.use(morgan('dev'));

// Setting up express to use json and set it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/appDB', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

// Init the express-jwt middleware
const isAuthenticated = exjwt({
  secret: 'all sorts of code up in here'
});


// LOGIN ROUTE
app.post('/api/login', (req, res) => {
  db.User.findOne({
    email: req.body.email
  }).then(user => {
    user.verifyPassword(req.body.password, (err, isMatch) => {
      if(isMatch && !err) {
        let token = jwt.sign({ id: user._id, email: user.email }, 'all sorts of code up in here', { expiresIn: 129600 }); // Sigining the token
        res.json({success: true, message: "Token Issued!", token: token, user: user} );
        
      } else {
        res.status(401).json({success: false, message: "Authentication failed. Wrong password."});
      }
    });
  }).catch(err => res.status(404).json({success: false, message: "User not found", error: err}));
});

//POST ITEMS ROUTE
app.post('/api/additem', isAuthenticated, (req, res) => {
  db.Item.create(req.body)
    .then(dbItem => {
      return db.User.findOneAndUpdate({}, { $push: { items: dbItem._id }}, { new :true});
      
    })
    .then(dbUser =>{
      res.json(dbUser)
    })
    .catch(err => res.status(400).json(err));
});




app.get('/api/getitem/:id', isAuthenticated, (req, res)=>{
  db.Item.findById(req.params.id)
  .then(data => {
    if(data) {
      res.json(data);
    } else {
      res.status(404).send({success: false, message: 'No user found'});
    }
  })
})


// SIGNUP ROUTE
app.post('/api/signup', (req, res) => {
  db.User.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

// Any route with isAuthenticated is protected and you need a valid token
// to access
app.get('/api/user/:id', isAuthenticated, (req, res) => {
  db.User.findById(req.params.id)
  .populate("items")
  .then(data => {
    if(data) {
      res.json(data);
      console.log(data)
    } else {
      res.status(404).send({success: false, message: 'No user found'});
    }
  })
  .catch(err => res.status(400).send(err));
});

app.get('/api/allitems', (req, res) => {
  db.Item.find({})
  .then(data =>res.json(data))
  .catch(err => res.statusMessage(400).json(err))
})

app.get('/api/allusers', (req, res) => {
  db.User.find({})
    .populate("items")
    .then(data => res.json(data))
    .catch(err => res.statusMessage(400).json(err))
});
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


app.get('/', isAuthenticated /* Using the express jwt MW here */, (req, res) => {
  res.send('You are authenticated'); //Sending some response when authenticated
});

// Error handling
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
    res.status(401).send(err);
  }
  else {
    next(err);
  }
});

// start chat code

users = [];
connections = [];


//Needs to verify user (socket.on(VERIFY_USER), Then connect with username)
io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log("connected: %s sockets connected", connections.length);


    //Disconnect
    socket.on('disconnect', function(data){
        // if(!socket.username) return;
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnected: %s sockets connected", connections.length);
    });
    

    //send message
    socket.on('send message', function(data){
        // console.log(data)
        io.sockets.emit('new message', {msg: data, user:socket.username})
    });

    //new user
    socket.on('new user', function(data, callback){
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    });

    function updateUsernames(){
        io.sockets.emit('get users', users);
    }
});
//end chat code

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
