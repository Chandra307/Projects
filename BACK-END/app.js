const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');

const sequelize = require('./util/database');
const userRoute = require('./routes/post');
const deleteRoute = require('./routes/deleteUser');

app.use(cors());

app.use(bodyParser.json( {extended: false} ));

app.use(userRoute);
app.use('/user',deleteRoute);

sequelize.sync()
.then( (r) => {
    app.listen(3000)
})
.catch(err => console.log(err));
