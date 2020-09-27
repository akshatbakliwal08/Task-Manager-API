const express=require('express');
const router=new express.Router();
const auth=require('../middleware/auth');
const Task=require('../models/task');

router.post('/tasks',auth,async(req,res)=>{
    const tasks=new Task({
        ...req.body,
        owner:req.user._id
    })
    try{
        await tasks.save();
        res.status(201).send(tasks);
    } catch(e){
        res.status(400).send(e);
    }
});

router.get('/tasks',auth,async(req,res)=>{
    try{
        const match={};
        const sort={};
        if(req.query.completed){
            match.completed=req.query.completed==='true';
        }
        if(req.query.sortBy){
            const parts=req.query.sortBy.split('_');
            sort[parts[0]]=parts[1]==='desc'?-1:1;
        }
        await req.user.populate({
            path:'task',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.send(req.user.task);
    } catch(e){
        res.status(500).send();
    }
});

router.get('/tasks/:id',auth,async(req,res)=>{
    const _id=req.params.id;
    
    try{
        const task=await Task.findOne({_id,owner:req.user._id});
        if(!task)
            return res.status(404).send();
        res.send(task);
    } catch(e){
        res.status(500).send();
    }
});

router.patch('/tasks/:id',auth,async(req,res)=>{
    const updates=Object.keys(req.body);
    const allowUpdates=['description','completed'];
    const isValidOp=updates.every((update)=>allowUpdates.includes(update));
    if(!isValidOp)
        return res.status(400).send({error:'Invalid update!!'});
    try{
        const task=await Task.findOne({_id: req.params.id,owner:req.user._id})
        // const task=await Task.findById(req.params.id);
        
        if(!task)
            return res.status(404).send();
        updates.forEach((update)=>task[update]=req.body[update]);
        await task.save();
        res.send(task);
    } catch(e){
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id',auth,async(req,res)=>{
    try{
        const task=await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id});
        if(!task)
            return res.status(404).send();
        res.send(task);
    } catch(e){
        res.status(500).send(e);
    }
});

module.exports=router;