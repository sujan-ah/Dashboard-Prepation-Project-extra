const express = require('express')
const Details = require('../model/details.js')

const detailRouter = express.Router()

detailRouter.post('/', function (req, res) {
  const details = {
    name: req.body.name,
    designation: req.body.designation,
    officetime: req.body.officetime,
    dayoff: req.body.dayoff,
    user: req.body.user,
  }
  let abc = new Details(details)
  abc.save()
})
detailRouter.get('/', async (req,res)=>{
  const details = await Details.find()
  res.send(details)
})

detailRouter.post('/del', function (req, res) {
  console.log(req.body.id)
  Details.findByIdAndDelete(req.body.id, function (err, docs) {
    if (err){
      console.log(err)
    }
    else{
      console.log("Deleted : ", docs);
    }
  });
})

detailRouter.get('/:id', async (req,res)=>{
  console.log(req.params);
  const activitie = await Details.findById(req.params.id)
  res.send(activitie)
})
detailRouter.put('/edit', async (req,res)=>{
  let pro = {
      name: req.body.name,
      designation: req.body.designation,
      officetime: req.body.officetime,
      dayoff: req.body.dayoff,
  }
  Details.findByIdAndUpdate(req.body.id, pro,function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Edited : ", docs);
      }
  });
})

module.exports = detailRouter