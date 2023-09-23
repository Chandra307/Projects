const User = require('../models/user');

const Post = require('../models/posts');

exports.addPost = async (req, res, next) => {
    try{

        req.User
        .createPost({
            imageUrl: req.body.link,
            description: req.body.desc
        })
    }catch(e){
        res.json(e);
    }
}