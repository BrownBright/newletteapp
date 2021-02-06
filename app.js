const express = require('express');
const bodyParser = require("body-parser");
const request = require("request");
const axios = require('axios').default;

const app = express();


app.use(express.static("publics"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req , res )=>{
    res.sendFile(__dirname+"/index.html");
})

app.post('/' , function (req , res){
    var list_id = 'c93cad27fc'
    var url = "https://us7.api.mailchimp.com/3.0/lists/"+ list_id +"/members?skip_merge_validation=<SOME_BOOLEAN_VALUE>"
    var authintecation = {username : 'Testarea' ,
        password: '*********************'}
    var firstname = req.body.fname ;
    var lastname = req.body.lname ;
    var Email = req.body.email ;
    var data = {
        email_address : Email ,
        email_type : "text" , 
        status:"subscribed" ,
        merge_fields:{
            FNAME : firstname , 
            LNAME : lastname
        }
    }
    const jsonData = JSON.stringify(data);
    axios.post(url,jsonData,{
        auth: authintecation
}).then(function (response) {
    if (response.status === 200){
        console.log(response.status);
        res.sendFile(__dirname+"/sucess.html");
    }else{
        console.log(response.status);
        res.sendFile(__dirname+"/failed.html");
    }
  }).catch(function (error) {
      console.log(error);
    res.sendFile(__dirname+"/failed.html");
  })
})

app.post("/failed.html" , function(req, res){
    console.log("redirect called")
    res.redirect("/");
})




const port = process.env.PORT ;

app.listen(port || 3000 , function(req, res){
    console.log("server listening at " + port)
})


//  api key 
//  ***************************
//list id 
//  c93cad27fc


///{"email_address":"","email_type":"","status":"subscribed","merge_fields":{}}
