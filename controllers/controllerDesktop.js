const BlogPost = require('../models/BlogPost.js')
module.exports = async (req,res)=>{
    const blogposts = await BlogPost.find({title: new RegExp('Desktop'+'*', "i")})
    res.render('index_desktop_only',{
        blogposts
    });
}