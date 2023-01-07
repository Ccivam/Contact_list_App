const express=require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');//It should be before express()
const Contact=require('./Models/contact');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));//Include css and js files
//Middleware1
//app.use(function(req,res,next){
//console.log('Middleware 1 called');
//next();
//})
//Middleware1 ends here
//Middleware 2 
//app.use(function(req,res,next){
//    console.log("Middleware 2 called");
//    next();
//})
var contactlist=[
     {
        name:"Arpan",
        phone:"1111111111"
      },
      {
        name:"Tony Stark",
        phone:"1234567890"
      },
      {
        name:"Coding ninjas",
        phone:"443534646"
      }
]
app.get('/',function(req,res){
     Contact.find({},function(err,contact){
           if(err){
            console.log("Error in fetching contacts from db");
            return;
           }
           res.render('home',{
            title:"contact_list",
            contact_list:contact
          })
     });
      
});
app.post("/create-contact",function(req,res){
    //return res.redirect('/practice'); //redirect tells browser go to that route
     /* contactlist.push({
        name:req.body.name,
        phone:req.body.phone
     });*/
    // contactlist.push(req.body);
     //return res.redirect('home');
     Contact.create({
      name:req.body.name,
      phone:req.body.phone
     },function(err,newContact){
           if(err){
            console.log("error in creating contact");
            return;
           }
           console.log("*****",newContact);
            return res.redirect('back');
     });
     //return res.redirect('back');
});
app.get('/delete-button/',function(req,res){
  //get the id from query in the URL
    var id=req.query.id;     
  //find the contact in the data using id and delete it
    Contact.findByIdAndDelete(id,function(err){
      if(err){
        console.log("error in deleting from dayabase");
        return;
      }
      res.redirect('back');
    })
    
});
app.listen(port);

