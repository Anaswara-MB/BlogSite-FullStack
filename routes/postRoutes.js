const express = require('express');
const router = express.Router();
const posts = require('../model/post');
const jwt = require('jsonwebtoken')
router.use(express.json())

function verifyToken(req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) {
            throw 'Unauthorized Access';
        }
        let payload = jwt.verify(token, 'reactblogapp');
        if (!payload) {
            throw 'Unauthorized Access';
        }
        next();
    } catch (error) {
        res.status(401).send(error); 
    }
}

router.post('/add',verifyToken ,async(req, res)=>{
    try {
        const post = req.body;
        const data = await posts(post).save();
        res.status(200).send({message:"Blog Added"})
    } catch (error) {
        console.log(error)
    }
})

router.get('/blogs',verifyToken, async (req, res) => {
    try {
        const allPosts = await posts.find(); 
        res.status(200).send(allPosts);
        console.log("All posts:", allPosts);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "An error occurred while fetching posts" });
    }
});
module.exports = router