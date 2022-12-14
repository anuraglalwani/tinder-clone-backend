import dotenv from 'dotenv';
import mongoose from "mongoose";
import  express  from "express";
import Cards from "./models/dbCards.js";
import Cors from "cors";
import Messages from "./models/dbMessages.js";
import Profile from "./models/dbProfile.js";


dotenv.config();

//app config

const app = express();
const port= process.env.PORT||8001;
//middleware
app.use(express.json());
app.use(Cors());

//db config
var mongoDB = process.env.URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.once("open",()=>{
    console.log("connected to mongodb")
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//api endpoints

app.get("/",function(req,res){
  res.status(200).send("hello kdk")

});
// 1. Of CARDS
app.post("/tinder/cards",(req,res)=>{
 const dbCards = req.body;
  Cards.create(dbCards,(error,data)=>{
      if(error){
          res.status(500).send(error)
      }
      else{
          res.status(201).send(data)
      }
  })

});

app.get("/tinder/cards",(req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    });
    
});



/// 2. Of MESSAGES

app.get("/tinder/messages",(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    });
    
});
app.post("/tinder/messages",(req,res)=>{
    const dbMessages = req.body;
     Messages.create(dbMessages,(error,data)=>{
         if(error){
             res.status(500).send(error)
         }
         else{
             res.status(201).send(data)
         }
     })
   
   });
app.delete("/tinder/messages/:id",(req,res)=>{
    const dbMessage = req.params.id;
     Messages.findByIdAndDelete(dbMessage,(error,data)=>{
         if(error){
             res.status(500).send(error)
         }
         else{
             res.status(201).send("deleted message")
         }
     })
   
   });
//profile 
   app.get("/profile",(req,res)=>{
    Profile.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    });
    
});
app.post("/profile",(req,res)=>{
    const profile = req.body;
     Profile.create(profile,(error,data)=>{
         if(error){
             res.status(500).send(error)
         }
         else{
             res.status(201).send(data)
         }
     })
   
   });

 app.put("/profile/:id",(req,res)=>{
    var user_id = req.params.id
   Profile.findByIdAndUpdate(user_id, { name: req.body.name,language:req.body.language,age:req.body.age },
    function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated User");
    }
  });
 })
 
 
// })



//app listen
app.listen(port,function(){
  console.log("listning at  started at port "+port);
 })