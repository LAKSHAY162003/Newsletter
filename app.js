const express=require("express");
const bodyParser=require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

// Api key
// e5f373c78e01a0159cab0b634bee9083-us9
mailchimp.setConfig({
    apiKey: "e5f373c78e01a0159cab0b634bee9083-us9",
    server: "us9",
  });



app.get("/",(req,res)=>{ 
    res.sendFile(__dirname+"/index.html");
});

app.post("/",(req,res)=>{
        let firstName=req.body.name1;
        let secondName=req.body.name2;
        let email=req.body.email;
        const listId = "cc89151867";
    //Creating an object with the users data
    const subscribingUser = {
        firstName: firstName,
        lastName: secondName,
        email: email
    };
//Uploading the data to the server
//  async function run() {

    // so : here :in this mailchimp ka fnc 
    // they could have used : anything like : 
    // axios and all to make the post request !!
    // and idea is that : jahan aisa nahi kiya jata joki 
    // mostly nahi kara jata 
    // in those cases : https.get() and https.request() can be used 
    // https.request() me : apka : auth paramter se 
    // Aunthentication kar sakte ho as stated in documents !!!
    // and usme user name and pwd kya dalna hoga : wo aap simply
    // check kar sakte ho : jo api use kar rahe ho uski docs me !!

//     const https = require('node:https');

// https.get('https://encrypted.google.com/', (res) => {
//   console.log('statusCode:', res.statusCode);
//   console.log('headers:', res.headers);

//   res.on('data', (d) => {
    // d is the jSON DATA !!
//     process.stdout.write(d);
//   });

// }).on('error', (e) => {
//   console.error(e);
// });

// WAY TO MAKE : HTTPS.GET() METHOD SE GET REQUESTS !!!
// URL , CALLBACK FNC !!

// SIMILARLY : WHAT ANGELA TOLD (URL,OPTIONS{PARAMETERS BASICALLY },CALLBACK)
// YE https.request() ka syntax ho jata hai that is thereby used 
// to make post calls !!


// it is returning a promise indeed !!! 
mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}}).then(()=>{
        res.sendFile(__dirname+"/success.html");
    }).catch((err)=>{
        res.sendFile(__dirname+'/failure.html');
    });

});

// to serve static files like : images , css stylesheets { external one !! }
// app.use(express.static("public"));
// fir public naam ke folder me hi sare cheezen daal do and then url ko same rakho !!
// like : /images/img1.png !!


app.listen(process.env.PORT || 3000,function(){
    console.log("Server started !!");
})


