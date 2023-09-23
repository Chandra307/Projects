const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const cors = require('cors');

const User = require('./models/user');
const Post = require('./models/posts');
const Comment = require('./models/comments');

const postRoute = require('./routes/post');

Post.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});
User.hasMany(Post);

app.use(cors());
app.use(bodyParser.json( {extended: false} ));

app.use((req, res, next) => {
    User.findOne({where: {id: 1}})
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => res.json(err));
})

app.use(postRoute);




// sequelize.sync({force: true})
sequelize.sync()
.then( () => {
    return User.findOne({where: {id: 1}});
})
.then(user => {
    if(user){
        return user;
    }
    return User.create();
})
.then(user => {
    app.listen(7000);
})
.catch(err => console.log(err));