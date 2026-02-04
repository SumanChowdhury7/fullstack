const express = require('express');
const cors = require('cors');
const app = express();
const noteModel = require('./models/notes.models')
const path = require('path')

app.use(express.json());
app.use(cors());
app.use(express.static('./public'))

app.post('/notes', async (req,res)=>{
const {title,description} = req.body;

const note = await noteModel.create({
    title,description
})

res.status(201).json({
    message: "Note created",
    note
})
})

app.get('/notes', async (req,res)=>{
const note = await noteModel.find();

res.status(200).json({
    message: "Fetched Sucessfully",
    note
})
})

app.delete('/notes/:idx', async (req,res)=>{
await noteModel.findByIdAndDelete(req.params.idx);

res.status(200).json({
    message: "Deleted Sucessfully!"
})
})

app.patch('/notes/:idx', async (req,res)=>{
    const {description} = req.body
await noteModel.findByIdAndUpdate(req.params.idx,{description})

res.status(200).json({
    message: "Updated Sucessfully!"
})
})
app.use('*name',(req,res)=>{
res.sendFile(path.join(__dirname, "..","/public/index.html"))
})



module.exports = app;