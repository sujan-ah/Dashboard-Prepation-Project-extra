const express = require('express')
const Activity = require('../model/activity.js')

const activityRouter = express.Router()

activityRouter.post('/', function (req, res) {
    const activitie = {
        name: req.body.name,
        time: req.body.time,
        details: req.body.details,
        user: req.body.user,
    }
    let abc = new Activity(activitie)
    abc.save()
    // console.log(abc);
})
activityRouter.get('/', async (req,res)=>{
    const activitie = await Activity.find()
    res.send(activitie)
})

activityRouter.post('/del', function (req, res) {
   console.log(req.body.id)
    Activity.findByIdAndDelete(req.body.id, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted : ", docs);
        }
    });
})

activityRouter.get('/:id', async (req,res)=>{
    console.log(req.params);
    const activitie = await Activity.findById(req.params.id)
    res.send(activitie)
})
activityRouter.put('/edit', async (req,res)=>{
    console.log(req.body.id);
    console.log(req.body.name);
    console.log(req.body.time);
    console.log(req.body.details);
    let pro = {
        name: req.body.name,
        time: req.body.time,
        details: req.body.details,
    }
    Activity.findByIdAndUpdate(req.body.id, pro,function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Edited : ", docs);
        }
    });
})

module.exports = activityRouter