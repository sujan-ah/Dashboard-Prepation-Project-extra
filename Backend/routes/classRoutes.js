const express = require('express')
const Class = require('../model/class.js')

const classRouter = express.Router()

classRouter.post('/', function (req, res) {
    const classes = {
        batch: req.body.batch,
        time: req.body.time,
        room: req.body.room,
        user: req.body.user,
    }
    let abc = new Class(classes)
    abc.save()
    console.log(abc);
})
classRouter.get('/', async (req,res)=>{
    const classes = await Class.find()
    res.send(classes)
})

classRouter.post('/del', function (req, res) {
    console.log(req.body.id)
    Class.findByIdAndDelete(req.body.id, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted : ", docs);
        }
    });
})

classRouter.get('/:id', async (req,res)=>{
    console.log(req.params);
    const classes = await Class.findById(req.params.id)
    res.send(classes)
})
classRouter.put('/edit', async (req,res)=>{
    console.log(req.body.id);
    console.log(req.body.name);
    console.log(req.body.time);
    console.log(req.body.details);
    let pro = {
        batch: req.body.batch,
        time: req.body.time,
        room: req.body.room,
    }
    Class.findByIdAndUpdate(req.body.id, pro,function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Edited : ", docs);
        }
    });
})

module.exports = classRouter