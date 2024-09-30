const express = require('express');
const app = express();
const path = require('path');

const userModel = require('./models/usermodel');
const { name } = require('ejs');

app.set('view engine', 'ejs');  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', function(req, res) {
    res.render("index")
});

app.get('/read', async (req, res) => {
    let allUsers =  await userModel.find()
    res.render("read", {users: allUsers});
})

app.post('/create', async (req, res) => {
    let {name, email, image} = req.body;
   let createUser = await userModel.create({
        name,
        email,
        image
    });
    res.send(createUser);
});

app.get('/delete/:id', async (req, res) => {
    await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read")
    console.log("user deleted successfully..!")
})

app.listen(3000, function(){
    console.log("server is running...")
})