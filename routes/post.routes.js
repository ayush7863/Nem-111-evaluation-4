const express=require("express")
const { PostsModel } = require("../model/post.model")
const postRouter=express.Router()
const jwt=require("jsonwebtoken")

postRouter.get("/",async (req,res)=>{
    const token=req.headers.authorization
    // const {min,max,comments,device}=req.query  
    // const query={}
    // if(min){
    //     query.comments={$gte:min}
    // }
    // if(max){
    //     if(query.comments)
    //     query.comments.$lte=max
    //     else
    //     query.comments={$lte:max}
    // } 
    // if(device){
       
    // }
    let decoded = jwt.verify(token, 'masai');  
    try {  
              
        // const posts=await PostsModel.find({$and:[{userId:decoded.userId},{query}]})
        const posts=await PostsModel.find({userId:decoded.userId})
        res.status(200).json(posts)
        
    } catch (error) {
        res.status(400).send({err:error})
    }
    

})
postRouter.get("/top/:page",async(req,res)=>{
    const {page}=req.params
    const s=(page-1)*2
    try {
        const posts=await PostsModel.find().skip(s).limit(3)
        res.status(200).json(posts)
        
        
    } catch (error) {
        
    }
})

postRouter.post("/add",async (req,res)=>{

    try {
        const posts=new PostsModel(req.body)
        await posts.save()
        res.status(200).send({"msg":"Post has been Added"})

        
    } catch (error) {
        res.status(400).send({err:error})
    }

    
})
postRouter.patch("/update/:postID",async (req,res)=>{
    const {postID}=req.params
    const payload=req.body
    try {
        await PostsModel.findByIdAndUpdate({_id:postID},payload)
        res.status(200).json({"msg":"Post has been Updated"})
        
    } catch (error) {
         res.status(400).send({err:error})
        
    }
    
})
postRouter.delete("/delete/:postID",async (req,res)=>{
    const {postID}=req.params
    try {
        await PostsModel.findByIdAndDelete({_id:postID})
        res.status(200).send({"msg":"Post has been Deleted"})
        
    } catch (error) {
        res.status(400).send({err:error})
    }
    
})
module.exports={
    postRouter
}