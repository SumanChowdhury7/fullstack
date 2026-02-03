const express = require('express');
const app = express();
const noteModel = require('./models/notes.models');
const cors = require('cors')


app.use(express.json());

app.use(cors());

app.post('/notes', async (req,res)=>{
const {title, description} = req.body;

const note = await noteModel.create({
    title,description
})
res.status(201).json({
    message: "Created Sucessfully",
    data: note
})
})


app.get('/notes', async (req,res)=>{
const note = await noteModel.find();

res.status(200).json({
    message: "Fetched sucessfully",
    data: note
})
})

app.delete('/notes/:id', async (req,res)=>{
const id = req.params.id;
console.log(id)
 await noteModel.findByIdAndDelete(id);

res.status(200).json({
    message: "note deleted"
})
})

app.patch('/notes/:id', async (req,res)=>{
const id = req.params.id;
const {description} = req.body;

await noteModel.findByIdAndUpdate(id, {description});

res.status(200).json({
    message: "updated sucessfully"
})
})



module.exports = app;