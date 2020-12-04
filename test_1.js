const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/mydatabase',{useNewUrlParser:true})

BlogPost.create({
	title: "Title 123", 
	body: "Body text"
},(error, blogpost)=>{
	console.log(error, blogpost)
})