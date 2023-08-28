require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const session = require('express-session');
const port =process.env.PORT || 5500;
const {Notes,User} = require('./Modules/Database');
const { ObjectId } = require('mongodb');

app.use(bp.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(session({
    secret:  process.env.SESSION_SECRET || 'kjbjhbfvhfv',
    resave: false,
    saveUninitialized: true,
    cookie:
    {
        httpOnly: true,
        maxAge: 3600000,
    }
}))

app.get("/",(req,res)=>
{
    res.send('Hello');
})

app.post("/addnote",async(req,res)=>
{
    let data =req.body;
    let responce =await(await Notes()).insertOne(data);
    console.log(responce);
    res.status(200).json(responce);
})
app.get("/getnotes",async(req,res)=>
{
    let data= await (await Notes()).find().toArray();
    res.status(200).json(data);
})
app.post("/getnote",async(req,res)=>
{
    let data = await(await Notes()).findOne({_id:ObjectId(req.body.id)});
    return res.status(200).json(data);
})
app.post("/deletenote",async(req,res)=>
{
    try {
        let id =req.body.id;
        console.log(id);
        let data = await (await Notes()).deleteOne({_id:ObjectId(id)});
        console.log('inside deletenote ',data);
        res.json(data);
        
    } catch (error) {
        res.json({message:'Error occured'});
    }
})
app.post("/editnote", async (req, res) => {
  try {
    const id = req.body.id;
    const updatedFields = {
      heading: req.body.heading,
      text: req.body.text
    };

    // Remove fields with empty values
    for (const key in updatedFields) {
      if (updatedFields[key] === "") {
        delete updatedFields[key];
      }
    }

    // Update the document in the database
    const result = await (await Notes()).updateOne({_id: ObjectId(id)}, {$set: updatedFields});

    console.log("Document updated:", result);

    return res.status(200).json({message: "Document updated successfully"});
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({error: "An error occurred"});
  }
});

app.post("/editprogress",async(req,res)=>
{
    let id =req.body.id;
    let progress =req.body.progress;
    let responce =(await (await Notes()).updateOne({_id:ObjectId(id)},{$set:{progress:progress}})).acknowledged;
    if(responce)
    {
        return res.status(200).json({message:'Successfully Edited'});
    }
    return res.status(300).json({message:'Not Edited'})
});
app.get("/sortpriority",async(req,res)=>
{
    let data =await (await Notes()).find().toArray();
    const sortedData = data.sort((a, b) => {return a.priority === "true" && b.priority === "false" ? -1 : 1;});
    console.log(sortedData);
    return res.status(200).json(sortedData);
});
app.get("/sortdate", async (req, res) => {
  try {
    const data = await (await Notes()).find().toArray();
    const sortedData = [];
    const invalidDates = [];

    data.forEach((doc) => {
      const date = new Date(doc.Date);
      console.log(date.toString());

      if (!isNaN(date) && date.toString() != "Invalid Date") {
        // Valid date
        sortedData.unshift(doc); // Add to the beginning
      } else 
      {
        // Invalid date
        invalidDates.push(doc); // Add to the invalid dates array
      }
    });

    // Append invalid date data to the end
    sortedData.push(...invalidDates);

    console.log("Sorted data:", sortedData);

    return res.status(200).json(sortedData);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({error: "An error occurred"});
  }
});
app.get("/sortprogress",async(req,res)=>
{
    let data = await(await Notes()).find().toArray();
    const sortedData = data.sort((a, b) => {
        let first =Number(a.progress);
        let second =Number(b.progress);
      return a.progress > b.progress ? -1 : 1;
    });
    console.log(sortedData);
    return res.status(200).json(sortedData);
});


app.listen(port,()=>{console.log(`server is running on http://localhost:${ port}`)});