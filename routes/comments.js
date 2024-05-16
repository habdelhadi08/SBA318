const express= require('express')
const router= express.Router()
const comments = require("../data/comments")

router
    .route("/")
    .get((req, res)=> {
    res.json(comments)
})
    .post((req, res) =>{
        if (req.body.userId && req.body.comment){
            const comment = {
                id: comments[comments.length-1].id + 1,
                userId: req.body.userId,
                comment: req.body.comment,
               
            }
            comments.push(comment)
            res.json(comments[comments.length - 1])
        }else res.json({error: "Missing Data"})
    })
router
    .route("/:id")
    .get((req, res, next) => {
    const comment = comments.find((p) => p.id == req.params.id)
    if (comment) res.json(comment)
    else next()
})
    .patch((req, res, next)=>{
        const comment = comments.find((p, i) =>{
            if (p.id == req.params.id){
                for (const key in req.body){
                    comments[i][key] = req.body[key]
                }
                return true
            }
        })
        if (comments) res.json(comment)
        else next()
    })
    .delete((req, res, next) => {
        const comment = comments.find((p, i) =>{
            if (p.id == req.params.id){
                comments.splice(i, 1)
                return true
            }
        })
        if (comment) res.json(comment)
        else next()
    })
 module.exports = router