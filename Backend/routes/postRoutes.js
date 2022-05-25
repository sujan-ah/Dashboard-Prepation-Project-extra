const express = require('express')
const Post = require('../model/post.js')

const postRouter = express.Router()

postRouter.post('/', function (req, res) {
  const posts = {
    activity: req.body.activity,
    hour: req.body.hour,
    details: req.body.details,
    user: req.body.user,
  }
  let abc = new Post(posts)
  abc.save()
  console.log(abc);
})
postRouter.get('/', async (req,res)=>{
  const posts = await Post.find()
  res.send(posts)
})

postRouter.post('/del', function (req, res) {
  console.log(req.body.id)
  Post.findByIdAndDelete(req.body.id, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted : ", docs);
    }
  });
})

postRouter.get('/:id', async (req,res)=>{
  console.log(req.params);
  const post = await Post.findById(req.params.id)
  res.send(post)
})
postRouter.put('/edit', async (req,res)=>{
  let pro = {
    activity: req.body.activity,
    hour: req.body.hour,
    details: req.body.details,
  }
  Post.findByIdAndUpdate(req.body.id, pro,function (err, docs) {
      if (err){
        console.log(err)
      }
      else{
        console.log("Edited : ", docs);
      }
  });
})

module.exports = postRouter