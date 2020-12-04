







const express= require('express')
const path = require('path')

const app = new express()
const ejs = require('ejs')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const BlogPost = require('./models/BlogPost.js')

mongoose.connect('mongodb://localhost/mydatabase', {useNewUrlParser: true});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.listen(2020, ()=> {
    console.log('App is listenning');
})

app.get('/',(req,res)=>{
    //res.sendFile(path.resolve(__dirname, 'public/index.html'))
    res.render('index');
})

app.get('/index',(req,res)=>{
    //res.sendFile(path.resolve(__dirname, 'public/index.html'))
    res.render('index');
})

app.get('/about',(req,res)=>{
    //res.sendFile(path.resolve(__dirname, 'public/about.html'))
    res.render('about');
})

app.get('/contact',(req,res)=>{
    //res.sendFile(path.resolve(__dirname, 'public/contact.html'))
    res.render('contact')
})

app.get('/post',(req,res)=>{
    //res.sendFile(path.resolve(__dirname, 'public/post.html'))
    res.render('post');
})

app.get('/posts/new',(req,res)=>{
    res.render('create')
})

app.post('/posts/store',(req,res)=>{
    BlogPost.create(req.body, (error, blogpost) =>{
        console.log(req.body)
        res.redirect('/')
    })
})






