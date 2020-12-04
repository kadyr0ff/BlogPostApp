const path = require('path')
const ejs = require('ejs')
const express= require('express')
const expressSession = require('express-session')
const fileUpload = require('express-fileupload')
const app = new express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const BlogPost = require('./models/BlogPost.js')
mongoose.connect('mongodb+srv://kdf:punch@mongoclusterkdf.lb7h7.mongodb.net/test', {useNewUrlParser: true})

const controllerValMiddleWare = require('./controllers/controllerValMiddleWare')
const controllerAuthMiddleWare = require('./controllers/controllerAuthMiddleWare')
const controllerRedirectIfLoggedMiddleWare = require('./controllers/controllerRedirectIfLoggedMiddleWare')

const controllerHome = require('./controllers/controllerHome')
const controllerGetPost = require('./controllers/controllerGetPost')
const controllerNewPost = require('./controllers/controllerNewPost')
const controllerStorePost = require('./controllers/controllerStorePost')
const controllerAbout = require('./controllers/controllerAbout')
const controllerContact = require('./controllers/controllerContact')
const controllerNewUser = require('./controllers/controllerNewUser')
const controllerStoreUser = require('./controllers/controllerStoreUser')
const controllerLogin = require('./controllers/controllerLogin')
const controllerLoginUser = require('./controllers/controllerLoginUser')
const controllerLogout = require('./controllers/controllerLogout')

app.listen(2020, ()=> {
	console.log('App is listenning');
})
app.use(expressSession({
	secret: 'keyboard cat'
}))

global.loggedIn = null;
app.use("*", (req, res, next) => {
	global.loggedIn = req.session.userId;
	next();
})

app.use(fileUpload())


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(flash())

app.get('/post/:id', controllerGetPost)
app.get('/about', controllerAbout)
app.get('/posts/new', controllerAuthMiddleWare, controllerNewPost)
app.get('/',controllerHome)
app.get('/contact', controllerContact)
app.use('/posts/store', controllerValMiddleWare, controllerStorePost)
app.post('/posts/store', controllerValMiddleWare, controllerStorePost)
app.get('/auth/register', controllerRedirectIfLoggedMiddleWare, controllerNewUser)
app.post('/users/register', controllerRedirectIfLoggedMiddleWare, controllerStoreUser)
app.get('/auth/login', controllerRedirectIfLoggedMiddleWare, controllerLogin);
app.post('/users/login', controllerRedirectIfLoggedMiddleWare, controllerLoginUser)
app.get('/auth/logout', controllerLogout)
app.use(((req, res) => res.render('notfound')))


