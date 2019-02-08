const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const tls = require('tls');
const knex = require('knex');



const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'fil2105ozof',
      database : 'smart-brain'
    }
  });

db.select('*').from('users').then(data => {
    console.log(data);
})

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id:'123',
            name:'john',
            email:'john@gmail.com',
            password:'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id:'124',
            name:'dusan',
            email:'dusan@gmail.com',
            password:'dusan',
            entries: 0,
            joined: new Date()
        }
    ]
}



app.get('/',(req,res) =>{ res.send(database.users);})

app.post('/signin',(req,res) => {signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res) => {image.handleImage(req,res,db)})

app.post('/imageurl',(req,res) => {image.handleApiCall(req,res)})


app.listen(3000,()=> {
    console.log('app is running on port 3000...');
});